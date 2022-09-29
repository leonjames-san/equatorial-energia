
import axios from 'axios';
import formData from 'form-data';
import { randomUUID } from 'node:crypto';
import { cpf } from 'cpf-cnpj-validator';

import { apiSettings, formatingBirhtDay, formatingCpf, isBirhtDay, isObject, isString, states } from './util';
import { ClientError, ErrorRequestParse } from './error';
import { StructureAccessToken, StructureContractDetails } from './structure';

type iStateAccept = "PI" | "MA" | "PA" | "AL" | "NULL";

type iOptionsClient = {
    auth?: {
        username: string;
        password: string;
    },
    state: iStateAccept
}

export class Client {
    private username = "";
    private password = "";
    private options: iOptionsClient = {
        state: "NULL"
    };
    private token?: string;

    public _apiConfig;

    constructor(options: iOptionsClient)
    constructor(username: string, password: string)
    constructor(username: string, password: string, options: iOptionsClient)
    constructor(username: any, password?: any, options?: any){
        if(isObject(username)){
            this.username = options?.auth?.username;
            this.password = options?.auth?.password;
            this.options = username;
        } else if(isString(username)){
            this.username = username;
            this.password = password;
            this.options = options;
        }

        if(!states.includes(this.options?.state))
            throw new ClientError(`state is invalid, states accepts ${states.toString()}`);

        this._apiConfig = apiSettings[this.options?.state];
        const { api, api_auth } = this._apiConfig

        axios.defaults.headers.post = {
            authorization: `${api_auth}`,
            accept: "application/json, text/plain, */*"
        }
        axios.defaults.baseURL = `${api}`;
    }

    private async login(step: "birthday" | "document" | "monther-name"){
        if(!this.username || !this.password)
            throw new ClientError("username and password required for login");


        let typing, username = this.username, password = this.password;

        if(!cpf.isValid(username))
            throw new ClientError("username invalid");

        username = formatingCpf(username);

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
        }else {
            typing = "3";
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

            const _response = new StructureAccessToken(data);
            this.token = _response.getToken();

            return _response;
        }catch(err: any){
            throw new ClientError(new ErrorRequestParse(err).getMessage());
        }
    }

    async loginWithBirhtday(){
        try{
            return await this.login("birthday");
        }catch(err){
            if(err instanceof ClientError)
                throw new ClientError(`[loginWithBirthday]: ${err.message}`);

            throw new ClientError("unknown error");
        }
    }

    async loginWithDocument(){
        try{
            return await this.login("document");
        }catch(err){
            if(err instanceof ClientError)
                throw new ClientError(`[loginWithBirthday]: ${err.message}`);

            throw new ClientError("unknown error");
        }
    }

    async loginWithMontherName(){
        try{
            return await this.login("monther-name");
        }catch(err){
            if(err instanceof ClientError)
                throw new ClientError(`[loginWithBirthday]: ${err.message}`);

            throw new ClientError("unknown error");
        }
    }

    async getInvoices(contract: string, token: string): Promise<StructureContractDetails>
    async getInvoices(contract: string): Promise<StructureContractDetails>
    async getInvoices(contract: string, token?: string){
        try{
            const _authorization = this.resolveTokenAuthorizationOptional(token);

            if(!_authorization)
                throw new ClientError("login required for list invoices");

            if(!contract)
                throw new ClientError("contract required");

            const { data } = await axios.get('/api/v1/debitos/' + contract, {
                headers: {
                    authorization: `Bearer ${_authorization}`
                }
            });

            return new StructureContractDetails(data);
        }catch(err: any){
            throw new ClientError(new ErrorRequestParse(err).getMessage());
        }
    }

    private resolveTokenAuthorizationOptional(token?: string){
        return token ? token : this.token;
    }
}
