import React from 'react';
import '../bookshelf/bookshelf.css';
import { useParams } from 'react-router-dom';

export function SharedShelf() {
    const { shareID } = useParams();
    const [bookshelf, setBookshelf] = React.useState({ shelfName: '', books: [] });
    const [backgroundImage, setBackgroundImage] = React.useState('');

    React.useEffect(() => {
        async function getSharedBookshelf() {
            const res = await fetch(`/api/bookshelf/share/${shareID}`);
            if (res.ok) {
                const data = await res.json();
                setBookshelf(data || { shelfName: '', books: [] });
            } else {
                console.error('Failed to fetch shared bookshelf');
            }
        }
        getSharedBookshelf();
    }, [shareID]);

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

    React.useEffect(() => {
        const random = Math.floor(Math.random() * 1000);
            fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
        .then((response) => response.json())
        .then((data) => {

        const width = 700;
        const height = 100;
        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setBackgroundImage(apiUrl);
        })
        .catch();
    }, []);

    return (
        <main className="container-fluid d-flex flex-column align-items-center">
            {backgroundImage && (
                <img src={backgroundImage} alt="Background Image" className="banner"/>
            )}

            <div className="text-center">
                <h2>{bookshelf.shelfName || "My Bookshelf"}</h2>
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

                return bookshelf.books.map((book, index) => {
                    const shelfIndex = Math.floor(index / maxBooks);


                    const shelfY = shelfPositions[shelfIndex];
                    const columnIndex = index % maxBooks;
                    const bookX = 50 + columnIndex * (bookWidth + spacing);
                    const bookY = shelfY - bookHeight + 200;

                    const centerX = bookX + bookWidth / 2;
                    const centerY = bookY + bookHeight / 2;

                     return (
                    
                        <g key={`${shelfIndex}-${index}`} className="book-group">

                            <rect x={bookX} y={bookY} width={bookWidth} height={bookHeight} fill={book.bookColor}></rect>
                            <rect x={bookX} y={bookY+20} width={bookWidth} height='20' fill={book.bandColor}></rect>
                            <rect x={bookX} y={bookY+160} width={bookWidth} height='20' fill={book.bandColor}></rect>

                            <text x={centerX} y={centerY} className='book-label' transform={`rotate(-90, ${centerX}, ${centerY})`} fontFamily={book.font} fontSize={fitFontSize(book.title, book.font, 100, 20)} >{book.title}</text>
                            <text x={centerX} y={centerY - 140} className="hover-text" fontFamily={book.font} fontSize="12" fill="black" textAnchor="middle">
                                <tspan x={centerX} dy="1.2em">{book.title}</tspan>
                                <tspan x={centerX} dy="1.2em">by {book.author}</tspan>
                            </text>
                        </g>
                        );
                    });
                })()}

                </svg>
        </main>
    );
}