import React from 'react';
import './bookshelf.css';
import { NavButton } from '../app';

export function Bookshelf() {
  return (
        <main className="container-fluid d-flex flex-column align-items-center">
            <div>
                <label for="name">Bookshelf Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your bookshelf title" size="30"/>
                <button id="save-title" className="custom-btn">Save</button>
            </div>

            <br />

            <svg width="700" height="1000" viewBox="0 0 700 1000">
                <rect x ="0" y="300" width="700" height="20" fill="#4a290a"></rect>
                <rect x ="0" y="600" width="700" height="20" fill="#4a290a"></rect>
                <rect x ="0" y="900" width="700" height="20" fill="#4a290a"></rect>


                <a href="customize.html">
                    <rect x ="50" y="100" width="50" height="200" fill="#2791c2"></rect>
                    <rect x = "100" y="100" width="50" height="200" fill="#f2a900"></rect>
                    <rect x = "325" y="100" width="50" height="200" fill="#e03c31"></rect>
                    <rect x = "375" y="100" width="50" height="200" fill="#34a853"></rect>
                    <rect x = "425" y="100" width="50" height="200" fill="#bb2bcc"></rect>

                    <rect x="150" y="400" width="50" height="200" fill="#5ba80d"></rect>
                    <rect x="200" y="400" width="50" height="200" fill="#0d60a8"></rect>
                    <rect x="400" y="400" width="50" height="200" fill="#e0a614"></rect>

                    <rect x="50" y="700" width="50" height="200" fill="#a80d60"></rect>
                    <rect x="100" y="700" width="50" height="200" fill="#ff7de7"></rect>
                    <rect x="500" y="700" width="50" height="200" fill="#d93025"></rect>
                </a>

                <text x="50" y="230" className="book-label" transform="rotate(-90, 50, 200)">Book 1</text>
                <text x="100" y="230" className="book-label" transform="rotate(-90, 100, 200)">Book 2</text>
                <text x="325" y="230" className="book-label" transform="rotate(-90, 325, 200)">Book 3</text>
                <text x="375" y="230" className="book-label" transform="rotate(-90, 375, 200)">Book 4</text>
                <text x="425" y="230" className="book-label" transform="rotate(-90, 425, 200)">Book 5</text>


                <text x="240" y="630" className="book-label" transform="rotate(-90, 150, 600)">Book 6</text>
                <text x="290" y="630" className="book-label" transform="rotate(-90, 200, 600)">Book 7</text>
                <text x="490" y="630" className="book-label" transform="rotate(-90, 400, 600)">Book 8</text>

                <text x="140" y="930" className="book-label" transform="rotate(-90, 50, 900)">Book 9</text>
                <text x="190" y="930" className="book-label" transform="rotate(-90, 100, 900)">Book 10</text>
                <text x="590" y="930" className="book-label" transform="rotate(-90, 500, 900)">Book 11</text>


            </svg>

            <div>
                <label for="new_book">Add a new book:</label>
                <NavButton text="+" url="/customize" className="custom-btn"/>
            </div>

            <br />

            <div>
                <button id="share-bookshelf" className="custom-btn">Share your bookshelf!</button>
            </div>
        </main>
  );
}