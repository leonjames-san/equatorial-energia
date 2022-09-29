import { beforeAll, test, describe, expect } from 'vitest';
import { StructureInstallationDetails } from '../src/structure';

let controller: StructureInstallationDetails

describe('Structure Installation Details', () => {
    beforeAll(() => {
        controller = new StructureInstallationDetails({
            "status": "Ligada",
            "corteAndamento": "N",
            "desligaAndamento": "N",
            "faltaEnergiaIndividual": "N",
            "faltaEnergiaColetiva": "N",
            "desligamentoProgramado": "N",
            "faltaFases": "N",
            "faltaEnergiaAvaliacaoTecnica": "N",
            "dadosTecnicos": {
                "classe": "GPAB",
                "subclasse": "COMER",
                "tarifa": "B3_OUTROS",
                "grupoTensao": "B",
                "localidade": "URBANO",
                "bomPagador": "S",
                "fase": "",
                "coordenadaGeografica": {
                    "latitude": "     7.000000000000-",
                    "longitude": "    36.000000000000-"
                }
            },
            "numeroInstalacao": "0000000000"
        });
    });

    test('check status', () => {
        let _status = controller.getStatus();

        expect(_status).toBe("Ligada");
    });

    test('check location', () => {
        let _location = controller.getLocation();

        expect(_location.latitude).toBe('7.000000000000-');
        expect(_location.longitude).toBe('36.000000000000-');
    });
});
