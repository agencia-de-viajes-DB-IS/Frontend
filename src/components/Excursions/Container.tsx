import { useState } from "react"
import { tpExcursions } from "../../files/types"
import "./styles.css"


function Container() {
    
    const [data, setData] = useState<tpExcursions[]>([])

    return
        <>
            <div className="heading">
                <h1>Search Box</h1>
            </div>
            <div className="search">
                <input  className="search-txt" type="text" name="" placeholder="Type to search"/>
            
                <a className="search-btn" href="#" >
                    <i className="fas fa-search"></i>
                </a>
            </div>
        </>
} export default Container