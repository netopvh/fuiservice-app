import { ITripResponse } from '@/domain/interfaces'
import React, { useEffect, useState } from 'react'

interface IProps {
    cancel: (arg: any) => void
    complete: (trip: ITripResponse) => void
}

export default function DispatcherRequest(
    {
        cancel,
        complete
    }: IProps
) {

    const [data, setData] = useState<[]>([])
    const [onlyDestination, setOnlyDestination] = useState<boolean>(false)

    useEffect(() => {

    }, [])

    const handleOnlyDestination = () => {
        setOnlyDestination(!onlyDestination)
    }

    const handleCreateRide = (event: any) => { }

    return (
        <div>
            <form className="space-y-5">
                <div>
                    <label htmlFor="name" className="text-xs">Somente ida</label>
                    <label className="w-12 h-6 relative">
                        <input type="checkbox" onClick={handleOnlyDestination} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                </div>
                <div>
                    <label htmlFor="name" className="text-xs">Nome do Cliente:</label>
                    <input id="name" type="text" className="form-input" />
                </div>
                {!onlyDestination && (
                    <div>
                        <label htmlFor="name" className="text-xs">Endereço de Partida:</label>
                        <input id="name" type="text" className="form-input" />
                    </div>
                )}
                <div>
                    <label htmlFor="name" className="text-xs">Endereço de Destino:</label>
                    <input id="name" type="text" className="form-input" />
                </div>
                <div>
                    <label htmlFor="name" className="text-xs">Tipo de Serviço:</label>
                    <select className="form-select text-white-dark">
                        <option>Selecione o Serviço</option>
                        <option>One</option>
                        <option>Two</option>
                        <option>Three</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="name" className="text-xs">Forma de Pagamento:</label>
                    <select className="form-select text-white-dark">
                        <option>Selecione a forma de pagamento</option>
                        <option>One</option>
                        <option>Two</option>
                        <option>Three</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="name" className="text-xs">Ordem de Serviço (Opcional):</label>
                    <input id="name" type="text" placeholder="" className="form-input" />
                </div>
                <div>
                    <label htmlFor="name" className="text-xs">Observações (Opcional):</label>
                    <textarea id="name" className="form-textarea" placeholder=""></textarea>
                </div>
                {/* <div>
                    <label htmlFor="actionEmail">Email:</label>
                    <div className="flex flex-1">
                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                            @
                        </div>
                        <input id="actionEmail" type="email" placeholder="" className="form-input ltr:rounded-l-none rtl:rounded-r-none" />
                    </div>
                </div> */}
                <button type="submit" className="btn btn-primary !mt-6">
                    Submit
                </button>
            </form>
        </div>
    )
}
