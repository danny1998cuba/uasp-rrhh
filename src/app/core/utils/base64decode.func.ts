export function base64toPdf(base64string: string): Blob {
    let byteChar = atob(base64string);
    let byteArray = new Array(byteChar.length);
    for (let i = 0; i < byteChar.length; i++) {
        byteArray[i] = byteChar.charCodeAt(i);
    }
    let uIntArray = new Uint8Array(byteArray);
    return new Blob([uIntArray], { type: 'application/pdf' });
}