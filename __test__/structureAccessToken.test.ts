import { beforeAll, expect, test, describe } from 'vitest';
import { StructureAccessToken } from '../src/structure';
import { encode64 } from '../src/util';

describe('Structure Access Token', () => {
    var _response,
        controller: StructureAccessToken;

    beforeAll(() => {
        _response = {
            access_token: `${encode64(JSON.stringify({
                "alg": "RS256",
                "kid": "",
                "typ": "JWT"
              }))}.${encode64(JSON.stringify({
                exp: 1667260251,
                username: "username_test",
                email: "test@elizandrodantas.com",
                userData: {
                    Cpf: 35294164019, // https://www.4devs.com.br/gerador_de_cpf
                    Credenciado: false,
                    ContasContrato: [
                        {
                            Numero: "000000000011",
                            Endereco: "Av. Antonino Freire",
                            Bairro: "Centro",
                            Cidade: "Teresina",
                            NumeroInstalacao: "0000000001"
                        },
                        {
                            Numero: "000000000012",
                            Endereco: "Av. Frei Serafim",
                            Bairro: "Centro",
                            Cidade: "Teresina",
                            NumeroInstalacao: "0000000002"
                        }
                    ],
                    Nome: "Elizandro",
                    Sobrenome: "Dantas",
                    QuantidadeContasContrato: 2
                }
            }))}.hash`,
            expires_in: 2880000,
            token_type: "Bearer"
        }
        controller = new StructureAccessToken(_response);
    });

    test('get full name', () => {
        let _fullName = controller.getFullName();

        expect(_fullName).toBe("Elizandro Dantas");
    });

    test('get expire', () => {
        let _exp = controller.getExp();

        expect(_exp.getDate()).toBe(31);
    })

    test('get token', () => {
        let _token = controller.getToken();

        expect(_token).toBe(_response.access_token);
    });
});
