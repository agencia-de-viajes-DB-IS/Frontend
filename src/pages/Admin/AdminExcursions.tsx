import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { Excursions } from "../../components/Excursions/ExcursionsListAdmin";

export const AdminExcursions = () => {
     

    return (
        <>
            <DashboardStyle>
                <Excursions data={[]}/> 
            </DashboardStyle>
        </>
    )
}