export function setCookie(key: string, value: string, expires?: number): void {

    if (typeof window === 'undefined') return;

    window.document.cookie = `${key}=${value}; expires=${expires}; path=/`
}

export function getCookie(key: string): string {

    if (typeof window === 'undefined') return '';

    const cookies: any = () => {
        return window.document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {})
    }

    const cookie = cookies()[key]

    return cookie || ''

}

export function hasCookie(key: string): boolean {

    if (typeof window === 'undefined') return false;

    const cookies: any = () => {

        return window.document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {})
    }

    const cookie = cookies()[key]

    return !!cookie
}

export function removeCookie(key: string): void {

    if (typeof window === 'undefined') return;

    window.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}
