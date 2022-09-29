import 'dotenv/config';
import { test, expect, beforeAll, describe } from 'vitest';

import { Client } from '../src/client';
import { StructureAccessToken, StructureContractDetails, StrucutureInvoiceOpen } from '../src/structure';

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

    test('Get Contract Details', async () => {
        const _details = await controller.getDetailsContract(new StructureAccessToken({
            access_token: `${controller.token }`,
        }).getContractsId()[0]);

        expect(_details).toBeInstanceOf(StructureContractDetails);
        expect(_details).toBeTypeOf("object");
    });

    test('Get Invoice Open', async () => {
        const _invoices = await controller.getInvoicesOpen(new StructureAccessToken({
            access_token: `${controller.token }`,
        }).getContractsId()[0]);

        expect(_invoices).toBeInstanceOf(StrucutureInvoiceOpen);
        expect(_invoices.get()).toBeTypeOf("object");
    });
});
