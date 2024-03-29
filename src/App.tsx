import { Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home"
import "./App.css"
import { Excursions } from "./pages/Excursions/Excursion";
import { Agencies } from "./pages/Agencies/Agencies";
import { AdminAgencies } from "./pages/Admin/AdminAgencies";
import { Packages } from "./pages/Packages/Packages";
import { HotelDeals } from "./pages/HotelDeals/HotelDeals";
import { Agente } from "./pages/Agente/Agente";
import { Admin } from "./pages/Admin/AdminUsers";
import { AgenteExcursion } from "./pages/Agente/AgenteExcursion";
import { AgentePackage } from "./pages/Agente/AgentePackage";
import { AdminExcursions } from "./pages/Admin/AdminExcursions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/packages" element={<Packages/>}/>
      <Route path="/hotelDeals" element={<HotelDeals/>}/>
      <Route path="/excursions" element={<Excursions/>}/>
      <Route path="/excursions/:agencyName" element={<Excursions/>}/>
      <Route path="/agencies" element={<Agencies/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/admin-agencias" element={<AdminAgencies/>}/>
      <Route path="/admin-excursions" element={<AdminExcursions/>}/>
      <Route path="/agente" element={<Agente/>}/>
      <Route path="/agente-excursion" element={<AgenteExcursion/>}/>
      <Route path="/agente-paquete" element={<AgentePackage/>}/>
    </Routes>
  )
}

export default App


