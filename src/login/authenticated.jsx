import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NavButton } from '../app';

import './authenticated.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        locatStorage.removeItem('userName');
        props.onLogout();
    }

    return (
        <div>
            <div className='playerName'>{props.username}</div>
            <NavButton text='Bookshelf' onClick={() => navigate('/bookshelf')} className='nav-btn'/>
            <NavButton text="Logout" onClick={() => logout()} className='nav-btn'/>
        </div>
    );
}