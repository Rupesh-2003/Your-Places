import React, { useState } from 'react'

import './MainNavigation.css'
import MainHeader from './MainHeader.js'
import { Link } from 'react-router-dom'
import Navlinks from './NavLinks'
import SideDrawer from './SideDrawer'
import BackDrop from './BackDrop'

const MainNavigation = props => {

    const [drawer, setDrawerOpen] = useState(false)
    const openDrawerHandler = () => {
        setDrawerOpen(true)
    };
    const closeDrawerHandler = () => {
        setDrawerOpen(false)
    };

    return (
        <React.Fragment>
            {drawer && <BackDrop onClick={closeDrawerHandler}/>}
                <SideDrawer show={drawer} onClick={closeDrawerHandler}>
                    <button className="drawer-btn" onClick={closeDrawerHandler}>
                        <h2>Back</h2>
                    </button>
                    <nav className="main-navigation__drawer-nav">
                        <Navlinks />
                    </nav>
                </SideDrawer>)
            <MainHeader>
                {/* for creating hamburger btn */}
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your Places</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <Navlinks/>
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation ;