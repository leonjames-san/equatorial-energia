import { isObject } from 'lodash';
import { beforeAll, test, describe, expect } from 'vitest';
import { iInvoiceDebites, StructureInvoices } from '../src/structure/StructureInvoices';

let controller: StructureInvoices

describe('Structure Invoice Debits', () => {
    beforeAll(()=>{
        controller = new StructureInvoices({
            "contaContrato": "000000000000",
            "canalAtendimento": "A",
            "protocolo": null,
            "totalDebitos": "81.48 ",
            "codigo": "01",
            "mensagem": "Cliente possui faturas não pagas.",
            "faturas": [
                {
                    "numeroFatura": "00000000011",
                    "valor": "44.95 ",
                    "dataVencimento": "2022-09-22",
                    "dataPagamento": "0000-00-00",
                    "competencia": "2022/09",
                    "codigoBarras": "0000000000000000000000000000000000000000000025",
                    "notaFiscal": "00000000000000000000"
                },
                {
                    "numeroFatura": "00000000012",
                    "valor": "39.91 ",
                    "dataVencimento": "2022-08-19",
                    "dataPagamento": "2022-09-02",
                    "competencia": "2022/08",
                    "codigoBarras": "0000000000000000000000000000000000000000000026",
                    "notaFiscal": "00000000000000000000"
                },
                {
                    "numeroFatura": "00000000013",
                    "valor": "48.80 ",
                    "dataVencimento": "2022-07-21",
                    "dataPagamento": "2022-09-08",
                    "competencia": "2022/07",
                    "codigoBarras": "",
                    "notaFiscal": "00000000000000000000"
                },
                {
                    "numeroFatura": "00000000014",
                    "valor": "49.04 ",
                    "dataVencimento": "2022-06-21",
                    "dataPagamento": "2022-08-02",
                    "competencia": "2022/06",
                    "codigoBarras": "",
                    "notaFiscal": "00000000000000000000"
                },
                {
                    "numeroFatura": "00000000015",
                    "valor": "39.29 ",
                    "dataVencimento": "2022-05-19",
                    "dataPagamento": "2022-06-30",
                    "competencia": "2022/05",
                    "codigoBarras": "",
                    "notaFiscal": "00000000000000000000"
                },
                {
                    "numeroFatura": "00000000016",
                    "valor": "57.50 ",
                    "dataVencimento": "2022-04-20",
                    "dataPagamento": "2022-05-31",
                    "competencia": "2022/04",
                    "codigoBarras": "",
                    "notaFiscal": "00000000000000000000"
                },
                {
                    "numeroFatura": "00000000017",
                    "valor": "53.77 ",
                    "dataVencimento": "2022-03-21",
                    "dataPagamento": "2022-03-30",
                    "competencia": "2022/03",
                    "codigoBarras": "",
                    "notaFiscal": "00000000000000000000"
                }
            ]
        });
    });

    test('get invoices with invoice data', () => {
        let _invoices = controller.get();

        expect(_invoices).toBeTypeOf('object');
        expect(_invoices.contaContrato).toBe('000000000000')
    });

    test('get only first invoice', () => {
        let _first = controller.getFirst();

        expect(_first).toBeTypeOf('object');
        expect(_first.numeroFatura).toBe('00000000011');
    });


    test('get only invoices', () => {
        let _invoices = controller.get();

        expect(_invoices).toBeTypeOf('object');
        expect(Array.isArray(_invoices.faturas)).toBe(true);
        expect(_invoices.faturas.length).toBe(7);
    });

    test('get debit opened', () => {
        let _debit = controller.getDebit();

        expect(_debit).toBe(44.95);
    });

});
