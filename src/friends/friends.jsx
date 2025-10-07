import React from 'react';
import './friends.css';

export function Friends() {
  return (
    <main className="friends-page">

        <h1>Visit a friend's bookshelf!</h1>

        <p>Enter your friend's url below:</p>
        <form method="get" action="" target="_blank">
            <input type="url" name="friends-url" placeholder="https://friend-bookshelf.com" required size="30" />
            <button type="submit" class="custom-btn">Visit!</button>
        </form>
    </main>
  );
}
