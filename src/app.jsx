import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Bookshelf } from './bookshelf/bookshelf';
import { Friends } from './friends/friends';
import { Customize } from './customize/customize';

export default function App() {
  return (
    <BrowserRouter>
        <div className="text-dark">
            <header className="container-fluid text-center">

                <nav className="navbar">
                    <ul className="justify-content-center">
                        <NavLink className="navbar-brand" to="#">My Bookshelf</NavLink>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="">Login</NavLink></li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="bookshelf">Your Bookshelf</NavLink></li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="friends">Friends</NavLink></li>
                        </menu>
                    </ul>
                </nav>

                <hr />
            </header>
        
            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/bookshelf' element={<Bookshelf />} />
                <Route path='/friends' element={<Friends />} />
                <Route path='/customize' element={<Customize />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="text-light">
                <div className="container-fluid" >
                    <span className="text-reset">Katia Jensen</span>
                    <a className="text-reset" href="https://github.com/katiajensen26/startup.git">GitHub</a>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}