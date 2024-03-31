import { DashboardStyle } from "../../components/DashboardStyle/DashboardStyle"; 
import './styles.css'
import { Packages } from "../../components/Packages/ListAdmin";

export const AdminPackages = () => {
     
    return (
        <>
            <DashboardStyle>
                <Packages/>
            </DashboardStyle>
        </>
    )
}