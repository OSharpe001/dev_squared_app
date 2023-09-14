# Welcome to my Dev Squared's Readme!
**Here, we'll discuss issues that I couldn't (yet) overcome, technologies used, a "User Story" (provided on Trello) and cap it all off with my stretch goals for this app (also provided on Trello). I'll also provide the link to my site, within.**

---

## App Description
**Dev Squared is the latest and greatest blog-spot app for aspiring as well as seasoned Software Developers! This is your new favorite go-to for the latest tips and tricks of the trade regarding programming. Here, you'll be able to get a quick view of your fellow colleagues' struggles and how they got over them, the latest tech that you may be interested in, and general knowledge that you didn't know that you didn't know! So join us and leave a few nuggets of wisdom for the progeny.**

---

## Issues I couldn't (yet) resolve:

- Staying on the Current Blog page after updating a blog with no rerender.

- Making the screen re-render to show the updated list of comments after adding, editing or deleting one.

- There is a large amount of rapid re-renders when logging-out.

- After editing/deleting a comment/blog, the screen does not refresh. Making it look like the comment/blog wasn't edited/deleted (but it was).

-The "Back to Blogs" button doesn't work. There are a lot of re-renders and client ends up back on the "Current Blog" page they were trying to leave.

- After pressing the like button, the screen doesn't rerender to reflect the change. This allows a user to add multiple likes on the same blog or comment.

---

## **Technologies Used**
### Front-End:
- React Router: Used to set up a multi-page-like app.
- React/JSX: A library that combines JavaScript and HTML functionality.
- JavaScript: Used to adapt interactivity to a web page, making it a "web application".
- HTML: The "document" section of a web page. Holds all the document's text.
- CSS: Used to apply styling to the web page document.
- Babel Plug-in: Comes with create-react-app (in the node modules, I believe) but since they are no longer keeping up with c-r-a's maintenance, it's  not automatically installed in your dependencies. Without it, you'll face more issues uploading it to hosting sites, like Netlify.
- axios: Used to make fetch requests a little simpler.

### Back-End:
- bcrypt: Encryption to avoid sending secret info to the database.
- cors: Helps avoid Access-Control-Allow-Origin errors (still doesn't work for me although I have seen it help others. I had to disable those restrictions on my Mac).
- dotenv: Allows the recognition and usage of the ".env" file.
- express: Aids back-end routing.
- express-async-handler: Helps keep boilerplate code to a minimum by replacing "try/catch" statements.
- gitignore: Stops the uploading of specified (secret) files from your computer.
- jsonwebtoken: Encryption to aid in authentication over the web.
- mongoose: Ties our back-end to our database.

- **HONORABLE MENTIONS**
- JavaScript's "window" reference: Used to get info about what's happening in the browser's current window (like client mouse location).

---

## WireFrames, ERD, Stretch Goals and User Stories:
- [Trello.com](https://trello.com/b/HxWEnQnm/blogging-app-project-board)


---

## Live Site Link:
### **COMING SOON!**
- []()

---
