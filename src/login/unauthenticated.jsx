import React from 'react';

import { NavButton } from '../app';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUsername] = React.useState(props.userName || '');
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate('/api/auth/login');
    }

    async function createUser() {
        loginOrCreate('/api/auth/create');
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <>
        <div>
            <div className="input-group mb-3">
                <span className="input-group-text">@</span>
                <input className="form-control" type="email" value={userName} onChange={(e) => setUsername(e.target.value)} placeholder="your@email.com"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
            </div>
            <NavButton text="Login" onClick={() => loginUser()} disabled={!userName || !password} className="login-btn"/>
            <NavButton text="Create" onClick={() => createUser()} disabled={!userName || !password} className="custom-btn"/>
        </div>    
        
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)}/>
        </>

    );
}