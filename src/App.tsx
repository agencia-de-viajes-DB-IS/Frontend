import { Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home"
import "./App.css"
import { Excursions } from "./pages/Excursions/Excursion";
import { Agencies } from "./pages/Agencies/Agencies";
import { Admin } from "./pages/Admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/excursions" element={<Excursions/>}/>
      <Route path="/agencies" element={<Agencies/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  )
}

export default App


