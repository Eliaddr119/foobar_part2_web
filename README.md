# Welcome to foobar! The most new and advanced social network !
In this part we created the layout of the sign-up page, the sign-in page and the post feed.
we used JS to create the logic of the user input validation and determine whether they can proceed or not.
In the feed page we show a list of 10 posts with images that are being loaded from a JSON file, The user has the option the upload a post or a comment and delete or edit a post or comment he previously uploaded.
We used useState and useRef to keep track of the states of the components and to re-render them when changes were made.
We used router to navigate between the different app screens so the app only loads up once.
We used components and tried to keep the as minimal has possible as we learned in class.

One of the things we prevented from the user is to directly access the feed page without signing in or signing up to Foobar which we obviously can't allow the user to do.

## How to run the app

In the project directory run:

### `npm install`
To install all the app dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm test`
To run the app tests

We will introduce some of the files in the src directory.
### sign up folder
Has js file that holds the logic and appearance of the sign up page and css that holds the design for the page.

### sign in folder
Has js file that holds the logic and appearance of the sign in page and css that holds the design for the page

### Feed folder
Consists serval folders for each component of the feed page such as comment and post, each component has it's own css file that holds the design elements of the components.
All the components are put together in the feed page component, but every component has a single unique responsibility.


