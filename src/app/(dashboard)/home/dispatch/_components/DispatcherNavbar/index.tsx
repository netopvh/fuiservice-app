import React, { useState } from 'react'

interface Props {
    content: string
    updateBody: (data: string) => void
    updateFilter: (data: string) => void
}

export default function DispatcherNavbar({
    content,
    updateFilter,
    updateBody
}: Props) {

    const [body, setBody] = useState<string>('dispatch-map')
    const [selected, setSelected] = useState<string>('')

    const filter = (data: string) => {
        setSelected(data)
        updateFilter(data)
    }

    const handleBodyChange = () => {
        if (content !== body) {
            setBody(content)
        }

        if (body === 'dispatch-map') {
            updateBody('dispatch-create')
            setBody('dispatch-create')
        } else if (body === 'dispatch-assigned') {
            updateBody('dispatch-map')
            setBody('dispatch-assigned')
        } else if (body === 'ddispatch-cancelled') {
            updateBody('dispatch-map')
            setBody('dispatch-cancelled')
        } else {
            updateBody('dispatch-map')
            setBody('dispatch-map')
        }
    }

    const isActive = (value: string) => {
        return (value === selected ? 'btn btn-primary' : 'btn btn-outline-primary')
    }

    return (
        <nav className="flex justify-between bg-[#e2dfdf] px-2 py-2 rounded border-a mb-2 mt-4">
            <div className="md:flex" id="process-filters">
                <ul className="grid grid-cols-3 gap-4">
                    <button type="button" className={isActive('all')} onClick={() => filter('all')}>
                        Pesquisando
                    </button>
                    <button type="button" className={isActive('assigned')} onClick={() => filter('assigned')}>
                        Em andamento
                    </button>
                    <button type="button" className={isActive('cancelled')} onClick={() => filter('cancelled')}>
                        Canceladas
                    </button>
                </ul>
            </div>
            <div>
                <ul className="flex justify-end items-center">
                    <li className="nav-item">
                        <button type="button"
                            onClick={handleBodyChange}
                            className="btn btn-success btn-md label-right border-a-0 waves-effect waves-light">
                            <span className="btn-label"><i className="ti-plus"></i></span>
                            NOVA VIAGEM
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
