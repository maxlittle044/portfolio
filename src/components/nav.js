import React, { useContext, useEffect } from 'react';
import { useLocation } from '@reach/router';
import { Context } from "../redux/store";
import { Link } from 'gatsby';
import CardSocial from './card/card-social';

function Nav() {
  const location = useLocation()
  const { dispatch, state } = useContext(Context);

  const handlCloseMenu = () => {
    dispatch({ type: 'SET_MOBILE_MENU', payload: false })
  }

  useEffect(() => {
    handlCloseMenu();
  }, [location.href])

  return (
    <nav id="nav" className={`[transition:all_.3s] w-full lg:relative lg:flex lg:flex-wrap lg:items-center lg:justify-between navbar-nav ${state.hamburgerOpen ? 'active' : ''}`}>
      <div className="w-auto lg:order-2 lg:w-1/5 lg:text-center">
        <div className="hidden lg:block">
          <Link to='/' className="text-xl font-semibold text-gray-800 font-heading">
            Gajendra Sah
          </Link>
        </div>
        {/* <span className='block lg:inline-block mt-4 lg:mt-0 mr-10 relative z-0 before:absolute before:left-0 before:top-0 before:opacity-0 before:w-0 before:h-[2px] before:bg-gradient-to-r before:from-yellow-500 before:to-red-500 before:transition-all before:duration-500 after:absolute after:right-0 after:bottom-0 after:opacity-0 after:w-[0%] after:h-[2px] after:bg-gradient-to-l after:from-yellow-500 after:to-red-500 after:transition-all after:duration-500 hover:before:w-full hover:before:opacity-100 hover:after:w-full hover:after:opacity-100 gradient-text gradient-text--purple'></span> */}
      </div>

      <div className={`px-[1rem] w-full sm:max-w-screen-sm md:max-w-screen-md sm:mx-auto lg:max-w-none navbar-menu lg:order-1 lg:px-0 lg:block lg:w-2/5 `}>
        <Link className="block mt-4 mr-10 text-white lg:text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="/">
          Home
        </Link>
        <Link className="block mt-4 mr-10 text-white lg:text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Team
        </Link>
        <Link className="block mt-4 text-white lg:text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Galery
        </Link>
      </div>
      <div className={`px-[1rem] w-full sm:max-w-screen-sm md:max-w-screen-md sm:mx-auto lg:max-w-none navbar-menu lg:order-3 lg:px-0 lg:block lg:w-2/5 lg:text-right `}>
        <Link className="block mt-4 mr-10 text-white lg:text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Content
        </Link>
        <Link className="block mt-4 mr-10 text-white lg:text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          FAQ
        </Link>
        <Link className="block mt-4 text-white lg:text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Contact
        </Link>
      </div>
      <div className={`mt-auto pb-8 px-[1rem] w-full navbar-menu lg:hidden `}>
        <div className="pt-8 flex max-w-xs mx-auto items-center justify-center">
          <CardSocial
            facebook
            linkedIn
            twitter
            Instagram
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;