import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { HotelDeals } from "../../components/HotelDeals/ListAdmin";

export const AdminHotelDeals = () => {
     
    return (
        <>
            <DashboardStyle>
                <HotelDeals/> 
            </DashboardStyle>
        </>
    )
}