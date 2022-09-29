import { clone } from "lodash";

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

type iOptionsGetInStructureInvoces = {
    onlyInvoices?: boolean;
}

export class StructureInvoices {
    private data: iInvoiceDebites;

    constructor(data: iInvoiceDebites){
        this.data = data;
    }

    get(options?: iOptionsGetInStructureInvoces){
        if(options?.onlyInvoices)
            return this.data.faturas;

        return this.data;
    }

    getFirst(options?: iOptionsGetInStructureInvoces){
        if(options?.onlyInvoices)
            return this.data.faturas[0];
        const _clone = clone(this.data);
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
