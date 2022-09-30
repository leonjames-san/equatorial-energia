<div id="topo"></div>

<div align="center">
    <a style="text-decoration: none" href="https://www.equatorialenergia.com.br/">
        <img src="https://play-lh.googleusercontent.com/tiksHECQh6MNAZHmW45xO38h8hJSLXYx7c5SrfzyMAvjcTQQX5Qt8XBSFV3xI4S0el3Q" alt="icone equatorial energia" width="auto" height="95" />
    </a>
</div>

<h3 align="center">Equatorial Energia - Api</h3>

A Equatorial Energia é uma holding que controla as distribuidoras de energia Equatorial Energia Alagoas, Equatorial Energia Maranhão, Equatorial Energia Pará, Equatorial Energia Piauí, CEEE Equatorial Energia e CEA Equatorial Energia.

## Sobre

Um modulo TypeScript que permite interagir facilmente com a API [Equatorial Energia](https://www.equatorialenergia.com.br/).

-   Orientado a objecto
-   Performático

Nesse módulo, está disponível para uso os seguintes estados:

-   [Alagoas](https://al.equatorialenergia.com.br/)
-   [Maranhão](https://ma.equatorialenergia.com.br/)
-   [Pará](https://pa.equatorialenergia.com.br/)
-   [Piauí](https://pi.equatorialenergia.com.br/)

## Instalação

-   npm

```sh
npm install -s equatorial-energia
```

-   yarn

```sh
yarn add equatorial-energia
```

## Exemplo de uso

```js
import { Client } from "equatorial-energia";

const clien = new Client("username", "birhtday", {
    state: "PI",
});

client
    .loginWithBirhtday()
    .then((structure) => {
        client
            .getInvoiceHistory(
                structure.getContractsId()[0],
                structure.getToken()
            )
            .then(console.log)
            .catch(console.log);
    })
    .catch(console.log);
```

ou

```js
const { Client } = require("equatorial-energia");

const client = new Client("username", "birhtday", {
    state: "PI",
});

client
    .loginWithBirhtday()
    .then((structure) => {
        client
            .getInvoiceHistory(
                structure.getContractsId()[0],
                structure.getToken()
            )
            .then(console.log)
            .catch(console.log);
    })
    .catch(console.log);
```

Uma vez instanciado o client, pode ser usado conjunto de ferramentas disponíveis

## Toolset

**Observação** Observe que cada funcionalidade abaixo se refere a class `Client`

-   Client.login(username?: `string`, password?: `string`, step: `"birthday" | "document" | "monther-name"`): `Promise<StructureAccessToken>` - autentica usuário na plataforma

-   Client.loginWithBirhtday(username?: `string`, birthday?: `string`): `Promise<StructureAccessToken>` - autentica usuário na plataforma data de nascimento

    ```js
    client.loginWithBirhtday("00000000000", "13/01/2022");
    ```

-   Client.loginWithDocument(username?: `string`, document?: `string`): `Promise<StructureAccessToken>` - autentica usuário na plataforma os primeiros dígitos do RG

    ```js
    client.loginWithDocument("00000000000", "000");
    ```

-   Client.loginWithMontherName(username?: `string`, monther?: `string`): `Promise<StructureAccessToken>` - autentica usuário na plataforma com nome da mãe

    ```js
    client.loginWithMontherName("00000000000", "Monther Name");
    ```

-   Client.getDetailsContract(contract: `string`, token?: `string`): `Promise<StructureContractDetails>` - lista detalhes simples do contrato como: +10 ultimas faturas, total de débitos..

    -   `token`: caso não passado o parâmetro, ele ira buscar por token dentro da instância

    ```js
    client.getDetailsContract("000000000", "JWT");
    ```

-   Client.getInvoicesOpen(contract: `string`): `Promise<StrucutureInvoiceOpen>` - lista fatura não pagas, verifica se há renegociação disponível e também disponibiliza código de barras para pagamento

    -   Login não obrigatório;

    ```js
    client.getInvoicesOpen("0000000000");
    ```

-   Client.getInvoiceHistory(contract: `string`, token?: `string`): `Promise<StructureInvoiceHistory>` - detalhes de consumo na sua fatura como:

    -   uso de kwh da fatura;
    -   tributos

    -   `token`: caso não passado o parâmetro, ele ira buscar por token dentro da instância

    ```js
    client.getInvoiceHistory("0000000000", "JWT");
    ```

-   Client.getInstallationDetails(contract: `string`): `Promise<StructureInstallationDetails>` - detalhes da instalação e situação do contrato

    -   Login não obrigatorio;

    ```js
    client.getInstallationDetails("0000000000");
    ```

## Interfaces Responses

-   Login `StructureAccessToken`

    ```ts
    interface iResponseLoginData {
        access_token: string;
        expires_in?: number;
        token_type?: string;
    }

    interface iUserDataDetailContractList {
        Numero: string;
        Endereco: string;
        Bairro: string;
        Cidade: string;
        NumeroInstalacao: string;
    }

    declare class StructureAccessToken {
        private _token;
        private _expire;
        username: any;
        cpf: any;
        email: any;
        credenciado: any;
        contasContrato: any;
        nome: any;
        sobrenome: any;
        quantidadeContasContrato: any;
        constructor(data: iResponseLoginData);
        getToken(): string;
        getUsername(): string;
        getFullName(): string;
        getEmail(): string;
        getContracts(): iUserDataDetailContractList[];
        getFirstContract(): iUserDataDetailContractList;
        getExp(): Date;
        getContractsId(): string[];
    }
    ```

-   Detalhes do contrato `StructureContractDetails`

    ```ts
    interface iContractDetailsInInvoiceDetails {
        numeroFatura: string;
        valor: string;
        dataVencimento: string;
        dataPagamento: string;
        competencia: string;
        codigoBarras: string;
        notaFiscal: string;
    }

    interface iContractDetails {
        contaContrato: string;
        canalAtendimento: string;
        protocolo: any;
        totalDebitos: string;
        codigo: string;
        mensagem: string;
        faturas: iContractDetailsInInvoiceDetails[];
    }

    declare class StructureContractDetails {
        data: iContractDetails;
        constructor(data: iContractDetails);
        get(): iContractDetails;
        getFirst(): iContractDetailsInInvoiceDetails;
        getDebit(): number;
        private _extractOnlyOpen;
    }
    ```

-   Faturas em aberto `StrucutureInvoiceOpen`

    ```ts
    interface iInvoicesOpen {
        referenciaFatura: string;
        codigoPagamento: string;
        valorFatura: string;
        numeroFaturaVencida: string;
        dataVencimento: string;
        observacao: string | null;
        competencia: string;
        mesReferencia: string;
        negociacao: boolean;
    }

    declare class StrucutureInvoiceOpen {
        data: iInvoicesOpen[];
        constructor(data: iInvoicesOpen[]);
        get(): iInvoicesOpen[];
        getFirst(): iInvoicesOpen;
    }
    ```

-   Historico da fatura `StructureInvoiceHistory`

    ```ts
    interface iHistoryInvoiceDetails {
        competencia: string;
        distribuicaoPercentual: string;
        distribuicaoValor: string;
        encargoPercentual: string;
        encargoValor: string;
        energiaPercentual: string;
        energiaValor: string;
        kwh: string;
        outrosPercentual: string;
        outrosValor: string;
        perdasPercentual: string;
        perdasValor: string;
        transmissaoPercentual: string;
        transmissaoValor: string;
        tributosPercentual: string;
        tributosValor: string;
        valorConsumo: string;
    }

    declare class StructureInvoiceHistory {
        data: iHistoryInvoiceDetails[];
        constructor(data: iHistoryInvoiceDetails[]);
        get(): iHistoryInvoiceDetails[];
        getFirst(): iHistoryInvoiceDetails;
        findByMonth(month: string): iHistoryInvoiceDetails | undefined;
    }
    ```

-   Detalhes de instalação `StructureInstallationDetails`

    ```ts
    interface iInstallationDetailsStructure {
        corteAndamento: string;
        desligaAndamento: string;
        faltaEnergiaAvaliacaoTecnica: string;
        desligamentoProgramado: string;
        faltaEnergiaColetiva: string;
        faltaEnergiaIndividual: string;
        faltaFases: string;
        numeroInstalacao: string;
        status: string;
        dadosTecnicos: iInstallationDetailsStructureTechnicalData;
    }

    interface iInstallationDetailsStructureTechnicalData {
        bomPagador: string;
        classe: string;
        fase: string;
        grupoTensao: string;
        localidade: string;
        subclasse: string;
        tarifa: string;
        coordenadaGeografica: iLocation;
    }

    type iLocation = {
        latitude: string;
        longitude: string;
    };

    declare class StructureInstallationDetails {
        data: iInstallationDetailsStructure;
        constructor(data: iInstallationDetailsStructure);
        get(): iInstallationDetailsStructure;
        getStatus(): string;
        getLocation(): iLocation;
    }
    ```

## Contato

Instagram: [Elizandro Dantas](https://www.instagram.com/elizandrodantas/) </br>
Email: dantaspm@icloud.com
