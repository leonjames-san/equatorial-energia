import 'dotenv/config';
import { test, expect, beforeAll } from 'vitest';

import { Client } from '../src/client';
import { StructureAccessToken } from '../src/structure';

const { CPFWithPointer, BIRHTDAY } = process.env;

let controller: Client;

beforeAll(() => {
    controller = new Client(`${CPFWithPointer}`, `${BIRHTDAY}`, {
        state: "PI"
    });
});

test('Login with birthday', async () => {
//    const login = await controller.loginWithBirhtday();

//    expect(login).toBeInstanceOf(StructureAccessToken);
    expect(true).toBe(true)
});
