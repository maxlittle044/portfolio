import React from 'react'
import CardSocial from './card/card-social';
import { Link } from 'gatsby';

const Footer = () => {
    return (
        <footer className='site-footer bg-white dark:bg-gray-800 w-full py-8'>
            <div className="container">
                <ul class="flex flex-wrap justify-between max-w-screen-md mx-auto text-lg font-light">
                    <li class="my-2">
                        <Link class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                            FAQ
                        </Link>
                    </li>
                    <li class="my-2">
                        <Link class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                            Configuration
                        </Link>
                    </li>
                    <li class="my-2">
                        <Link class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                            Github
                        </Link>
                    </li>
                    <li class="my-2">
                        <Link class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                            LinkedIn
                        </Link>
                    </li>
                </ul>
                <div class="pt-8 flex max-w-xs mx-auto items-center justify-center">
                    <CardSocial
                        facebook
                        linkedIn
                        twitter
                        Instagram
                    />
                </div>
                <div class="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
                    Created by
                </div>
            </div>
        </footer>
    );
}

export default Footer