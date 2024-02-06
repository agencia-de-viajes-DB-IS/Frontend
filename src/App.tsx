import { Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home"
import "./App.css"
import { Excursions } from "./pages/Excursions/Excursion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/excursions" element={<Excursions/>}/>
    </Routes>
  )
}

export default App


