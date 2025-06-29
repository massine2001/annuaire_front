import { NavLink } from "react-router-dom";
import { LABEL_HEADER } from "./constants";
import './style.css'

const Header = () => {
    return(
        <nav className="navbar">
            <NavLink to='/pool'>
                {LABEL_HEADER.POOL}
            </NavLink>
            <NavLink to='/doc'>
                {LABEL_HEADER.DOCS}
            </NavLink>
            <NavLink to='/'>
                {LABEL_HEADER.HOME}
            </NavLink>
            <NavLink to='/access'>
                {LABEL_HEADER.ACCESS}
            </NavLink>
            <NavLink to='/profil'>
                {LABEL_HEADER.PROFIL}
            </NavLink>
        </nav>
    )
}

export default Header;