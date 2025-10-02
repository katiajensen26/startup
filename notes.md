# CS 260 Notes

## First Notes - 09/04/2025

I learned a lot about how git works and how to work with it in the terminal. I am definitely going to need to practice but I know I will understand it better as I go along.

[My startup - Simon](https://simon.cs260.click)

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

I learned a lot about HTML. I just need to work on getting better at remembering all of the different tags and what they do.

This is how you deploy files so your website actually shows up like you want it to:

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

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

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
