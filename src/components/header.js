import React from 'react'
import Nav from './nav';

const Header = () => {
    return (
        <header className='site-header'>
            <div className="container">
                <Nav />
            </div>
        </header>
    );
}

export default Header