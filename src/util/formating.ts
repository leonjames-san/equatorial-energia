

export function formatingBirhtDay(birthday: string){
    const _s = birthday.split('/');

    return `${_s[2]}-${_s[1]}-${_s[0]}`;
}

export function formatingCpf(cpf: string){
    return cpf.split('.').join('').split('-').join('');
}
