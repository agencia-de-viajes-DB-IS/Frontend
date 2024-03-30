import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { Agencies } from "../../components/Agencies/AgenciesListAdmin";
 

export const AdminAgencies = () => {
     

     
    return (
        <>
            <DashboardStyle>
                <Agencies/> 
            </DashboardStyle>
        </>
    )
}