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

export const WaterGraph = () => {

    const [tempData, setTempData] = useState([])
    const [dateData, setDateData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/get-water", {mode: "cors"}).then( async r => {
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
    }, [])

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
