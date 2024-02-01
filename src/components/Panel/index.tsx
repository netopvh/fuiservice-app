import React from 'react'

interface IProps {
    title: string
    className?: string
    dropdown?: React.ReactNode
    children: React.ReactNode
}

export default function Panel({ title, className, dropdown, children }: IProps) {
    return (
        <div className={`${className ? className : ''} panel h-full w-full`}>
            <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
                {dropdown && (
                    <div className="dropdown">
                        {dropdown}
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}
