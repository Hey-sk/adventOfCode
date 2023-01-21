import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"
import './layout.css'

export default function Layout() {
    return (
        <div className="pageWrapper">
            <Navbar/>
            <Outlet className="outlet"/>
            <Footer/>
        </div>
    )
}