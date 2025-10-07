import React from 'react';

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
                    <button type="submit" className="login-btn">Login</button>
                    <button type="submit" className="custom-btn">Create</button>
                </form>
            </div>
        </main>
  );
}