import React from 'react';
import Tilt from 'react-tilt';
import dot from './dots.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img alt='logo' src={dot} style={{paddingTop: '5px'}}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;