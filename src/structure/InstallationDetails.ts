import { formatingTrimObject } from "../util";

export interface iInstallationDetailsStructure {
    corteAndamento: string;
    desligaAndamento: string;
    faltaEnergiaAvaliacaoTecnica: string;
    desligamentoProgramado: string;
    faltaEnergiaColetiva: string;
    faltaEnergiaIndividual: string;
    faltaFases: string;
    numeroInstalacao: string;
    status: string;
    dadosTecnicos: iInstallationDetailsStructureTechnicalData
}

export interface iInstallationDetailsStructureTechnicalData {
    bomPagador: string;
    classe: string;
    fase: string;
    grupoTensao: string;
    localidade: string;
    subclasse: string;
    tarifa: string;
    coordenadaGeografica: iLocation
}

type iLocation = {
    latitude: string;
    longitude: string;
}

export class InstallationDetails {
    public data: iInstallationDetailsStructure;

    constructor(data: iInstallationDetailsStructure){
        this.data = data;
    }

    get(){
        return this.data;
    }

    getStatus(){
        return this.data.status;
    }

    getLocation(){
        return formatingTrimObject<iLocation>(this.data.dadosTecnicos.coordenadaGeografica);
    }
}
