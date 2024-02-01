'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useGetProductsQuery } from '@/redux/services/productsApi';
import { IProduct } from '@/domain/entities/product';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';

export default function Page() {


    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const [recordsData, setRecordsData] = useState([] as IProduct[]);
    const [showCase, setShowCase] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(10);
    const [search, setSearch] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const { push } = useRouter();

    const { data: products, isFetching, refetch } = useGetProductsQuery({ showcase: showCase, description: search, page: page, size: pageSize, sort: `${sortStatus.columnAccessor},${sortStatus.direction}` });

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (products) {
            setTotalRecords(products.totalElements);
            setRecordsData(products.content);
        }
    }, [products]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleDelete = (id: number) => {
        Swal.fire({
            icon: 'warning',
            title: 'Deseja remover este registro?',
            text: "Essa ação não tem mais volta!",
            showCancelButton: true,
            confirmButtonText: 'Remover',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                Swal.fire({ title: 'Removido!', text: 'Seu registro foi removido com sucesso.', icon: 'success', customClass: 'sweet-alerts' });
            }
        });
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(handleSearch, 500)
        , []);


    return (
        <>
            <div className="panel">
                <div className="mb-4.5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-5">
                        <div className="flex-1 md:flex-auto">
                            <button type="button" onClick={() => {
                                push('/home/products/create');
                            }} className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M15 12h-3m0 0H9m3 0V9m0 3v3" /></g></svg>
                                <span className="ltr:ml-2 rtl:mr-2">Novo Produto</span>
                            </button>
                        </div>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <span className='mr-3'>
                            <input type="checkbox" className="form-checkbox" checked={showCase} onChange={(e) => setShowCase(e.target.checked)} />
                            <span className="ltr:ml-2 rtl:mr-2 font-bold">Vitrine</span>
                        </span>
                        <input type="text" className="form-input w-auto" placeholder="Pesquisar..." onChange={debouncedChangeHandler} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        noRecordsText="Nenhum produto cadastrado"
                        highlightOnHover
                        withBorder
                        fetching={isFetching}
                        className="table-hover whitespace-nowrap"
                        recordsPerPageLabel='Registros por página'
                        columns={[
                            { accessor: 'id', title: 'ID' },
                            { accessor: 'description', title: 'Nome do Produto', sortable: true },
                            {
                                accessor: 'actions',
                                title: 'Ações',
                                width: 150,
                                textAlignment: 'center',
                                render: (product: IProduct) => (
                                    <div className="flex justify-center gap-2">
                                        <button className="btn btn-primary btn-sm" onClick={() => {
                                            push(`/home/products/${product.id}`);
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.5" d="m14.36 4.079l.927-.927a3.932 3.932 0 0 1 5.561 5.561l-.927.927m-5.56-5.561s.115 1.97 1.853 3.707C17.952 9.524 19.92 9.64 19.92 9.64m-5.56-5.561l-8.522 8.52c-.577.578-.866.867-1.114 1.185a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.094 3.281m17.6-10.162L11.4 18.16c-.577.577-.866.866-1.184 1.114a6.554 6.554 0 0 1-1.211.749c-.364.173-.751.302-1.526.56l-3.281 1.094m0 0l-.802.268a1.06 1.06 0 0 1-1.342-1.342l.268-.802m1.876 1.876l-1.876-1.876" /></svg>
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => {
                                            handleDelete(product.id);
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 2.75a2.25 2.25 0 0 0-2.122 1.5a.75.75 0 0 1-1.414-.5a3.751 3.751 0 0 1 7.072 0a.75.75 0 0 1-1.414.5A2.251 2.251 0 0 0 12 2.75ZM2.75 6a.75.75 0 0 1 .75-.75h17a.75.75 0 0 1 0 1.5h-17A.75.75 0 0 1 2.75 6Zm3.165 2.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104c.591.554 1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.814.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.303c-.14-.705-.204-1.643-.294-2.99l-.46-6.9Z" /><path d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821Zm5.821.821a.75.75 0 0 0-1.492-.15l-.5 5a.75.75 0 0 0 1.492.15l.5-5Z" /></g></svg>
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        records={recordsData}
                        page={page}
                        onPageChange={setPage}
                        totalRecords={totalRecords}
                        recordsPerPage={pageSize}
                        onRecordsPerPageChange={(value) => {
                            setPageSize(value);
                        }}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        recordsPerPageOptions={[10, 20, 30]}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Exibindo  ${from} de ${to} de ${totalRecords} registros`}
                    />
                </div>
            </div>
        </>
    )
}
