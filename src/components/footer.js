import React from 'react'
import CardSocial from './card/cardSocial';
import { Link } from 'gatsby';

const Footer = () => {
    return (
        <footer className='site-footer bg-white dark:bg-gray-800 w-full py-8'>
            <div className="container">
                <ul className="flex flex-wrap justify-between max-w-screen-md mx-auto text-lg font-light">
                    <li className="my-2">
                        <Link className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" to="#">
                            FAQ
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" to="#">
                            Configuration
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" to="#">
                            Github
                        </Link>
                    </li>
                    <li className="my-2">
                        <Link className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" to="#">
                            LinkedIn
                        </Link>
                    </li>
                </ul>
                <div className="pt-8 flex max-w-xs mx-auto items-center justify-center">
                    <CardSocial
                        facebook
                        linkedIn
                        twitter
                        Instagram
                    />
                </div>
                <div className="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
                    Created by
                </div>
            </div>
        </footer>
    );
}

export default Footer