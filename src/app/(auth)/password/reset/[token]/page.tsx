"use client"

import { useRouter, useSearchParams } from "next/navigation"

type Params = {
    params: {
        token: string
    }
}

export default function Page({
    params: { token }
}: Params) {

    return (
        <div>
            <h1>Token: {token}</h1>
        </div>
    )
}