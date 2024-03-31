import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { Excursions } from "../../components/Excursions/ListAdmin";

export const AdminExcursions = () => {
     

    return (
        <>
            <DashboardStyle>
                <Excursions/> 
            </DashboardStyle>
        </>
    )
}