import Iconify from '@/components/custom/iconify';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChartData } from '@/data/chart-data';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useRef, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const LineChart = () => {
    const chartRef = useRef<any>(null);
    const [filter, setFilter] = useState('1w')
    const [fullscreen, setFullscreen] = useState(false)

    const [series, setSeries] = useState([
        {
            name: 'Price',
            data: [],
        },
    ]);

    const [options, setOptions] = useState<ApexOptions>({
        chart: {
            type: "area",
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
            colors: ["#4B40EE"],
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0,
                stops: [0, 100],
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: "#E8E7FF",
                            opacity: 1,
                        },
                        {
                            offset: 100,
                            color: "#ffffff",
                            opacity: 0,
                        },
                    ],
                ],
            },
        },
        tooltip: {
            enabled: true,
            shared: false,
            intersect: false,
            custom: ({ series, seriesIndex, dataPointIndex }) => {
                const value = series[seriesIndex][dataPointIndex];
                return `<div style="background:#4B40EE;padding:6px 10px;border-radius:4px;color:white;font-weight:500;">
            $${value.toLocaleString()}
          </div>`;
            },
        },
        xaxis: {
            type: "datetime",
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            opposite: true,
            labels: {
                formatter: (val) => `$${val.toLocaleString()}`,
                style: {
                    colors: "#999",
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#eee",
            strokeDashArray: 4,
        },
        markers: {
            size: 0,
        },
    });

    const dates = [
        '1d', '3d', '1w', '1m', '6m', '1yr', 'max'
    ]

    useEffect(() => {

        const xaxisFormatters = {
            '1d': 'HH:mm',
            '3d': 'MMM d',
            '1w': 'MMM d',
            '1m': 'MMM d',
            '6m': 'MMM',
            '1yr': 'MMM',
            'max': 'MMM d, yyyy',
        };

        setSeries([
            {
                name: 'Price',
                data: ChartData[filter] || [],
            },
        ]);

        setOptions((prev) => ({
            ...prev,
            tooltip: {
                enabled: true,
                shared: false,
                intersect: false,
                custom: ({ series, seriesIndex, dataPointIndex }) => {
                    const value = series[seriesIndex][dataPointIndex];
                    return `<div style="background:#4B40EE;padding:6px 10px;border-radius:4px;color:white;font-weight:500;">
                        $${value.toLocaleString()}
                    </div>`;
                },
                x: {
                    format: xaxisFormatters[filter],
                },
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    show: true,
                    format: xaxisFormatters[filter],
                    style: { colors: "#888" },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
        }));
    }, [filter]);


    return (
        <div className="w-[80%] mt-6 pb-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Button variant='ghost' onClick={() => setFullscreen(true)}><Iconify icon='mingcute:fullscreen-2-line' /> Fullscreen</Button>
                    <Button variant='ghost'><Iconify icon='gridicons:add-outline' /> Compare</Button>
                </div>
                <div className="flex items-center gap-2">
                    {dates.map((date) => (
                        <Button key={date} variant='ghost' className={`${filter === date ? `bg-[#4B40EE] text-white hover:bg-[#4B40EE] hover:text-white` : 'text-[#6F7177]'}`} onClick={() => setFilter(date)}>{date}</Button>
                    ))}
                </div>
            </div>
            <ApexCharts ref={chartRef} options={options} series={series} type="area" height={300} />

            <Dialog open={fullscreen} onOpenChange={setFullscreen}>

                <DialogContent className='min-w-[80%] min-h-[90%] flex flex-col'>
                    <h1 className='text-[#001b71]'>Chart</h1>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Button variant='ghost'><Iconify icon='gridicons:add-outline' /> Compare</Button>
                        </div>
                        <div className="flex items-center gap-2">
                            {dates.map((date) => (
                                <Button key={date} variant='ghost' className={`${filter === date ? `bg-[#4B40EE] text-white hover:bg-[#4B40EE] hover:text-white` : 'text-[#6F7177]'}`} onClick={() => setFilter(date)}>{date}</Button>
                            ))}
                        </div>
                    </div>
                    <ApexCharts ref={chartRef} options={options} series={series} type="area" height={450} />

                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LineChart