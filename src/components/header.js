import React, { useContext, useRef, useEffect } from 'react'
import Nav from './nav';
import { Context } from "../redux/store";
import { Link } from 'gatsby';

function Header() {
    const { state, dispatch } = useContext(Context);
    const headerRef = useRef(null);

    const handleHamburgerClick = () => {
        dispatch({ type: 'SET_MOBILE_MENU', payload: !state.hamburgerOpen })
    }

    useEffect(() => {
        if (state.hamburgerOpen) {
            const headerHeight = headerRef.current.offsetHeight;
            document.getElementById('nav').style.paddingTop = `${headerHeight}px`;
        } else {
            document.getElementById('nav').style.paddingTop = '0px';
        }
    }, [state.hamburgerOpen]);

    return (
        <header className={`site-header ${state.hamburgerOpen ? 'show-navbar' : ''}`} ref={headerRef}>
            <div className="container">
                <div className="site-header__content relative z-[999] flex flex-wrap items-center justify-between lg:hidden">
                    <div className="site-header__logo">
                        <Link to='/' className="text-xl font-semibold text-gray-800 font-heading">
                            Gajendra Sah
                        </Link>
                    </div>
                    <div className="site-header__menu">
                        <button
                            onClick={handleHamburgerClick}
                            className={`flex items-center p-1 rounded-full border-2 border-t-black border-r-black border-b-black border-l-black menu navbar-menu transition-all duration-500
                            ${state.hamburgerOpen ? 'active border-t-white border-r-white border-b-white border-l-white' : ''}`}
                            aria-label="Main Menu"
                        >
                            {/* <svg width="100" height="100" viewBox="0 0 100 100">
                                <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                <path class="line line2" d="M 20,50 H 80" />
                                <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                            </svg> */}
                            <svg width="50" height="50" viewBox="0 0 50 50">
                                <path className="line line1" d="M 10,14.5 H 40 C 40,14.5 47.2494195,14.408676 47.2664935,33.3556655 47.271571,38.9903365 45.4830405,40.835123 42.6295865,40.833499 39.7761345,40.831875 37.5001055,37.499971 37.5001055,37.499971 L 12.5000105,12.500029" />
                                <path className="line line2" d="M 10,25 H 40" />
                                <path className="line line3" d="M 10,35.499977 H 40 C 40,35.499977 47.2494195,35.591324 47.2664935,16.6443355 47.271571,10.0096645 45.4830405,8.164877 42.6295865,8.1665005 39.7761345,8.1681245 37.5001055,11.500029 37.5001055,11.500029 L 12.5000105,37.499971" />
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