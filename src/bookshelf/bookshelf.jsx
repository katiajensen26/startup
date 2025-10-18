import React from 'react';
import './bookshelf.css';
import { NavButton } from '../app';
import { Link } from 'react-router-dom';

export function Bookshelf({ books }) {
    const [bookshelfName, setBookshelfName] = React.useState('');


    function handleBookshelfTitle(event) {
        setBookshelfName(event.target.value);
    }

    function handleBookshelfShare() {
        const bookshelfURL = window.location.href; //placeholder until third party api is added
        navigator.clipboard.writeText(bookshelfURL);
        alert('Bookshelf URL copied to clipboard: ' + bookshelfURL);
    }

    return (
        <main className="container-fluid d-flex flex-column align-items-center">
            <div className="text-center">
                <label htmlFor="name">Bookshelf Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your bookshelf title" size="30" value={bookshelfName} onChange={handleBookshelfTitle} />
                <button id="save-title" className="custom-btn" onClick={handleBookshelfTitle}>Save</button>
            </div>

            <br />

            <svg width="700" height="1000" viewBox="0 0 700 1000">
                <rect x ="0" y="300" width="700" height="20" fill="#4a290a"></rect>
                <rect x ="0" y="600" width="700" height="20" fill="#4a290a"></rect>
                <rect x ="0" y="900" width="700" height="20" fill="#4a290a"></rect>

                {books.map((book, index) => {
                    const shelfY = [100, 400, 700][book.shelf];
                    const bookX = 50 + (index % 5) * 75;
                    const labelY = shelfY + 130;

                    return (
                        <g key={index}>
                            <rect x={bookX} y={shelfY} width='50' height='200' fill={book.color}></rect>
                            <text x={bookX} y={labelY} className='book-label' transform={`rotate(-90, ${bookX}, ${labelY})`}>{book.title}</text>
                        </g>
                    );
                })}

            </svg>

            <div className="text-center">
                <label htmlFor="new_book">Add a new book:</label>
                <NavButton text="+" url="/customize" className="custom-btn"/>
            </div>

            <br />

            <div>
                <button id="share-bookshelf" className="custom-btn" onClick={handleBookshelfShare}>Share your bookshelf!</button>
            </div>
        </main>
  );
}