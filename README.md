# Welcome to foobar! 🚀

Foobar is a cutting-edge social network designed to provide users with a seamless experience for connecting, sharing, and interacting online. This React project encompasses various components, each serving a specific purpose to deliver an engaging user experience.

---

## Features

- Implemented the layout and functionality of the sign-up and sign-in pages.
- Developed JavaScript logic for user input validation to ensure data integrity.
- Created a dynamic post feed displaying a list of 10 posts with images loaded from a JSON file.
- Enabled users to upload posts, comment on posts, and manage their own content by allowing deletion and editing of posts and comments.
- Utilized useState and useRef hooks to manage component states and trigger re-renders upon changes.
- Implemented router for seamless navigation between different app screens, ensuring efficient loading of the application.

---

## Components

### SignIn 🔐
- The SignIn component provides users with a form to sign in to their accounts.

### SignUp 📝
- The SignUp component allows users to register for a new account by filling out a registration form.

### PostFeed 📰
- The PostFeed component serves as the main feed where users can view posts uploaded by themselves and others.

  #### Components Inside PostFeed:

  - **Comment 💬**: The Comment component allows users to view and interact with comments on posts.
  
  - **FeedPage 📄**: The FeedPage component displays the main feed content, including posts and interactions.
  
  - **Navbar 🚀**: The Navbar component provides navigation links for easy access to different sections of the app.
  
  - **Post 📌**: The Post component renders individual posts with content uploaded by users.
  
  - **SideMenu 📚**: The SideMenu component offers additional navigation options and features accessible from the side of the feed.

---

## Full Application Pictures
////
////
////
---

## How to Run the App

To run the app locally, follow these steps:

1. Clone the repository:

git clone https://github.com/Eliaddr119/foobar_part2_web.git

2. Navigate to the project directory:

cd foobar

3. Install dependencies:

npm install

4. Start the development server:

npm start

This command will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 
The page will reload automatically when you make changes.

---

## Running Tests

To run tests for the app, execute:

npm test

This command will run all tests associated with the application.

