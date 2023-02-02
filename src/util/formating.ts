import { isString } from "lodash";


export function formatingBirhtDay(birthday: string){
    const _s = birthday.split('/');

    return `${_s[2]}-${_s[1]}-${_s[0]}`;
}

export function formatingDocument(cpf: string){
    return cpf.replace(/\.|\/|-/gm, '');
}

export function formatingTrimObject<T>(object: any): T{
    Object.keys(object).forEach(key => {
        if(isString(object[key]))
            object[key] = object[key].trim();
    });

    return object;
}
