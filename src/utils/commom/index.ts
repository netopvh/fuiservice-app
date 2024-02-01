export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function stringToNumber(value: string): number {
    return Number(value.replace(',', '.'));
}

export function castValue(value: any, to: string): any {
    if(to === 'number') return stringToNumber(value);
    return value;
}