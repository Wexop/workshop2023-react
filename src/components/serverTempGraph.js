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

export const ServerTempGraph = (props: { refresh: number, dates: Date[] }) => {

    const [tempCpuData, setTempCpuData] = useState([])
    const [tempGpuData, setTempGpuData] = useState([])
    const [tempDiskData, setTempDiskData] = useState([])
    const [dateData, setDateData] = useState([])

    const firstDate = props.dates[0]
    const firstDateString = `${firstDate.getFullYear()}-${firstDate.getDate()}-${firstDate.getMonth() + 1}`
    const endDate = props.dates[1]
    const endDateString = `${endDate.getFullYear()}-${endDate.getDate()}-${endDate.getMonth() + 1}`


    useEffect(() => {
        fetch(`http://localhost:5000/get-server?firstDate=${firstDateString}&endDate=${endDateString}`, {mode: "cors"}).then(async r => {
            const response = await r.json()

            const tempCpuTab = []
            const tempGpuTab = []
            const tempDiskTab = []
            const tabData = []

            response.forEach((o) => {

                const date = new Date(o.date)

                tempCpuTab.push(o.temp_cpu_avg)
                tempGpuTab.push(o.temp_gpu)
                tempDiskTab.push(o.temp_disk)
                tabData.push(dateToHour(date))
            })


            setDateData(tabData)
            setTempCpuData(tempCpuTab)
            setTempGpuData(tempGpuTab)
            setTempDiskData(tempDiskTab)

            console.log(dateData)
            console.log(tempCpuTab)

        })
            .catch((e) => {
                console.log(e)
            })
    }, [props.refresh, props.dates])

    let labels = dateData;
    let dataCpuTab = tempCpuData
    let dataGpuTab = tempGpuData
    let dataDiskTab = tempDiskData

    useEffect(() => {
        labels = dateData;
        dataCpuTab = tempCpuData
        dataGpuTab = tempGpuData
        dataDiskTab = tempDiskData
    }, [tempCpuData, dateData, tempGpuData, tempDiskData])


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
            },
            {
                fill: false,
                label: 'Disques',
                data: dataDiskTab,
                borderColor: 'rgb(215,93,0)',
                backgroundColor: 'rgba(164,104,0,0.5)',
            }
        ],
    };
    const options = {
        responsive: true,
    };


    return (
        <div>
            <h2 style={{textAlign: "center"}}>Températures du serveur en °C</h2>
            <Line style={{marginBottom: 30}} options={options} data={data}/>
        </div>

    )

}
