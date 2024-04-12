import React, { useEffect, useState, useCallback, useContext } from 'react';
import Header from './header';
import Footer from './footer';
import { Context } from '../redux/store';
// import '../styles/global.css'

const Layout = ({ pageClass, children }) => {

    const { state, dispatch } = useContext(Context);

    const calculateHeaderHeight = useCallback(() => {
        const header = document.querySelector('header');
        if (header) {
            dispatch({ type: "SET_HEADER_HEIGHT", payload: header.offsetHeight })
        }
    }, []);

    useEffect(() => {
        calculateHeaderHeight();

        const handleResize = () => {
            calculateHeaderHeight();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateHeaderHeight]);


    return (
        <div className={`site-wrapper ${pageClass}`}>
            <Header />
            <main className='site-content'>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;