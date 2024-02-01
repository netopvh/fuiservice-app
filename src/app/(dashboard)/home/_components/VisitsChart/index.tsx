'use client'

import { RootState, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { getISOLocalDate } from '@wojtekmaj/date-utils';
import { useGetCompanyVisitQuery } from '@/redux/services/companyVisitApi';
import dynamic from 'next/dynamic';
import { DateUtils } from '@/utils/dateUtils';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

export default function VisitsChart() {

    const [totalVisits, setTotalVisits] = useState<number>(0);
    const [labels, setLabels] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number[]>([]);

    const isDark = useAppSelector((state: RootState) => state.themeConfig.theme) === 'dark' ? true : false;
    const isRtl = useAppSelector((state: RootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [isMounted, setIsMounted] = useState(false);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 11);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);

    const { data, isFetching } = useGetCompanyVisitQuery({
        start: getISOLocalDate(startDate),
        end: getISOLocalDate(endDate),
    });

    useEffect(() => {
        setTotalVisits(0);
        setLabels([]);
        setQuantity([]);

        for (let i = 0; i < data?.length; i++) {
            setTotalVisits((prev) => prev + data[i].quantity);
            setLabels((prev) => [...prev, DateUtils.formatToBr(data[i].date)]);
            setQuantity((prev) => [...prev, data[i].quantity]);
        }
    }, [data]);

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Visitas',
                data: quantity,
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: labels,
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };


    return (
        <div className="mb-6 grid gap-6 xl:grid-cols-1">
            <div className="panel h-full xl:col-span-2">
                <div className="mb-5 flex items-center justify-between dark:text-white-light">
                    <h5 className="text-lg font-semibold">Visitas</h5>
                </div>
                <p className="text-lg dark:text-white-light/90">
                    Total de visitas na loja virtual: <span className="ml-2 text-primary">{totalVisits}</span>
                </p>
                <div className="relative">
                    <div className="rounded-lg bg-white dark:bg-black">
                        {!isFetching ? (
                            <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} width={'100%'} />
                        ) : (
                            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
