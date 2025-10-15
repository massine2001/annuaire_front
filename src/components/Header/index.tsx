import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LABEL_HEADER } from "./constants";
import './style.css'
import React from "react";

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    const hideHeader = location.pathname === '/login' || location.pathname === '/register';

    if (hideHeader) {
        return null;
    }

    return(
        <nav className="navbar">
            <div className="sub-nav">
                <NavLink to='/'>
                    {LABEL_HEADER.HOME}
                </NavLink>
                <NavLink to='/pool'>
                    {LABEL_HEADER.POOL}
                </NavLink>
            </div>
        
            {isAuthenticated ? (
                <>
                    <NavLink to='/profil'>
                        {LABEL_HEADER.PROFIL}
                    </NavLink>
                    
                    <div className="navbar-right">
                        <span className="navbar-user">
                            👤 {user?.firstName} {user?.lastName}
                        </span>
                        <button onClick={logout} className="navbar-logout">
                            Déconnexion
                        </button>
                    </div>
                </>
            ) : (
                <div className="sub-nav">
                    <NavLink to='/login' >
                        Se connecter
                    </NavLink>
                    <NavLink to='/register' >
                        S'inscrire
                    </NavLink>
                </div>
                    
            )}
        </nav>
    )
}

export default Header;