import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Chart,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Filler,
    Tooltip
} from 'chart.js';
import React, {useState, useEffect} from "react";
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

export const WaterGraph = (props:{refresh: number, dates: Date[]}) => {

    const [tempData, setTempData] = useState([])
    const [dateData, setDateData] = useState([])

    const firstDate = props.dates[0]
    const firstDateString = `${firstDate.getFullYear()}-${firstDate.getDate()}-${firstDate.getMonth() + 1}`
    const endDate = props.dates[1]
    const endDateString = `${endDate.getFullYear()}-${endDate.getDate()}-${endDate.getMonth() + 1}`


    useEffect(() => {
        fetch(`http://localhost:5000/get-water?firstDate=${firstDateString}&endDate=${endDateString}`, {mode: "cors"}).then( async r => {
            const response = await r.json()

            const tempTab = []
            const tabData = []

            response.forEach((o) => {
                tempTab.push(o.temp)
                tabData.push(o.date)
            })


            setDateData(tabData)
            setTempData(tempTab)

            console.log(dateData)
            console.log(tempData)

        })
            .catch((e) => {console.log(e)})
    }, [props.refresh, props.dates])

    let labels = dateData;
    let dataTab = tempData

    useEffect(() => {
        labels = dateData;
        dataTab = tempData
    }, [tempData, dateData])


    if(dateData.length === 0 || tempData.length === 0) return <></>



    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'temperatures eau',
                data: dataTab,
                borderColor: 'rgb(26,186,255)',
                backgroundColor: 'rgba(1,122,199,0.5)',
            }
        ],
    };
    const options = {
        responsive: true,
    };


    return (
        <Line options={options} data={data}/>

    )

}
