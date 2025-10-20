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

    function fitFontSize(text, font, maxWidth, baseSize = 80) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let size = baseSize;
        context.font = `${size}px ${font}`;
        while (context.measureText(text).width > maxWidth && size > 10) {
            size -= 1;
            context.font = `${size}px ${font}`;
        }
        return size;
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


            {(() => {

                const bookWidth = 50;
                const bookHeight = 200;
                const spacing = 25;
                const shelfPositions = [100, 400, 700];
                const maxBooks = Math.floor(700 / (bookWidth + spacing));

                return books.map((book, index) => {
                    const shelfIndex = Math.floor(index / maxBooks);


                    const shelfY = shelfPositions[shelfIndex];
                    const columnIndex = index % maxBooks;
                    const bookX = 50 + columnIndex * (bookWidth + spacing);
                    const bookY = shelfY - bookHeight + 200;

                    const centerX = bookX + bookWidth / 2;
                    const centerY = bookY + bookHeight / 2;

                     return (
                        <g key={`${shelfIndex}-${index}`}>
                            <rect x={bookX} y={bookY} width={bookWidth} height={bookHeight} fill={book.bookColor}></rect>
                            <text x={centerX} y={centerY} className='book-label' transform={`rotate(-90, ${centerX}, ${centerY})`} fontFamily={book.font} fontSize={fitFontSize(book.title, book.font, 180, 20)} >{book.title}</text>
                        </g>
                        );
                    });
                })()}

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