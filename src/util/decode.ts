
export function decode64(b64: string){
    return Buffer.from(b64, 'base64').toString('utf-8');
}
