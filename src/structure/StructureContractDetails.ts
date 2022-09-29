export interface iInvoiceDebitDetails {
    numeroFatura: string;
    valor: string;
    dataVencimento: string;
    dataPagamento: string;
    competencia: string;
    codigoBarras: string;
    notaFiscal: string;
}

export interface iInvoiceDebites {
    contaContrato: string;
    canalAtendimento: string;
    protocolo: any;
    totalDebitos: string;
    codigo: string;
    mensagem: string;
    faturas: iInvoiceDebitDetails[]

}

export class StructureContractDetails {
    private data: iInvoiceDebites;

    constructor(data: iInvoiceDebites){
        this.data = data;
    }

    get(){
        return this.data;
    }

    getFirst(){
        return this.data.faturas[0];
    }

    getDebit(){
        return this._extractOnlyOpen(this.data).faturas.reduce(function(pre, current){
            return pre + Number(current.valor || 0)
        }, 0);
    }

    private _extractOnlyOpen(data: iInvoiceDebites): iInvoiceDebites{
        data.faturas = data.faturas.filter(val => val.dataPagamento && val.dataPagamento == "0000-00-00");

        return data;
    }
}
