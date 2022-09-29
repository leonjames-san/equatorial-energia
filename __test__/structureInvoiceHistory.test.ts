import { beforeAll, test, describe, expect } from 'vitest';
import { StructureInvoiceHistory } from '../src/structure';

let controller: StructureInvoiceHistory

describe('Structure Invoice History', () => {
    beforeAll(() => {
        controller = new StructureInvoiceHistory([
                {
                    "competencia": "2022/09",
                    "valorConsumo": "44.95 ",
                    "energiaPercentual": "21.7575 ",
                    "distribuicaoValor": "9.68 ",
                    "distribuicaoPercentual": "21.5350 ",
                    "transmissaoValor": "2.47 ",
                    "transmissaoPercentual": "5.4950 ",
                    "encargoValor": "3.93 ",
                    "encargoPercentual": "8.7430 ",
                    "perdasValor": "3.65 ",
                    "perdasPercentual": "8.1201 ",
                    "tributosValor": "8.61 ",
                    "tributosPercentual": "19.1546 ",
                    "outrosValor": "6.83 ",
                    "outrosPercentual": "15.1947 ",
                    "energiaValor": "9.78 ",
                    "kwh": "47.00000000000000"
                },
                {
                    "competencia": "2022/08",
                    "valorConsumo": "44.95 ",
                    "energiaPercentual": "0.0000 ",
                    "distribuicaoValor": "0.00 ",
                    "distribuicaoPercentual": "0.0000 ",
                    "transmissaoValor": "0.00 ",
                    "transmissaoPercentual": "0.0000 ",
                    "encargoValor": "0.00 ",
                    "encargoPercentual": "0.0000 ",
                    "perdasValor": "0.00 ",
                    "perdasPercentual": "0.0000 ",
                    "tributosValor": "0.00 ",
                    "tributosPercentual": "0.0000 ",
                    "outrosValor": "44.95 ",
                    "outrosPercentual": "100.0000 ",
                    "energiaValor": "0.00 ",
                    "kwh": "0.00000000000000"
                }
        ]);
    });

    test('get by monther [1]', () => {
        let _monther = controller.findByMonth('8');

        expect(_monther?.valorConsumo).toBe('44.95 ');
    });

    test('get by monther [2]', () => {
        let _monther = controller.findByMonth('08');

        expect(_monther?.valorConsumo).toBe('44.95 ');
    });

    test('get first', () => {
        let _first = controller.getFirst();

        expect(_first.valorConsumo).toBe('44.95 ');
    });
})
