
export interface iHistoryInvoiceDetails {
    competencia: string;
    distribuicaoPercentual: string;
    distribuicaoValor: string;
    encargoPercentual: string;
    encargoValor: string;
    energiaPercentual: string;
    energiaValor: string;
    kwh: string;
    outrosPercentual: string;
    outrosValor: string;
    perdasPercentual: string;
    perdasValor: string;
    transmissaoPercentual: string;
    transmissaoValor: string;
    tributosPercentual: string;
    tributosValor: string;
    valorConsumo: string;
}

export class StructureInvoiceHistory {
    public data;

    constructor(data: iHistoryInvoiceDetails[]){
        this.data = data;
    }

    get(){
        return this.data;
    }

    getFirst(){
        return this.data[0];
    }

    findByMonth(month: string): iHistoryInvoiceDetails | undefined {
        return this.data.find(val => {
            const { competencia } = val;

            return competencia && (competencia.split('/')[1] === month || competencia.split('/')[1].substring(1) === month);
        });
    }
}
