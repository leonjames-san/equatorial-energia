import { decode64 } from "../util";

export interface iResponseLoginData {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export interface iUserDataDetailContractList {
    Numero: string;
    Endereco: string;
    Bairro: string;
    Cidade: string;
    NumeroInstalacao: string;
}

export class StructureAccessToken {
    private _token;
    private _expire;
    public username;
    public cpf;
    public email;
    public credenciado;
    public contasContrato;
    public nome
    public sobrenome
    public quantidadeContasContrato;

    constructor(data: iResponseLoginData){
        const { access_token } = data;

        this._token = access_token;


        if(this._token.split('.').length !== 3)
            throw new Error("access token invalid");

        const [,payload] = this._token.split('.').filter(val => val.indexOf('eyJ') == 0).map(val => JSON.parse(decode64(val)));
        const { exp, email, userData, username } = payload, { Credenciado, Cpf, ContasContrato, Nome, Sobrenome, QuantidadeContasContrato } = userData;

        this._expire = new Date(+exp * 1000);
        this.email = email;
        this.credenciado = Credenciado;
        this.nome = Nome;
        this.sobrenome = Sobrenome;
        this.quantidadeContasContrato = QuantidadeContasContrato;
        this.cpf = Cpf;
        this.contasContrato = ContasContrato;
        this.username = username;
    }

    getToken(): string{
        return this._token;
    }

    getUsername(): string{
        return this.username;
    }

    getFullName(): string{
        return `${this.nome} ${this.sobrenome}`;
    }

    getEmail(): string{
        return this.email;
    }

    getContracts(): iUserDataDetailContractList[]{
        return this.contasContrato;
    }

    getFirstContract(): iUserDataDetailContractList{
        return this.contasContrato[0];
    }

    getExp(): Date{
        return this._expire;
    }
}
