

export function isString(value: any) {
    return typeof value === "string";
}

export function isNumber(value: any) {
    return typeof value === "number";
}

export function isArray(value: any) {
    return Array.isArray(value);
}

export function isObject(value: any) {
    return typeof value === "object" && !isArray(value);
}

export function isBirhtDay(value: string) {
    return new RegExp("(\\d{2})[-.\\/](\\d{2})[-.\\/](\\d{4})").test(value)
}
