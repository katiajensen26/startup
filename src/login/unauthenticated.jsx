import React from 'react';

import { NavButton } from '../app';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUsername] = React.useState('props.userName');
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <>
        <div>
            <h1>Welcome to My Bookshelf!</h1>
            <form method="get" action="bookshelf.html">
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input className="form-control" type="email" value={userName} onChange={(e) => setUsername(e.target.value)} placeholder="your@email.com"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                </div>
                <NavButton text="Login" onClick={() => loginUser()} disabled={!userName || !password} url="/bookshelf" className="login-btn"/>
                <NavButton text="Create" onClick={() => createUser()} disabled={!userName || !password} url="/bookshelf" className="custom-btn"/>
            </form>
        </div>    
        
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)}/>
        </>

    );
}