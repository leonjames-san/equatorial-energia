
import axios from 'axios';
import formData from 'form-data';
import { randomUUID } from 'node:crypto';

import { apiSettings, formatingBirhtDay, formatingDocument, isBirhtDay, isObject, isString, states } from './util';
import { ClientError, ErrorRequestParse } from './error';
import { AccessToken, InvoiceList, InstallationDetails, InvoiceHistory, InvoiceOpen } from './structure';

type iStateAccept = "PI" | "MA" | "PA" | "AL";
type iLoginType = "birthday" | "document" | "cnpj" | "monther-name";

type iOptionsClient = {
    auth?: {
        username: string;
        password: string;
    },
    state?: iStateAccept;
    stepLogin?: iLoginType;
}

export class Client {
    private username: string;
    private password: string;
    private options: iOptionsClient;

    public token: string;
    public _apiConfig;

    constructor(options: iOptionsClient)
    constructor(username: string, password: string, options: iOptionsClient)
    constructor(username: any, password?: any, options?: any){
        if(isObject(username)){
            this.username = username.auth?.username;
            this.password = username.auth?.password;
            this.options = username;
        } else if(isString(username)){
            this.username = username;
            this.password = password;
            this.options = isObject(options) ? options : {};
        }

        if(!states.includes(this.options?.state || ""))
            throw new ClientError(`state is invalid, states accepts ${states.toString()}`);

        this._apiConfig = apiSettings(this.options.state);
        const { api, api_auth } = this._apiConfig

        axios.defaults.headers.post = {
            authorization: `${api_auth}`,
            accept: "application/json, text/plain, */*"
        }
        axios.defaults.baseURL = `${api}`;
    }

    /**
     * authenticate user with api
     * @private
     */

    private async login(username: string, password: string, state: iLoginType): Promise<AccessToken>
    private async login(step: iLoginType): Promise<AccessToken>
    private async login(username: string | iLoginType, password?: string, step?: iLoginType){
        if(!password){
            step = username as iLoginType;
            username = this.username;
            password = this.password;
        }

        if(!username || !password)
            throw new ClientError("username and password required for login");

        step = step ?? this.options?.stepLogin;

        if(!step)
            throw new ClientError("it is necessary to fill in the login form");

        let typing;

        username = formatingDocument(username);

        if(step == "birthday"){
            if(!isBirhtDay(password))
                throw new ClientError("brithday date invalid");

            password = formatingBirhtDay(password);
            typing = "1";
        }else if(step == "document"){
            if(password.length < 3)
                throw new ClientError("invalid document, must contain more than or equal to 3 characters");

            if(password.length > 3)
                password = password.substring(0, 3);

            typing = "2";
        }else if(step === "monther-name"){
            typing = "3";
        }else if(step === "cnpj"){
            typing = "4";
        }else{
            throw new ClientError("login form not found");
        }

        try{
            const form = new formData();
            form.setBoundary(randomUUID());
            form.append('grant_type', 'password');
            form.append('username', `${typing}:${username}`);
            form.append('password', password);

            const { data } = await axios.post('/auth/connect/token', form, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${form.getBoundary()}`
                }
            })

            const _response = new AccessToken(data);
            this.token = _response.getToken();

            return _response;
        }catch(err: any){
            throw new ClientError(new ErrorRequestParse(err).getMessage());
        }
    }

    /**
     * login with cpf and date of birth
     */

    async loginWithBirhtday(cpf?: string, brithday?: string){
        try{
            return await this.login(cpf ?? this.username, brithday ?? this.password, "birthday");
        }catch(err){
            if(err instanceof ClientError)
                throw new ClientError(`[loginWithBirthday]: ${err.message}`);

            throw new ClientError("unknown error");
        }
    }

    /**
     * login with cpf and document [RG]
     */

    async loginWithDocument(cpf?: string, document?: string){
        try{
            return await this.login(cpf || this.username, document || this.password, "document");
        }catch(err){
            if(err instanceof ClientError)
                throw new ClientError(`[loginWithDocument]: ${err.message}`);

            throw new ClientError("unknown error");
        }
    }

    /**
     * login with cnpj
     */

    async loginWithCnpj(cnpj?: string, email?: string){
        try{
            return this.login(cnpj || this.username, email || this.password, "cnpj");
        }catch(err){
            if(err instanceof ClientError)
                throw new ClientError(`[loginWithCpnj]: ${err.message}`);

            throw new ClientError("unknown error");
        }
    }

    /**
     * login with cpf and mother name
     */

    async loginWithMontherName(cpf?: string, mother?: string){
        try{
            return await this.login(cpf ?? this.username, mother ?? this.password, "monther-name");
        }catch(err){
            if(err instanceof ClientError)
                throw new ClientError(`[loginWithMother]: ${err.message}`);

            throw new ClientError("unknown error");
        }
    }

    /**
     * list invoices with contract
     */

    async listInvoice(contract: string, token: string): Promise<InvoiceList>
    async listInvoice(contract: string): Promise<InvoiceList>
    async listInvoice(contract: string, token?: string){
        try{
            const _authorization = this.resolveTokenAuthorizationOptional(token);

            if(!_authorization)
                throw new ClientError("login required");

            if(!contract)
                throw new ClientError("contract required");

            const { data } = await axios.get('/api/v1/debitos/' + contract, {
                headers: {
                    authorization: "Bearer " + _authorization
                },
                params: {
                    listarEmAberto: false
                }
            });

            return new InvoiceList(data["data"]);
        }catch(err: any){
            throw new ClientError(new ErrorRequestParse(err).getMessage());
        }
    }

    /**
     * open invoice details
     */

    async openInvoices(contract: string){
        try{
            if(!contract)
                throw new ClientError("contract required");

            const { data } = await axios.get("/api/v1/faturas/em-aberto/" + contract);

            return new InvoiceOpen(data);
        }catch(err: any){
            throw new ClientError(new ErrorRequestParse(err).getMessage());
        }
    }

    /**
     * you can consult all your consumption history
     */

    async consumpitonHistory(contract: string, token: string): Promise<InvoiceHistory>
    async consumpitonHistory(contract: string): Promise<InvoiceHistory>
    async consumpitonHistory(contract: string, token?: string){
        try{
            const _authorization = this.resolveTokenAuthorizationOptional(token);

            if(!_authorization)
                throw new ClientError("login required");

            if(!contract)
                throw new ClientError("contract required");

            const { data } = await axios.get("/api/v1/faturas/historico/" + contract, {
                headers: {
                    authorization: "Bearer " + _authorization
                }
            });

            return new InvoiceHistory(data["historicoFatura"]);
        }catch(err: any){
            throw new ClientError(new ErrorRequestParse(err).getMessage());
        }
    }

    /**
     * installation details and line conditions
     */

    async installationDetails(contract: string){
        try{
            if(!contract)
                throw new ClientError("contract required");

            const { data } = await axios.get("/api/v1/instalacao/" + contract);

            return new InstallationDetails(data);
        }catch(err: any){
            throw new ClientError(new ErrorRequestParse(err).getMessage());
        }
    }

    /**!
     * return token from instance or param
     * @private
     */

    private resolveTokenAuthorizationOptional(token?: string){
        return token ? token : this.token;
    }
}
