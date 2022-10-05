import { beforeAll, test, describe, expect } from 'vitest';
import { InvoiceOpen } from '../src/structure';

let controller: InvoiceOpen

describe('Structure invoice open', () => {
    beforeAll(() => {
        controller = new InvoiceOpen([
            {
                "referenciaFatura": "000000000008",
                "codigoPagamento": "0000000000000000000000000000000000000000000000",
                "valorFatura": "44.95 ",
                "numeroFaturaVencida": "0000000000000007",
                "dataVencimento": "2022-09-22",
                "observacao": null,
                "competencia": "2022/09",
                "mesReferencia": "09/2022",
                "negociacao": false
            },
            {
                "referenciaFatura": "000000000000",
                "codigoPagamento": "0000000000000000000000000000000000000000000000",
                "valorFatura": "39.91 ",
                "numeroFaturaVencida": "0000000000000008",
                "dataVencimento": "2022-08-19",
                "observacao": null,
                "competencia": "2022/08",
                "mesReferencia": "08/2022",
                "negociacao": false
            }
        ]);
    });

    test('count', () => {
        expect(controller.data.length).toBe(2);
    })

    test('get first', () => {
        let _first = controller.getFirst();

        expect(_first.referenciaFatura).toBe('000000000008');
    });
});
