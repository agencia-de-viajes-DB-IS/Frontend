import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { HotelDeals } from "../../components/HotelDeals/HotelDealsListAdmin";

export const AdminExcursions = () => {
     

    return (
        <>
            <DashboardStyle>
                <HotelDeals/> 
            </DashboardStyle>
        </>
    )
}