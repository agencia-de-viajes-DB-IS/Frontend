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
import { AdminHotelDeals } from "./pages/Admin/AdminHotelDeals";
import { AdminHotels } from "./pages/Admin/AdminHotels";
import { AdminPackages } from "./pages/Admin/AdminPackages";
import { TouristsList } from "./pages/Tourists/TouristsList";
import { AdminExtendedExcursions } from "./pages/Admin/AdminExtendedExcursions";
import { AdminFacilities } from "./pages/Admin/AdminFacilities";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/packages" element={<Packages/>}/>
      <Route path="/hotelDeals" element={<HotelDeals/>}/>
      <Route path="/excursions" element={<Excursions/>}/>
      <Route path="/excursions/:agencyName" element={<Excursions/>}/>
      <Route path="/my-tourist" element={<TouristsList/>}/>
      <Route path="/agencies" element={<Agencies/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/admin-agencies" element={<AdminAgencies/>}/>
      <Route path="/admin-excursions" element={<AdminExcursions/>}/>
      <Route path="/admin-extendedexcursions" element={<AdminExtendedExcursions/>}/>
      <Route path="/admin-hotelDeals" element={<AdminHotelDeals/>}/>
      <Route path="/admin-hotels" element={<AdminHotels/>}/>
      <Route path="/admin-packages" element={<AdminPackages/>}/>
      <Route path="/agente" element={<Agente/>}/>
      <Route path="/agente-excursion" element={<AgenteExcursion/>}/>
      <Route path="/agente-paquete" element={<AgentePackage/>}/>
      <Route path="/admin-facilities" element={<AdminFacilities/>}/>
    </Routes>
  )
}

export default App


