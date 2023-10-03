import { WaterGraph} from "../../components/waterGraph";
import {AirGraph} from "../../components/airGraph";
import {useState} from "react";

export const HomePage = () => {
    const [refresh, setRefresh] = useState(0)


    setTimeout(() => {
        setRefresh(refresh+1)
    }, 1000)

    return (
        <div>
            <div style={{width: "60%"}}>
                <WaterGraph refresh={refresh}/>
            </div>
            <div style={{width: "60%"}}>
                <AirGraph refresh={refresh}/>
            </div>
        </div>
    )
}
