import React from 'react';
import { useNavigate } from 'react-router-dom';

import { NavButton } from '../app';

import './authenticated.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
        .catch(() => {
            //Logout failed.
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        });
    }

    return (
        <div>
            <div className='playerName'>{props.username}</div>
            <NavButton text='Bookshelf' onClick={() => navigate('/bookshelf')} className='custom-btn'/>
            <NavButton text="Logout" onClick={() => logout()} className='login-btn'/>
        </div>
    );
}