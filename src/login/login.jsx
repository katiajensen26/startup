import React from 'react';
import { NavButton } from '../app';

export function Login() {
  return (
        <main className="container-fluid text-center">
            <div>
                <h1>Welcome to My Bookshelf!</h1>
                <form method="get" action="bookshelf.html">
                    <div className="input-group mb-3">
                        <span className="input-group-text">@</span>
                        <input className="form-control" type="text" placeholder="your@email.com"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">🔒</span>
                        <input className="form-control" type="password" placeholder="password"/>
                    </div>
                    <NavButton text="Login" url="/bookshelf" className="login-btn"/>
                    <NavButton text="Create" url="/bookshelf" className="custom-btn"/>
                </form>
            </div>
        </main>
  );
}