import React, { useEffect, useState, useCallback } from 'react';
import Header from './header';
import Footer from './footer';
// import '../styles/global.css'

const Layout = ({ pageClass, children }) => {
    const [headerHeight, setHeaderHeight] = useState(0);

    const calculateHeaderHeight = useCallback(() => {
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
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

    const siteContentStyle = {
        paddingTop: `${headerHeight}px`
    };

    return (
        <div className={`site-wrapper ${pageClass}`}>
            <Header />
            <main className='site-content' style={siteContentStyle}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;