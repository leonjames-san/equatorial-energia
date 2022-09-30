
export interface iContractDetailsInInvoiceDetails {
    numeroFatura: string;
    valor: string;
    dataVencimento: string;
    dataPagamento: string;
    competencia: string;
    codigoBarras: string;
    notaFiscal: string;
}

export interface iContractDetails {
    contaContrato: string;
    canalAtendimento: string;
    protocolo: any;
    totalDebitos: string;
    codigo: string;
    mensagem: string;
    faturas: iContractDetailsInInvoiceDetails[]
}

export class StructureContractDetails {
    public data: iContractDetails;

    constructor(data: iContractDetails){
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

    private _extractOnlyOpen(data: iContractDetails): iContractDetails{
        data.faturas = data.faturas.filter(val => val.dataPagamento && val.dataPagamento == "0000-00-00");

        return data;
    }
}
