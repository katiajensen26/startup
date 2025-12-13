# CS 260 Notes

## First Notes - 09/04/2025

I learned a lot about how git works and how to work with it in the terminal. I am definitely going to need to practice but I know I will understand it better as I go along.

[My startup - Simon](https://simon.cs260.click)

Example - banana.fruit.bozo.click
Top level domain: .click
root domain: bozo.click
subdomain: fruit.bozo.click
Nested subdomain: banana.fruit.bozo.click

A DNS A record points to an IP address; it should not point to another A record.

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.87.252.47
My elastic IP address is: 34.194.183.253
I launched my AMI and learned about how to ssh into it. The command to do it is 
```
ssh -i [key pair file] ubuntu@[ip address]
```

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

How to initialize an HTML file: <!DOCTYPE html>
Then wrap the code in <html> tags.
Then set the characters: <meta charset = "UTF-8">
Setting the viewport: <meta name="viewport" content="width=device-width, initial-scale=1.0">
Linking a css file: <link rel="stylesheet" href="style.css">
Linking a javascript file: <script src="test.js"></script>
I learned a lot about HTML. I just need to work on getting better at remembering all of the different tags and what they do.

A <div> tag is a container element used to group HTML elements together. It has no visual effect by itself. Helps structure the page for styling using CSS.
Padding increases internal spacing while margins affect the space outside an element.
Arrow syntax allows for concise one-line functions like: const greet= (name) => {return 'Hello, ' + name;}
#title selects an element by ID (unique) .grid selects elements by class (can apply to multiple elements)

HTML Tags:
Paragraph: <p>
Ordered list: <ol>
Unordered list: <ul>
h2: <h2>
h1: <h1>
h3: <h3>

This is how you deploy files so your website actually shows up like you want it to. You HAVE to make sure you are in the right folder for it to work.

```
./deployFiles.sh -k C:/Users/katia/cs260/MyPair.pem -h mybookshelf260.click -s startup
```

## CSS

This took a lot longer than I expected and I learned a lot about how styling works and how you get everything to stick where you want it to. I had a hard time centering the svg elements on my webpages but I figured it out and now everything scales nicely to all screen sizes.

I tried using bootstrap at first but I ended up replacing most of the elements anyways since I found I prefer more control over the elements on the page.
I had a lot of fun finding different fonts and trying out different colors for what I wanted the webpage to look like but I am very happy with it so far and can't wait to add more interactive elements to it with React.

I did use the simon navigation bar as a template but I altered it slightly so that my navigation bar would be more centered with the rest of my things as it felt like that fit better for my style of website.

```html
        <header class="container-fluid text-center">

            <nav class="navbar">
                <ul class="justify-content-center">
                    <a class="navbar-brand" href="#">My Bookshelf</a>
                    <menu class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active"href="index.html">Home</a></li>
                        <li class="nav-item">
                            <a class="nav-link" href="bookshelf.html">Your Bookshelf</a></li>
                        <li class="nav-item">
                            <a class="nav-link" href="friends.html">Friends</a></li>
                    </menu>
                </ul>
            </nav>

            <hr />
        </header>
```

If a container uses display: flex, the images will be displayed in a row by default, unless flex-direction: column is specified.

By deafult, the HTML span element has a CSS display property of inline.
To change all div elements to have a background color of red: div { background-color: red; }


## Javascript

how to get a form from an html file: const form = document.getElementbyID("emailform")
how to get a form from an html file: const message = document.getElementbyID("email")
how to make a counter onclick: 
```jsx
document.getElementbyID("plus").addEventListener("click" => () {
  count = count + 1;
  number.textContent = count;
})
```
The DOM represents the HTML document as a tree of objects.
You can use JavaScript to access and modify DOM elements.
Each HTML element is a node in the DOM.

Valid javscript syntax for different statements:
if (x > 5) {...} else {...} for {...}{...} while {...}{...} switch(x) {case 1: ...; break; default: ...}

Correct syntax for creating a javascript object:
const person = {name: "John", age:30 }

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

What is JSON?
JSON (JavaScript Object Notation) is a text-based format for structured data using key-value pairs.

Here is the original shelf placeholder code in case you ever need to come back to it.

```jsx
                {/* <Link to="/customize">
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
                </Link>

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
                <text x="590" y="930" className="book-label" transform="rotate(-90, 500, 900)">Book 11</text> */}


```

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

## Other Important Information

Console commands:
chmod - change permissions
pwd - print working directory
cd - change directory
ls - list files --> ls -la lists all files (including hidden ones) in long format
vim/nano - text editors
mkdir - make directory
mv - move/rename
rm - remove
man - manual
ssh - remote shell
ps - processes
wget - download files
sudo - run as admin


Different Ports:
20 - File Transfer Protocol (FTP) for data transfer
22 - Secure Shell (SSH) for connecting to remote devices
25 - Simple Mail Transfer Protocol (SMTP) for sending email
53 - Domain Name System (DNS) for looking up IP addresses
80 - Hypertext Transfer Protocol (HTTP) for web requests.
110 - Post Office Protocol (POP3) for retrieving email
123 - Network Time Protocol (NTP) for managing time.
161 - Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers
194 - Internet Relay Chat (IRC) for chatting
443 - HTTP secure (HTTPS) for secure web requests


## Final Notes

vite.config.js - lists configurations for debugging and building with vite

200-299 - Success message
300-399 - redirections messages
400-499 - Client error
500-599 - Server error


Http header content-type allows you to specify the type of the request body
"Secure cookie"/"Http-only cookie"/"Same-site cookie" keeps the client from being able to alter the cookie and cookie theft

User passwords should be stored hashed or encrypted. They should not be stored as plain text.

Websocket protocol is intended to provide two-way communication between users in real-time.

JSX - JavaScript XML
JS - JavaScript
AWS - Amazon Web Services
NPM - Node Package Manager
NVM - Node Version Manager

React.useState allows you to declare, update and manage the state of a variable and when it's updated, it re-renders and displays the new component

React Hooks are functions that allow developers to use state, lifecycle features and other powerful React capabilities within functional components (useState, useEffect, useContext, etc.)

State Hooks - Lets a component "remember" information like user input. Uses state to store an input value.
Context Hooks - lets a component receive information from distant parents without passing it as props.
Ref Hooks - lets a component hold some information that isn't used for rendering. Updating a ref doesn't re-render your component. Useful for when you need to work with non-React systems
Effect Hooks - lets a component connect to and synchronize with external systems. This includes  dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.
Performance Hooks - A common way to optimize re-rendering performance is to skip uneccessary work. - useMemo lets you cache the result of an expensive calculation. useCallback lets you cache a function definition before passing it down to an optimized component.

package.json outlines essential metadata, manages dependences, and defines scripts. Generally used for Node.js.
fetch() makes asynchronous network request to retrieve resources from a server.
Node.js allows developers to execute JavaScript code outside of a web browser for more server-side development.
pm2 is what helps manage your website servers and allows you to deploy your website
Vite allows you to debug and see your website and server before deploying it to your environment.