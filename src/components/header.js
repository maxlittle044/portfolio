import React, { useContext } from 'react'
import Nav from './nav';
import { Context } from "../redux/store";
import { Link } from 'gatsby';

function Header() {
    const { state, dispatch } = useContext(Context);

    const handleHamburgerClick = () => {
        dispatch({ type: 'SET_MOBILE_MENU', payload: !state.hamburgerOpen })
    }

    return (
        <header className={`site-header ${state.hamburgerOpen ? 'show-navbar' : ''}`}>
            <div className="container">
                <div className="site-header__content relative z-[999] flex flex-wrap items-center justify-between lg:hidden">
                    <div className="site-header__logo">
                        <Link to='/' className="text-xl font-semibold text-gray-800 font-heading">
                            Gajendra Sah
                        </Link>
                    </div>
                    <div className="site-header__menu">
                        <button onClick={handleHamburgerClick} className={`flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 rounded navbar-burger ${state.hamburgerOpen ? 'menu-active' : ''}`}>
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>
                                    Menu
                                </title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                <Nav />
            </div>
        </header>
    );
}

export default Header