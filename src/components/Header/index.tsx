import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LABEL_HEADER } from "./constants";
import './style.css'

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    const hideHeader = location.pathname === '/login' || location.pathname === '/register';

    if (hideHeader) {
        return null;
    }

    return(
        <nav className="navbar">
            <NavLink to='/'>
                {LABEL_HEADER.HOME}
            </NavLink>
            <NavLink to='/pool'>
                {LABEL_HEADER.POOL}
            </NavLink>

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
                <div className="navbar-right">
                    <NavLink to='/login' className="navbar-login">
                        Se connecter
                    </NavLink>
                    <NavLink to='/register' className="navbar-register">
                        S'inscrire
                    </NavLink>
                </div>
            )}
        </nav>
    )
}

export default Header;