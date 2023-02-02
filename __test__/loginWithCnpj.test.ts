import 'dotenv/config';
import { test, expect, beforeAll, describe } from 'vitest';

import { Client } from '../src/client';
import {
    AccessToken,
    InvoiceList,
    InvoiceOpen
} from '../src/structure';

const { CNPJ, EMAIL } = process.env;

let controller: Client;

describe('Test Client [PJ]', () => {
    beforeAll(() => {
        controller = new Client(`${CNPJ}`, `${EMAIL}`, {
            state: "PI"
        });
    });

    test('Login with CNPJ', async () => {
        const login = await controller.loginWithCnpj();

        expect(login).toBeInstanceOf(AccessToken);
    });

    test('Test get list invoices', async () => {
        const _details = await controller.listInvoice(new AccessToken({
            access_token: `${controller.token }`,
        }).getContractsId()[0]);

        expect(_details).toBeInstanceOf(InvoiceList);
        expect(_details).toBeTypeOf("object");
    });

    test('Test get open invoices', async () => {
        const _invoices = await controller.openInvoices(new AccessToken({
            access_token: `${controller.token }`,
        }).getContractsId()[0]);

        expect(_invoices).toBeInstanceOf(InvoiceOpen);
        expect(_invoices.get()).toBeTypeOf("object");
    });
});
