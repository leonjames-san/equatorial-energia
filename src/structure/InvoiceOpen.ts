
export interface iInvoicesOpen {
    referenciaFatura: string;
    codigoPagamento: string;
    valorFatura: string;
    numeroFaturaVencida: string;
    dataVencimento: string;
    observacao: string | null;
    competencia: string;
    mesReferencia: string;
    negociacao: boolean;
}

export class InvoiceOpen {
    public data: iInvoicesOpen[];

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
