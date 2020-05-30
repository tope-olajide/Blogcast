# Blogcast Backend
Blogcast provides a platform that allows a user to write a standard blog post or record an audio post. The audio post recording/uploading will be handled on the frontend with react and cloudnary. The generated url of the audio post will be saved at the backend using Node.js and MongoDB.

1. Install [`node`](https://nodejs.org/en/download/), version 12 or greater

3) Clone this repo and cd into it

   ```
   git clone https://github.com/tope-olajide/Blogcast.git
   cd journary-frontend
   ```

4) Install all dependencies

   ```
   npm install
   ```

6) Start the app by running:

   ```
   npm start
   ```

## API Routes

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>
<tr><td>POST</td> <td>api/user/signup</td> <td>Create a new user</td></tr>
<tr><td>POST</td> <td>api/user/signin</td> <td>Sign in a user</td></tr>
<tr><td>GET</td> <td>api/post/audio-post</td> <td>Fetch all audio post</td></tr>
<tr><td>POST</td> <td>api/post/audio-post</td> <td>Save audio post</td></tr>
<tr><td>PUT</td> <td>api/post/audio-post/:postId</td> <td>Modify audio post</td></tr>
<tr><td>GET</td> <td>api/post/audio-post/:postId</td> <td>Fetch audio post details</td></tr>
<tr><td>DELETE</td> <td>api/post/audio-post/:postId</td> <td>Delete audio post</td></tr>
<tr><td>GET</td> <td>api/post/standard-post</td> <td>Fetch all standard post</td></tr>
<tr><td>POST</td> <td>api/post/standard-post</td> <td>Save standard post</td></tr>
<tr><td>PUT</td> <td>api/post/standard-post/:postId</td> <td>Modify standard post</td></tr>
<tr><td>GET</td> <td>api/post/standard-post/:postId</td> <td>Fetch standard post details</td></tr>
<tr><td>DELETE</td> <td>api/post/standard-post/:postId</td> <td>Delete standard post</td></tr>
</table>


## Built With

* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [TypeScript]() -
* [MongoDB]() -


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributing

If you are interested in contributing to development of this project, follow the instructions below to contribute.

- Fork the repository

- Make your change

- Commit your change to your forked repository

- Provide a detailed commit description

- Raise a pull request against the master branch

#### Can I clone this application for personal use?

Yes!. This application is licensed under MIT, and it's open for everybody

## Author

- **Temitope David Olajide** - Fullstack Developer.
