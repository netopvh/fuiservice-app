import React from 'react'

export default function Footer() {
    return (
        <div>
            <p className="pt-6 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">© {new Date().getFullYear()}. Todos os direitos reservados - Fui Service.</p>
        </div>
    )
}
