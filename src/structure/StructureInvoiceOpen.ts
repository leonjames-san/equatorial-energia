
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

export class StrucutureInvoiceOpen {
    public data;

    constructor(data: iInvoicesOpen[]){
        this.data = data;
    }

    get(){
        return this.data;
    }

    getFirst(){
        return this.data[0];
    }
}
