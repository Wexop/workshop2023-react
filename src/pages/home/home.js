import {WaterGraph} from "../../components/waterGraph";
import {AirGraph} from "../../components/airGraph";
import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {ServerTempGraph} from "../../components/serverTempGraph";
import {ServerConsGraph} from "../../components/serverConsGraph";

export const HomePage = () => {
    const [refresh, setRefresh] = useState(0)
    const [dates, setDates] = useState([new Date(), new Date()])

    const [showCalendar, setShowCalendar] = useState(false)


    setTimeout(() => {
        setRefresh(refresh + 1)
    }, 60000)


    return (
        <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                <a style={{padding: 20, backgroundColor: "#3ac4ff", borderRadius: 15, color: "white"}}
                   onClick={() => setShowCalendar(!showCalendar)}>Calendrier</a>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                gap: 20
            }}>
                <div style={CardStyle}>
                    <WaterGraph refresh={refresh} dates={dates}/>
                </div>
                <div style={CardStyle}>
                    <AirGraph refresh={refresh} dates={dates}/>
                </div>
                <div style={{
                    display: "flex",
                    direction: "row",
                    width: "90%",
                    justifyContent: "space-evenly",
                    backgroundColor: "#EAEAEAFF",
                    borderRadius: 20,
                    flexWrap: "wrap"
                }}>
                    <div style={CardStyle}>
                        <ServerTempGraph refresh={refresh} dates={dates}/>
                    </div>
                    <div style={CardStyle}>
                        <ServerConsGraph refresh={refresh} dates={dates}/>
                    </div>
                </div>
                <div style={{
                    justifyContent: "center",
                    display: showCalendar ? "flex" : "none",
                    flexDirection: "column",
                    position: "absolute"
                }}>
                    <Calendar value={dates} selectRange={true} onChange={async (r) => setDates(r)}/>
                </div>
            </div>
        </div>
    )
}

export const CardStyle = {padding: 20, borderRadius: 20, backgroundColor: '#eaeaea', marginTop: 20, width: "40%"}
