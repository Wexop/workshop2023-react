import {WaterGraph} from "../../components/waterGraph";
import {AirGraph} from "../../components/airGraph";
import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const HomePage = () => {
    const [refresh, setRefresh] = useState(0)
    const [dates, setDates] = useState([new Date(), new Date()])


    setTimeout(() => {
        setRefresh(refresh + 1)
    }, 60000)


    return (
        <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <div style={{width: "60%"}}>
                    <div style={CardStyle}>
                        <WaterGraph refresh={refresh} dates={dates}/>
                    </div>
                    <div style={CardStyle}>
                        <AirGraph refresh={refresh} dates={dates}/>
                    </div>
                </div>
                <div style={{justifyContent: "center", display: "flex", flexDirection: "column"}}>
                    <Calendar value={dates} selectRange={true} onChange={async (r) => setDates(r)}/>
                </div>
            </div>
        </div>
    )
}

export const CardStyle = {padding: 20, borderRadius: 20, backgroundColor: '#eaeaea', marginTop: 20}
