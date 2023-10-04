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
import {dateToHour, decimalToDegree} from "../functions";

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
    const [avg, setAvg] = useState(0)

    const firstDate = props.dates[0]
    const firstDateString = `${firstDate.getFullYear()}-${firstDate.getDate()}-${firstDate.getMonth() + 1}`
    const endDate = props.dates[1]
    const endDateString = `${endDate.getFullYear()}-${endDate.getDate()}-${endDate.getMonth() + 1}`


    useEffect(() => {
        fetch(`http://localhost:5000/get-water?firstDate=${firstDateString}&endDate=${endDateString}`, {mode: "cors"}).then( async r => {
            const response = await r.json()

            const tempTab = []
            const tabData = []

            let averageNb = 0

            response.forEach((o) => {

                const date = new Date(o.date)

                tempTab.push(o.temp)
                tabData.push(dateToHour(date))
                averageNb += o.temp
            })


            setDateData(tabData)
            setTempData(tempTab)
            setAvg(decimalToDegree(averageNb / response.length))

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
       <div>
           <h2 style={{textAlign: "center"}}>Température de l'eau</h2>
           <Line style={{marginBottom: 30}} options={options} data={data}/>
           <p>Moyenne des températures : {avg} </p>
       </div>

    )

}
