import { WaterGraph} from "../../components/waterGraph";
import {AirGraph} from "../../components/airGraph";
import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const HomePage = () => {
    const [refresh, setRefresh] = useState(0)
    const [dates, setDates] = useState([new Date(), new Date()])


    setTimeout(() => {
        setRefresh(refresh+1)
    }, 60000)


    return (
        <div>
            <Calendar value={dates} selectRange={true} onChange={async (r) => setDates(r)}  />
            <div style={{width: "60%"}}>
                <WaterGraph refresh={refresh} dates={dates}/>
            </div>
            <div style={{width: "60%"}}>
                <AirGraph refresh={refresh} dates={dates}/>
            </div>
        </div>
    )
}
