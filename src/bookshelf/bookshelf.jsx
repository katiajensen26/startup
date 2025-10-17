import React from 'react';
import './bookshelf.css';
import { NavButton } from '../app';
import { Link } from 'react-router-dom';

export function Bookshelf() {
    const [bookshelfName, setBookshelfName] = React.useState('');
    const [books, setBooks] = React.useState([]);

    function addBook() {
        const newBook = {
            title: `Book ${books.length + 1}`,
            color: getRandomColor(),
            shelf: Math.floor(books.length / 5),
        };
        setBooks([...books, newBook]);
    }

    function getRandomColor() {
        const colors = ['2791c2', 'f2a900', 'e03c31', '34a853', 'bb2bcc', '5ba80d', '0d60a8', 'e0a614', 'a80d60', 'ff7de7', 'd93025'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

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