import 'dotenv/config';
import { test, expect, beforeAll, describe } from 'vitest';

import { Client } from '../src/client';
import {
    StructureAccessToken,
    StructureContractDetails,
    StructureInstallationDetails,
    StructureInvoiceHistory,
    StrucutureInvoiceOpen
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

        expect(login).toBeInstanceOf(StructureAccessToken);
    });

    test('Test get Contract Details', async () => {
        const _details = await controller.getDetailsContract(new StructureAccessToken({
            access_token: `${controller.token }`,
        }).getContractsId()[0]);

        expect(_details).toBeInstanceOf(StructureContractDetails);
        expect(_details).toBeTypeOf("object");
    });

    test('Test get Invoice Open', async () => {
        const _invoices = await controller.getInvoicesOpen(new StructureAccessToken({
            access_token: `${controller.token }`,
        }).getContractsId()[0]);

        expect(_invoices).toBeInstanceOf(StrucutureInvoiceOpen);
        expect(_invoices.get()).toBeTypeOf("object");
    });

    test('Test get Invoice History', async () => {
        const _history = await controller.getInvoiceHistory(new StructureAccessToken({
            access_token: `${controller.token}`
        }).getContractsId()[0]);

        expect(_history).toBeInstanceOf(StructureInvoiceHistory);
        expect(_history.findByMonth('06')?.valorConsumo).toBe('44.95 ');
        expect(_history.findByMonth('6')?.valorConsumo).toBe('44.95 ');
    });

    test('Test get installation details', async () => {
        let _details = await controller.getInstallationDetails(new StructureAccessToken({
            access_token: `${controller.token}`
        }).getContractsId()[0]);

        expect(_details).toBeInstanceOf(StructureInstallationDetails);
        expect(_details.getLocation().latitude).toBe('7.354355000000-');
    });
});
