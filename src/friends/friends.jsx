import React from 'react';
import './friends.css';

export function Friends() {
  const [friendURL, setFriendURL] = React.useState('');

  function handleURL(event) {
    event.preventDefault();

    if (friendURL) {
      window.open(friendURL.trim(), '_blank');
    }
  }

  return (
    <main className="friends-page">

        <h1>Visit a friend's bookshelf!</h1>

        <p>Enter your friend's url below:</p>
          <form onSubmit={handleURL}>
            <input type="url" name="friends-url" placeholder="https://friend-bookshelf.com" required size="30" value={friendURL} onChange={(e) => setFriendURL(e.target.value)} />
            <button type="submit" className="custom-btn">Visit!</button>
          </form>
    </main>
  );
}
