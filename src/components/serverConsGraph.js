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
import {dateToHour, decimalToWatt} from "../functions";

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

    const [avgCpu, setAvgCpu] = useState(0)
    const [avgGpu, setAvgGpu] = useState(0)
    const [totalCpu, setTotalCpu] = useState(0)
    const [totalGpu, setTotalGpu] = useState(0)
    const [totalServer, setTotalServer] = useState(0)

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

            let avgCpuNb = 0
            let avgGpuNb = 0

            response.forEach((o) => {

                const date = new Date(o.date)

                consCpuTab.push(o.cons_cpu_total)
                consGpuTab.push(o.cons_gpu)
                tabData.push(dateToHour(date))

                avgCpuNb += o.cons_cpu_total
                avgGpuNb += o.cons_gpu
            })


            setDateData(tabData)
            setConsCpuData(consCpuTab)
            setConsGpuData(consGpuTab)

            setAvgCpu(decimalToWatt(avgCpuNb / response.length))
            setAvgGpu(decimalToWatt(avgGpuNb / response.length))

            setTotalCpu(decimalToWatt(avgCpuNb))
            setTotalGpu(decimalToWatt(avgGpuNb))

            setTotalServer(decimalToWatt(avgCpuNb + avgGpuNb))

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
                fill: false,
                label: 'CPU',
                data: dataCpuTab,
                borderColor: 'rgb(26,106,255)',
                backgroundColor: 'rgba(1,110,199,0.5)',
            },
            {
                fill: false,
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
            <p>Consomation moyenne du CPU : {avgCpu}</p>
            <p>Consomation moyenne du GPU : {avgGpu}</p>
            <p>Consomation totale du GPU : {totalCpu}</p>
            <p>Consomation totale du GPU : {totalGpu}</p>
            <p>Consomation totale du server : {totalServer}</p>
        </div>

    )

}
