import { Link } from 'gatsby';
import React from 'react'

const Nav = () => {
  return (

    <nav class="flex flex-wrap items-center justify-between bg-white">
      <div class="w-auto lg:order-2 lg:w-1/5 lg:text-center">
        <Link to='/' class="text-xl font-semibold text-gray-800 font-heading">
          Gajendra Sah
        </Link>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 rounded navbar-burger">
          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>
              Menu
            </title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
            </path>
          </svg>
        </button>
      </div>
      <div class="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">
        <Link class="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="/">
          Home
        </Link>
        <Link class="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Team
        </Link>
        <Link class="block mt-4 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Galery
        </Link>
      </div>
      <div class="hidden w-full navbar-menu lg:order-3 lg:block lg:w-2/5 lg:text-right">
        <Link class="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Content
        </Link>
        <Link class="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          FAQ
        </Link>
        <Link class="block mt-4 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600" to="#">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Nav;