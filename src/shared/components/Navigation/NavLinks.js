import React,{ useContext} from 'react'

import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth-context'
import './NavLinks.css'

const Navlinks = props => {
    const auth = useContext(AuthContext) 

    return <ul className="nav-links">
        <li>
            <NavLink to='/' exact>All Users</NavLink>
        </li>
        {auth.isLoggedIn && <li>
            <NavLink to="/u1/places">My Places</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to="/places/new">Add Places</NavLink>
        </li>}
        {!auth.isLoggedIn && <li>
            <NavLink to="/auth">AUTHENICATE</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <button onClick={auth.logout}>LOGOUT</button>
        </li>}
    </ul>
};

export default Navlinks