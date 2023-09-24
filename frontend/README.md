# Welcome to my Dev Squared's Readme!
**Here, we'll discuss issues that I couldn't (yet) overcome, technologies used, a "User Story" (provided on Trello) and cap it all off with my stretch goals ("Future Enhancements") for this app. I'll also provide the link to my site, within.**

[Home page](./src/assets/images/dev_squared.png)
---

## App Description
**Dev Squared is the latest and greatest blog-spot app for aspiring as well as seasoned Software Developers! This is your new favorite go-to for the latest tips and tricks of the trade regarding programming. Here, you'll be able to get a quick view of your fellow colleagues' struggles and how they got over them, the latest tech that you may be interested in, and general knowledge that you didn't know that you didn't know! So join us and leave a few nuggets of wisdom for the progeny.**

---

## Issues I couldn't (yet) resolve:

- Staying on the Current Blog page after creating a comment.

- Staying on the Current Blog page after updating a blog or comment.

---

## Future Enhancements
- I have Big Dreams for this app but knew that there was no way to complete it all in a week. Here are a few of them...

1. **Make app responsive for mobile.**

2. **Adding a "Groups" feature to make finding friends and colaborators easy.**

3. **Adding a "Colaboration Requests" section to make finding colaborators easier.**

4. **Adding an "Events" section to announce things like community or online hack-athons.**

---

## **Technologies Used**
### Front-End:
- Node: Allows us to utilize Javascript, away from the browser window.

- React/JSX: A library that combines JavaScript and HTML functionality.

- React Router: Used to set up a multi-page-like app.

- JavaScript: Used to adapt interactivity to a web page, making it a "web application".

- HTML: The "document" section of a web page. Holds all the document's text.

- CSS: Used to apply styling to the web page document.

- Babel Plug-in: Comes with create-react-app (in the node modules, I believe) but since they are no longer keeping up with c-r-a's maintenance, it's  not automatically installed in your dependencies. Without it, you'll face more issues uploading it to hosting sites, like Netlify.

- axios: Used to make fetch requests a little simpler.

### Back-End:
- Node: Allows us to utilize Javascript, away from the browser window.

- bcrypt: Encryption to avoid sending secret info to the database.

- cors: Helps avoid Access-Control-Allow-Origin errors (still doesn't work for me although I have seen it help others. I had to disable those restrictions on my Mac).

- dotenv: Allows the recognition and usage of the ".env" file.

- express: Aids back-end routing.

- express-async-handler: Helps keep boilerplate code to a minimum by replacing "try/catch" statements.

- gitignore: Stops the uploading of specified (secret) files from your computer.

- jsonwebtoken: Encryption to aid in authentication over the web.

- MongoDB: A NoSQL database.

- mongoose: Ties our back-end to our MongoDB.

- **HONORABLE MENTIONS**
- JavaScript's "window" reference: Used to get info about what's happening in the browser's current window (like client mouse location).

---

## WireFrames, ERD, Stretch Goals and User Stories:
- [Trello.com](https://trello.com/b/HxWEnQnm/blogging-app-project-board)


---

## Live Site Link:

- [Dev Squared](https://devsquared.onrender.com)

---
