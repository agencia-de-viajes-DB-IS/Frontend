import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { Agencies } from "../../components/Agencies/Agencies";
 

export const AdminAgencies = () => {
     

     
    return (
        <>
            <DashboardStyle>
                <Agencies data={[]}/> 
            </DashboardStyle>
        </>
    )
}