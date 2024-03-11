'use client'

import { useAppDispatch } from "@/redux/store"
import { setPageTitle } from "@/redux/store/slices/themeConfig";
import Link from "next/link"
import { useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingMask from "@/components/LoadingMask";
import IconHorizontalDots from "@/components/Icon/IconHorizontalDots";
import Dropdown from "../_components/Dropdown";
import IconEye from "@/components/Icon/IconEye";
import Panel from "@/components/Panel";
import { useGetTripsQuery } from "@/redux/services/tripsApi";
import { currencyFormatter } from "@/utils/currencyUtils";
import Skeleton from 'react-loading-skeleton'

const Indicators = dynamic(() => import('./_components/Indicators'), {
    loading: () => <LoadingMask customHeight={200} />,
    ssr: false
});

const VisitsChart = dynamic(() => import('./_components/VisitsChart'), {
    loading: () => <LoadingMask customHeight={200} />,
    ssr: false
});

export default function Page() {

    const dispatch = useAppDispatch();

    const { data: trips, isLoading, isError, error } = useGetTripsQuery({ type: 'ALL' });

    useEffect(() => {
        dispatch(setPageTitle('Visão Geral'));
    });

    return (
        <>
            <div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Visão Geral
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="pt-5">
                <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Total de Serviços</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement='bottom-end'
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">Mês atual</button>
                                        </li>
                                        <li>
                                            <button type="button">Esta Semana</button>
                                        </li>
                                        <li>
                                            <button type="button">Hoje</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 300 </div>
                            {/* <div className="badge bg-white/30">- 2.35% </div> */}
                        </div>
                        <div className="mt-5 flex items-center font-semibold text-lg">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Semana Passada: <span className="font-bold text-lg">65</span>
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Total de Gastos</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement='bottom-end'
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="hover:opacity-80 opacity-70" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">Mês atual</button>
                                        </li>
                                        <li>
                                            <button type="button">Esta Semana</button>
                                        </li>
                                        <li>
                                            <button type="button">Hoje</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">R$ 0,00 </div>
                            {/* <div className="badge bg-white/30">- 2.35% </div> */}
                        </div>
                        <div className="mt-5 flex items-center font-semibold text-lg">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Semana Passada: <span className="font-bold text-lg">0,00</span>
                        </div>
                    </div>
                </div>
                {/* <Indicators />
                <VisitsChart /> */}

                <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    <Panel
                        title="Resumo de Transações"
                    >
                        <div>
                            <div className="space-y-6">
                                <div className="flex">
                                    <span className="grid h-9 w-9 place-content-center rounded-md bg-danger-light text-base text-danger dark:bg-success dark:text-success-light">VU</span>
                                    <div className="flex-1 px-3">
                                        <div className="font-bold">Valor Utilizado</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">Atualizado em: </div>
                                    </div>
                                    <span className="whitespace-pre px-1 text-base text-danger ltr:ml-auto rtl:mr-auto">R$ 0,00</span>
                                </div>
                                {/* <div className="flex">
                                    <span className="grid h-9 w-9 place-content-center rounded-md bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2 10C2 7.17157 2 5.75736 2.87868 4.87868C3.75736 4 5.17157 4 8 4H13C15.8284 4 17.2426 4 18.1213 4.87868C19 5.75736 19 7.17157 19 10C19 12.8284 19 14.2426 18.1213 15.1213C17.2426 16 15.8284 16 13 16H8C5.17157 16 3.75736 16 2.87868 15.1213C2 14.2426 2 12.8284 2 10Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                opacity="0.5"
                                                d="M19.0003 7.07617C19.9754 7.17208 20.6317 7.38885 21.1216 7.87873C22.0003 8.75741 22.0003 10.1716 22.0003 13.0001C22.0003 15.8285 22.0003 17.2427 21.1216 18.1214C20.2429 19.0001 18.8287 19.0001 16.0003 19.0001H11.0003C8.17187 19.0001 6.75766 19.0001 5.87898 18.1214C5.38909 17.6315 5.17233 16.9751 5.07642 16"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M13 10C13 11.3807 11.8807 12.5 10.5 12.5C9.11929 12.5 8 11.3807 8 10C8 8.61929 9.11929 7.5 10.5 7.5C11.8807 7.5 13 8.61929 13 10Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path opacity="0.5" d="M16 12L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path opacity="0.5" d="M5 12L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    <div className="flex-1 px-3">
                                        <div>Cash withdrawal</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="whitespace-pre px-1 text-base text-danger ltr:ml-auto rtl:mr-auto">-$16.44</span>
                                </div>
                                <div className="flex">
                                    <span className="grid h-9 w-9 place-content-center rounded-md bg-danger-light text-danger dark:bg-danger dark:text-danger-light">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                            <path
                                                opacity="0.5"
                                                d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </span>
                                    <div className="flex-1 px-3">
                                        <div>Amy Diaz</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="whitespace-pre px-1 text-base text-success ltr:ml-auto rtl:mr-auto">+$66.44</span>
                                </div>
                                <div className="flex">
                                    <span className="grid h-9 w-9 place-content-center rounded-md bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596c2.344.058 4.85.398 4.854.398c-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"
                                            />
                                        </svg>
                                    </span>
                                    <div className="flex-1 px-3">
                                        <div>Netflix</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="whitespace-pre px-1 text-base text-danger ltr:ml-auto rtl:mr-auto">-$32.00</span>
                                </div>
                                <div className="flex">
                                    <span className="grid h-9 w-9 place-content-center rounded-md bg-info-light text-base text-info dark:bg-info dark:text-info-light">DA</span>
                                    <div className="flex-1 px-3">
                                        <div>Daisy Anderson</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                    </div>
                                    <span className="whitespace-pre px-1 text-base text-success ltr:ml-auto rtl:mr-auto">+$10.08</span>
                                </div>
                                <div className="flex">
                                    <span className="grid h-9 w-9 place-content-center rounded-md bg-primary-light text-primary dark:bg-primary dark:text-primary-light">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.926 9.70541C13.5474 9.33386 13.5474 8.74151 13.5474 7.55682V7.24712C13.5474 3.96249 13.5474 2.32018 12.6241 2.03721C11.7007 1.75425 10.711 3.09327 8.73167 5.77133L5.66953 9.91436C4.3848 11.6526 3.74244 12.5217 4.09639 13.205C4.10225 13.2164 4.10829 13.2276 4.1145 13.2387C4.48945 13.9117 5.59888 13.9117 7.81775 13.9117C9.05079 13.9117 9.6673 13.9117 10.054 14.2754"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                opacity="0.5"
                                                d="M13.9259 9.70557L13.9459 9.72481C14.3326 10.0885 14.9492 10.0885 16.1822 10.0885C18.4011 10.0885 19.5105 10.0885 19.8854 10.7615C19.8917 10.7726 19.8977 10.7838 19.9036 10.7951C20.2575 11.4785 19.6151 12.3476 18.3304 14.0858L15.2682 18.2288C13.2888 20.9069 12.2991 22.2459 11.3758 21.9629C10.4524 21.68 10.4524 20.0376 10.4525 16.753L10.4525 16.4434C10.4525 15.2587 10.4525 14.6663 10.074 14.2948L10.054 14.2755"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </span>
                                    <div className="flex-1 px-3">
                                        <div>Electricity Bill</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                    </div>
                                    <span className="whitespace-pre px-1 text-base text-danger ltr:ml-auto rtl:mr-auto">-$22.00</span>
                                </div> */}
                            </div>
                        </div>
                    </Panel>

                    <Panel title="Últimos Solicitações" className="col-span-2">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">Cliente</th>
                                        <th>Prestador</th>
                                        <th>Serviço</th>
                                        <th>Valor</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading && (
                                        Array(4).fill(0).map((_, index) => (
                                            <tr key={index} className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                                <td>
                                                    <Skeleton />
                                                </td>
                                                <td>
                                                    <Skeleton />
                                                </td>
                                                <td>
                                                    <Skeleton />
                                                </td>
                                                <td>
                                                    <Skeleton />
                                                </td>
                                                <td>
                                                    <Skeleton />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    {trips?.data.length === 0 && (
                                        <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                            <td colSpan={5} className="text-center">Nenhuma viagem encontrada</td>
                                        </tr>
                                    )}
                                    {trips?.data?.map((trip, index) => (
                                        <tr key={index} className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                            <td className="min-w-[150px] text-black dark:text-white">
                                                <div className="flex items-center">
                                                    <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/images/profile-6.jpeg" alt="avatar" />
                                                    <span className="whitespace-nowrap">{trip?.user.full_name}</span>
                                                </div>
                                            </td>
                                            <td className="min-w-[150px] text-black dark:text-white">
                                                {trip?.provider ? (
                                                    <div className="flex items-center">
                                                        <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/images/profile-6.jpeg" alt="avatar" />
                                                        <span className="whitespace-nowrap">{trip?.provider?.full_name}</span>
                                                    </div>
                                                ) : (
                                                    <span className="whitespace-nowrap font-bold">Não atribuído</span>
                                                )}
                                            </td>
                                            <td>
                                                {trip?.service_type?.name}
                                            </td>
                                            <td>{currencyFormatter(trip?.estimated_fare)}</td>
                                            <td>
                                                <span className={`${trip?.badge} shadow-md dark:group-hover:bg-transparent`}>{trip?.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/images/profile-7.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Andy King</span>
                                            </div>
                                        </td>
                                        <td className="text-info">Nike Sport</td>
                                        <td>
                                            <Link href="/apps/invoice/preview">#76894</Link>
                                        </td>
                                        <td>$126.04</td>
                                        <td>
                                            <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/images/profile-8.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Laurie Fox</span>
                                            </div>
                                        </td>
                                        <td className="text-warning">Sunglasses</td>
                                        <td>
                                            <Link href="/apps/invoice/preview">#66894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/images/profile-9.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Ryan Collins</span>
                                            </div>
                                        </td>
                                        <td className="text-danger">Sport</td>
                                        <td>
                                            <button type="button">#75844</button>
                                        </td>
                                        <td>$110.00</td>
                                        <td>
                                            <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/images/profile-10.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Irene Collins</span>
                                            </div>
                                        </td>
                                        <td className="text-secondary">Speakers</td>
                                        <td>
                                            <Link href="/apps/invoice/preview">#46894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </Panel>
                </div>
            </div>
        </>
    )
}
