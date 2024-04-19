import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { Facilities } from "../../components/Facilities/ListAdmin";
 

export const AdminFacilities = () => {
     

     
    return (
        <>
            <DashboardStyle>
                <Facilities/> 
            </DashboardStyle>
        </>
    )
}