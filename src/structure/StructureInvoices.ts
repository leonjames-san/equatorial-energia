import { isObject } from "lodash";

export interface iInvoicesOpen {
    referenciaFatura: string;
    codigoPagamento: string;
    valorFatura: string;
    numeroFaturaVencida: string;
    dataVencimento: string;
    observacao: string;
    competencia: string;
    mesReferencia: string;
    negociacao: string;
}

export interface iInvoiceDebites {
    contaContrato: string;
    canalAtendimento: string;
    protocolo: any;
    totalDebitos: string;
    codigo: string;
    mensagem: string;
    faturas: {
            numeroFatura: string;
            valor: string;
            dataVencimento: string;
            dataPagamento: string;
            competencia: string;
            codigoBarras: string;
            notaFiscal: string;
        }[]

}

export type iOptionsStructureInvoices = {
    onlyOpen?: boolean;
}

export class StructureInvoices {
    private data: iInvoiceDebites;

    constructor(data: iInvoiceDebites, options: iOptionsStructureInvoices){
        if(!isObject(options)) options = {}

        if(options.onlyOpen){
            this.data = this._extractOnlyOpen(data);
            return;
        }

        this.data = data;
    }

    get(){
        return this.data;
    }

    getFirst(){
        const _clone = this.data;
        _clone.faturas = [_clone.faturas[0]];

        return _clone;
    }

    getDebit(){
        return this._extractOnlyOpen(this.data).faturas.reduce(function(pre, current){
            return pre + Number(current.numeroFatura || 0)
        }, 0);
    }

    private _extractOnlyOpen(data: iInvoiceDebites): iInvoiceDebites{
        data.faturas = data.faturas.filter(val => val.dataPagamento && val.dataPagamento == "0000-00-00");

        return data;
    }
}
