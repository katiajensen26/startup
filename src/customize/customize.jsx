import React from 'react';
import './customize.css';
import { NavButton } from '../app';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function Customize({ books, addBook }) {
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [bookColor, setBookColor] = React.useState('#2791c2');
    const [bandColor, setBandColor] = React.useState('#fcdc42');
    const [shelf, setShelf] = React.useState(0);
    const [font, setFont] = React.useState('Merriweather');

    const [searchParams] = useSearchParams();
    const editBook = searchParams.get('edit');
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];




    const navigate = useNavigate();

    function changeBookColor(direction) {
        const bookColors = ['#2791c2', '#0d60a8', '#bb2bcc', '#a80d60', '#ff7de7', '#d93025', '#e07431ff', '#e0a614', '#34a853', '#2f4f0fff', '#b0a8a8ff', '#000000'];
        const currentIndex = bookColors.indexOf(bookColor);
        let newIndex;
        if (direction === 'left') {
            newIndex = (currentIndex - 1 + bookColors.length) % bookColors.length;
        } else {
            newIndex = (currentIndex + 1) % bookColors.length;
        }
        setBookColor(bookColors[newIndex]);
    }

    function changeBandColor(direction) {
        const bandColors = ['#fcdc42', '#fdebd0', '#f4f1de', '#fef6c9', '#a7c957', '#d8f3dc', '#ffcad4', '#cb997e', '#f1faee', '#ef476f', '#ffd670', '#118ab2', '#14213d', '#6d597a', '#457b9d', '#bc6c25', '#000000'];
        const currentIndex = bandColors.indexOf(bandColor);
        let newIndex;
        if (direction === 'left') {
            newIndex = (currentIndex - 1 + bandColors.length) % bandColors.length;
        } else {
            newIndex = (currentIndex + 1) % bandColors.length;
        }
        setBandColor(bandColors[newIndex]);
    }

    function changeFont(direction) {
        const fonts = ['Merriweather', 'Playfair Display', 'Lobster', 'Roboto Slab', 'Shadows Into Light Two', 'Fredoka'];
        const currentIndex = fonts.indexOf(font);
        let newIndex;
        if (direction === 'left') {
            newIndex = (currentIndex - 1 + fonts.length) % fonts.length;
        } else {
            newIndex = (currentIndex + 1) % fonts.length;
        }
        setFont(fonts[newIndex]);
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

    function handleSaveBook() {
        const newBook = {
            title,
            author,
            bookColor,
            bandColor,
            font,
            shelf
        };

        if (editBook !== null) {
            savedBooks[parseInt(editBook)] = newBook;
        } else {
            savedBooks.push(newBook);
        }

        localStorage.setItem('books', JSON.stringify(savedBooks));
        //addBook(newBook);
        navigate('/bookshelf');
    }

    React.useEffect(() => {
        if (editBook !== null) {
            const booktoEdit = savedBooks[parseInt(editBook)];
            if (booktoEdit) {
                setTitle(booktoEdit.title);
                setAuthor(booktoEdit.author);
                setBookColor(booktoEdit.bookColor);
                setBandColor(booktoEdit.bandColor);
                setFont(booktoEdit.font);
            }
        }
    }, [editBook]);

    function handleDeleteBook() {
        if (editBook !== null) return; 

        savedBooks.splice(parseInt(editBook), 1);
        localStorage.setItem('books', JSON.stringify(savedBooks));
        navigate('/bookshelf');

    }

    return (
        <main className="customize-page">
            <form>
                <div>
                    <label htmlFor="title" style={{"margin-top": "1em"}}>Book Title:</label>
                    <input type="text" id="title" value={title} onChange={(e => setTitle(e.target.value))} placeholder="Enter the book title" size="25" required/>
                </div>

                <br />
                <div>
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" value={author} onChange={(e => setAuthor(e.target.value))} placeholder="Enter the author's name" size="25" required/>
                </div>
            </form>

            <br />
            
            <svg width="800" height="800" viewBox="0 0 800 900">

                <polygon id= "gold-style-left" points="100,145 150,80 150,210" fill="#e3b900" className="book-style-btn" onClick={() => changeBandColor('left')}></polygon>
                <polygon id ="main-color-left" points="100,445 150,380 150,510" fill="#e3b900" className="book-style-btn" onClick={() => changeBookColor('left')}></polygon>
                <polygon id="extra-style-left" points="100,745 150,680 150,810" fill="#e3b900" className="book-style-btn" onClick={() => changeFont('left')}></polygon>

                <rect x="300" y="50" width="200" height="800" fill={bookColor}></rect>
                <text x="350" y="400" className="book-title" transform="rotate(-90, 400, 400)" fontFamily={font} fontSize={fitFontSize(title, font, 475)}>{title || 'Book Title'}</text>
                <text x="450" y="550" className="book-author" transform="rotate(-90, 400, 500)" fontFamily={font}>{author || 'Author Name'}</text>

                <rect x="300" y="100" width="200" height="100" fill={bandColor}></rect>
                <rect x="300" y="700" width="200" height="100" fill={bandColor}></rect>

                <polygon id="gold-style-right" points="700,145 650,80 650,210" fill="#e3b900" className="book-style-btn" onClick={() => changeBandColor('right')}></polygon>
                <polygon id="main-color-right" points="700,445 650,380 650,510" fill="#e3b900" className="book-style-btn" onClick={() => changeBookColor('right')}></polygon>
                <polygon id="extra-style-right" points="700,745 650,680 650,810" fill="#e3b900" className="book-style-btn" onClick={() => changeFont('right')}></polygon>

            </svg>

            <NavButton text="Add to bookshelf!" onClick={handleSaveBook} className="custom-btn"/>
            <NavButton text="Delete Book" onClick={handleDeleteBook} className="delete-btn"/>
            

        </main>
  );
}