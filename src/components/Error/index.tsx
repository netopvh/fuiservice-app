'use client'

import React from 'react'

interface IProps {
    error: any
}

export default function Error({ error }: IProps) {
    return (
        <div>{error}</div>
    )
}
