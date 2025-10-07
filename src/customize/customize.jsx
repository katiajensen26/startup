import React from 'react';
import './customize.css';

export function Customize() {
  return (
        <main className="customize-page">
            <form>
                <div>
                    <label for="title" style="margin-top: 1em;">Book Title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter the book title" size="25" required/>
                </div>

                <br />
                <div>
                    <label for="author">Author:</label>
                    <input type="text" id="author" name="author" placeholder="Enter the author's name" size="25" required/>
                </div>
            </form>

            <br />
            
            <svg width="800" height="800" viewBox="0 0 800 900">

                <polygon id= "gold-style-left" points="100,145 150,80 150,210" fill="#e3b900" className="book-style-btn"></polygon>
                <polygon id ="main-color-left" points="100,445 150,380 150,510" fill="#e3b900" className="book-style-btn"></polygon>
                <polygon id="extra-style-left" points="100,745 150,680 150,810" fill="#e3b900" className="book-style-btn"></polygon>

                <rect x="300" y="50" width="200" height="800" fill="#2791c2"></rect>
                <text x="350" y="400" className="book-title" transform="rotate(-90, 400, 400)">Book Title</text>
                <text x="450" y="550" className="book-author" transform="rotate(-90, 400, 500)">Author Name</text>

                <rect x="300" y="100" width="200" height="100" fill="#fcdc42"></rect>
                <rect x="300" y="700" width="200" height="100" fill="#fcdc42"></rect>

                <polygon id="gold-style-right" points="700,145 650,80 650,210" fill="#e3b900" className="book-style-btn"></polygon>
                <polygon id="main-color-right" points="700,445 650,380 650,510" fill="#e3b900" className="book-style-btn"></polygon>
                <polygon id="extra-style-right" points="700,745 650,680 650,810" fill="#e3b900" className="book-style-btn"></polygon>

            </svg>

            <form method="get" action="bookshelf.html">
                <button type="submit" className="custom-btn">Save your book!</button>
            </form>

        </main>
  );
}