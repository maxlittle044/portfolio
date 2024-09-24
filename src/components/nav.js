import React, { useContext, useEffect, useCallback } from 'react';
import { useLocation } from '@reach/router';
import { Context } from "../redux/store";
import { Link } from 'gatsby';
import CardSocial from './card/card-social';
import useDeviceSize from '../hooks/use-device-size';

function Nav() {
  const location = useLocation();
  const deviceSizes = useDeviceSize();
  const { dispatch, state } = useContext(Context);

  const handlCloseMenu = useCallback(() => {
    dispatch({ type: 'SET_MOBILE_MENU', payload: false })
  }, [dispatch]);

  useEffect(() => {
    handlCloseMenu();
  }, [location.href, handlCloseMenu]);

  return (
    <nav id="nav" className={`[transition:all_0.6s_ease-in-out] w-full lg:relative lg:flex lg:flex-wrap lg:items-center lg:justify-between navbar-nav ${state.hamburgerOpen ? 'active' : ''}`}>
      <div className="hidden w-auto lg:order-2 lg:w-1/5 lg:text-center lg:block">
        <div className="site-header__logo">
          <Link to='/' className="text-xl font-semibold text-gray-700 font-heading">
            Gajendra Sah
          </Link>
        </div>
        {/* <span className='block lg:inline-block mt-4 lg:mt-0 mr-10 relative z-0 before:absolute before:left-0 before:top-0 before:opacity-0 before:w-0 before:h-[2px] before:bg-gradient-to-r before:from-yellow-500 before:to-red-500 before:transition-all before:duration-500 after:absolute after:right-0 after:bottom-0 after:opacity-0 after:w-[0%] after:h-[2px] after:bg-gradient-to-l after:from-yellow-500 after:to-red-500 after:transition-all after:duration-500 hover:before:w-full hover:before:opacity-100 hover:after:w-full hover:after:opacity-100 gradient-text gradient-text--purple'></span> */}
      </div>

      <div className={`px-[1rem] w-full sm:max-w-screen-sm md:max-w-screen-md sm:mx-auto lg:max-w-none navbar-menu lg:order-1 lg:px-0 lg:block lg:w-2/5 `}>
        <ul className='flex flex-col lg:items-center lg:flex-row'>
          <li className={`mt-4 lg:mr-10 list-none lg:mt-0 lg:text-xl ${deviceSizes.mdDown ? state.hamburgerOpen ? 'slide-in-1' : 'slide-out-1' : ''}`}>
            <Link className="text-white lg:text-blue-900 hover:text-indigo-600" to="/">
              Home
            </Link>
          </li>

          <li className={`mt-4 lg:mr-10 list-none lg:mt-0 lg:text-xl ${deviceSizes.mdDown ? state.hamburgerOpen ? 'slide-in-2' : 'slide-out-2' : ''}`}>
            <Link className="text-white lg:text-blue-900 hover:text-indigo-600" to="#">
              About Me
            </Link>
          </li>

          <li className={`mt-4 lg:mt-0 list-none lg:text-xl ${deviceSizes.mdDown ? state.hamburgerOpen ? 'slide-in-3' : 'slide-out-3' : ''}`}>
            <Link className="text-white lg:text-blue-900 hover:text-indigo-600" to="#">
              Galery
            </Link>
          </li>
        </ul>
      </div>

      <div className={`px-[1rem] w-full sm:max-w-screen-sm md:max-w-screen-md sm:mx-auto lg:max-w-none navbar-menu lg:order-3 lg:px-0 lg:block lg:w-2/5 lg:text-right`}>
        <ul className='flex flex-col lg:items-center lg:flex-row lg:justify-end'>
          <li className={`mt-4 lg:mr-10 list-none lg:mt-0 lg:text-xl ${deviceSizes.mdDown ? state.hamburgerOpen ? 'slide-in-4' : 'slide-out-4' : ''}`}>
            <Link className="text-white lg:text-blue-900 hover:text-indigo-600" to="#">
              Content
            </Link>
          </li>

          <li className={`mt-4 lg:mr-10 list-none lg:mt-0 lg:text-xl ${deviceSizes.mdDown ? state.hamburgerOpen ? 'slide-in-5' : 'slide-out-5' : ''}`}>
            <Link className="text-white lg:text-blue-900 hover:text-indigo-600" to="#">
              FAQ
            </Link>
          </li>

          <li className={`mt-4 lg:mt-0 list-none lg:text-xl ${deviceSizes.mdDown ? state.hamburgerOpen ? 'slide-in-6' : 'slide-out-6' : ''}`}>
            <Link className="text-white lg:text-blue-900 hover:text-indigo-600" to="#">
              Contact
            </Link>
          </li>
        </ul>
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