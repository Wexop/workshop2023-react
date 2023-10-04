import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import React, {useEffect, useState} from "react";
import {dateToHour} from "../functions";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const ServerConsGraph = (props: { refresh: number, dates: Date[] }) => {

    const [consCpuData, setConsCpuData] = useState([])
    const [consGpuData, setConsGpuData] = useState([])
    const [dateData, setDateData] = useState([])

    const firstDate = props.dates[0]
    const firstDateString = `${firstDate.getFullYear()}-${firstDate.getDate()}-${firstDate.getMonth() + 1}`
    const endDate = props.dates[1]
    const endDateString = `${endDate.getFullYear()}-${endDate.getDate()}-${endDate.getMonth() + 1}`


    useEffect(() => {
        fetch(`http://localhost:5000/get-server?firstDate=${firstDateString}&endDate=${endDateString}`, {mode: "cors"}).then(async r => {
            const response = await r.json()

            const consCpuTab = []
            const consGpuTab = []
            const tabData = []

            response.forEach((o) => {

                const date = new Date(o.date)

                consCpuTab.push(o.cons_cpu_total)
                consGpuTab.push(o.cons_gpu)
                tabData.push(dateToHour(date))
            })


            setDateData(tabData)
            setConsCpuData(consCpuTab)
            setConsGpuData(consGpuTab)

            console.log(dateData)

        })
            .catch((e) => {
                console.log(e)
            })
    }, [props.refresh, props.dates])

    let labels = dateData;
    let dataCpuTab = consCpuData
    let dataGpuTab = consGpuData

    useEffect(() => {
        labels = dateData;
        dataCpuTab = consCpuData
        dataGpuTab = consGpuData
    }, [consCpuData, dateData, consGpuData])


    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'CPU',
                data: dataCpuTab,
                borderColor: 'rgb(26,106,255)',
                backgroundColor: 'rgba(1,110,199,0.5)',
            },
            {
                fill: true,
                label: 'GPU',
                data: dataGpuTab,
                borderColor: 'rgb(14,137,0)',
                backgroundColor: 'rgba(0,104,23,0.5)',
            }
        ],
    };
    const options = {
        responsive: true,
    };


    return (
        <div>
            <h2 style={{textAlign: "center"}}>Consomation du serveur en W</h2>
            <Line style={{marginBottom: 30}} options={options} data={data}/>
        </div>

    )

}
