import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { Hotels } from "../../components/Hotels/ListAdmin";

export const AdminHotels = () => {
     
    return (
        <>
            <DashboardStyle>
                <Hotels/> 
            </DashboardStyle>
        </>
    )
}