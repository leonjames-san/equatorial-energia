
export const equatorialMainUrl = "https://www.equatorialenergia.com.br";

export const states = ["MA", "PA", "PI", "AL"];

export const apiSettings = (str: "MA" | "PA" | "PI" | "AL" | undefined) => {
    return str ? {
        "MA": {
            estado: "Maranhão",
            namespace: "cemar",
            ddd: "98",
            telefone: "116",
            site: "https://ma.equatorialenergia.com.br",
            api: "https://api-ma-cliente.equatorialenergia.com.br",
            api_auth: "Basic RXF1YXRvcmlhbFNpdGU6R216MnNpdGU="
        },
        "PA": {
            estado: "Pará",
            namespace: "celpa",
            ddd: "95",
            telefone: "0800 091 0196",
            site: "https://pa.equatorialenergia.com.br",
            api: "https://api-pa-cliente.equatorialenergia.com.br",
            api_auth: "Basic RXF1YXRvcmlhbFNpdGU6R216MnNpdGU="
        },
        "PI": {
            estado: "Piauí",
            namespace: "cepisa",
            ddd: "86",
            telefone: "0800 086 0800",
            site: "https://pi.equatorialenergia.com.br",
            api: "https://api-pi-cliente.equatorialenergia.com.br",
            api_auth: "Basic RXF1YXRvcmlhbFNpdGU6R216MnNpdGU="
        },
        "AL": {
            estado: "Alagoas",
            namespace: "ceal",
            ddd: "82",
            telefone: "0800 082 0196",
            site: "https://al.equatorialenergia.com.br",
            api: "https://api-al-cliente.equatorialenergia.com.br",
            api_auth: "Basic RXF1YXRvcmlhbFNpdGU6R216MnNpdGU="
        }
    }[str] : {
        estado: null,
        namespace: null,
        ddd: null,
        telefone: null,
        site: null,
        api: null,
        api_auth: null
    }
}

export const _defaultOptionsInvoices = {
    onlyOpen: false,
    token: null
}
