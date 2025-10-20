import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Bookshelf } from './bookshelf/bookshelf';
import { Friends } from './friends/friends';
import { Customize } from './customize/customize';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUsername] = React.useState(localStorage.getItem('userName'));
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    const [books, setBooks] = React.useState(() => {
        const savedBooks = localStorage.getItem('bookshelf');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('bookshelf', JSON.stringify(books));
    }, [books]);

    function addBook(newBook) {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    }

    function deleteBook(index) {
        setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
    }

  return (
    <BrowserRouter>
        <div className="app-container text-dark">
            <header className="container-fluid text-center">

                <nav className="navbar">
                    <ul className="justify-content-center">
                        <NavLink className="navbar-brand" to="#">My Bookshelf</NavLink>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Login</NavLink></li>
                            {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/bookshelf">Your Bookshelf</NavLink></li>
                            )}
                            {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/customize">Customize</NavLink>
                            </li>
                            )}
                            {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/friends">Friends</NavLink></li>
                            )}

                        </menu>
                    </ul>
                </nav>

                <hr />
            </header>
        
            <Routes>
                <Route path='/' element={
                    <Login userName={userName}
                    authState={authState}
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUsername(userName);
                    }}
                    />
                } />
                <Route path='/bookshelf' element={<Bookshelf books={books} deleteBook={deleteBook} />} />
                <Route path='/customize' element={<Customize addBook={addBook} deleteBook={deleteBook} />} />
                <Route path='/friends' element={<Friends />} />
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

export function NavButton({ text, url, onClick, className="", disabled=false }) {
    const navigate = useNavigate();

    function handleClick() {
        if (onClick) {
            onClick();
        } else if (url) {
            navigate(url);
        }
    }

    return (
        <button type="button" className={className} onClick={handleClick} disabled={disabled}>{text}</button>
    );
}