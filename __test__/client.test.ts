import 'dotenv/config';
import { test, expect, beforeAll, describe } from 'vitest';

import { Client } from '../src/client';
import {
    AccessToken,
    InvoiceList,
    InstallationDetails,
    InvoiceHistory,
    InvoiceOpen
} from '../src/structure';

const { CPFWithPointer, BIRHTDAY } = process.env;

let controller: Client;

describe('Test Client', () => {
    beforeAll(() => {
        controller = new Client(`${CPFWithPointer}`, `${BIRHTDAY}`, {
            state: "PI"
        });
    });

    test('Login with birthday', async () => {
        const login = await controller.loginWithBirhtday();

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

    test('Test get consumption history contract', async () => {
        const _history = await controller.consumpitonHistory(new AccessToken({
            access_token: `${controller.token}`
        }).getContractsId()[0]);

        expect(_history).toBeInstanceOf(InvoiceHistory);
        expect(_history.findByMonth('06')?.valorConsumo).toBe('44.95 ');
        expect(_history.findByMonth('6')?.valorConsumo).toBe('44.95 ');
    });

    test('Test get installation details', async () => {
        let _details = await controller.installationDetails(new AccessToken({
            access_token: `${controller.token}`
        }).getContractsId()[0]);

        expect(_details).toBeInstanceOf(InstallationDetails);
        expect(_details.getLocation().latitude).toBe('7.354355000000-');
    });
});
