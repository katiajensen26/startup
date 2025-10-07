import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className="text-dark">
        <header className="container-fluid text-center">

            <nav className="navbar">
                <ul className="justify-content-center">
                    <a className="navbar-brand" href="#">My Bookshelf</a>
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="index.html">Home</a></li>
                        <li className="nav-item">
                            <a className="nav-link" href="bookshelf.html">Your Bookshelf</a></li>
                        <li className="nav-item">
                            <a className="nav-link" href="friends.html">Friends</a></li>
                    </menu>
                </ul>
            </nav>

            <hr />
        </header>
        
        <main>App components go here</main>

        <footer className="text-light">
            <div className="container-fluid" >
                <span>Katia Jensen</span>
                <a className="text-reset" href="https://github.com/katiajensen26/startup.git">GitHub</a>
            </div>
        </footer>
    </div>
  );
}