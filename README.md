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

### FeedPage 📰
- The FeedPage component serves as the main feed where users can view posts uploaded by themselves and others.

  #### Components Inside PostFeed:

  - **Comment 💬**: The Comment component allows users to view and interact with comments on posts.
  
  - **FeedPage 📄**: The FeedPage component displays the main feed content, including posts and interactions.
  
  - **Navbar 🚀**: The Navbar component provides navigation links for easy access to different sections of the app.
  
  - **Post 📌**: The Post component renders individual posts with content uploaded by users.
  
  - **SideMenu 📚**: The SideMenu component offers additional navigation options and features accessible from the side of the feed.

---

## Full Application Pictures

### SignUp 📝

*here we can see the "cilck here" can move us to the sign In page*

![Screenshot 2024-03-06 224822](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/6873fee3-2623-4882-b06b-72ba31de9042)

*here we can see the we must fill all the filed on the SignUp page*

![Screenshot 2024-03-06 230217](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/5bbe7666-9020-45a4-b14a-be485767826d)

*here we can see that the password must match*

![Screenshot 2024-03-06 224953](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/ab6ebd4f-6220-4aef-bdf1-17284e345abb)

*here we can see that the password must contain at least one upercase lowercase letter, one number, and characters*

![Screenshot 2024-03-06 2249asda23](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/65078c84-03c4-4d59-b2e2-d912056f371b)

### SignIn 🔐

*here we can see the "cilck here" can move us to the sign Up page to make a new account*

![Screenshot 2024-03-06 224813](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/dac339df-73f0-4b80-b9d8-a88425640688)

*here we can see that we must have an account, and that the password must match the password you entered when you created the account*

![Screenshot 2024-03-06 225020](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/0ef6562f-1648-4346-85d8-243ac5d9a44b)

### FeedPage 📰

*here we can see all the FeedPage*

![Screenshot 2024-03-06 225033](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/47d867e2-ae5b-4856-bdd2-165c2324384a)

*here we can see the Log Out button*

![Screenshot 2024-03-06 225033124](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/daa9d441-e8fa-4463-b34d-292bb029b0de)

*here we can se three options "add a like button" that increase the number in the left by 1*
*"comments button" that by clicking on it will open a box to add a comment to the post*
*and a "share button" that open a menu* 

![Screenshot 2024-03-06 225118](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/e4bf8d94-b51e-4103-9fee-5edd5b8020be)

*add a like button*

![Screenshot 2024-03-06 225129](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/7b94d872-3221-4d29-bf9f-bbc45956c7a9)

*clicking on the number of comments on the right will open the comment list*

![Screenshot 2024-03-06 234214](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/56a543ff-1713-443d-a595-d78fa9b92824)


*comments button*

![Screenshot 2024-03-06 225137](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/b5897df0-b218-4f84-b1e3-3c6f0367dbfb)

*comments option-> you can edit or delete the comment* 
*take notice that you can only edit or delete a comment that your account make*

![Screenshot 2024-03-06 230834](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/6c329f03-b875-4c0c-870a-28d89f9c72af)

*here we can see how to upload a new post*
*clicking on the "write about something !" will open a box with the option to upload a post*

![Screenshot 2024-03-06 22503qe3](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/4d801f42-83fe-4f5c-81b2-718e321d7f35)

*here we can see the post upload box*

![Screenshot 2024-03-06 225224](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/593028bc-baab-42e2-bfdb-fe27e320932a)

*here we can see that the psot we upload have the option to edit the post or delete it*

![Screenshot 2024-03-06 225238](https://github.com/Eliaddr119/foobar_part2_web/assets/113431442/e232d4be-35a2-45f2-a239-f99aea3f7362)

---

## How to Run the App

To run the app locally, follow these steps:

1. Clone the repository:

`git clone https://github.com/Eliaddr119/foobar_part2_web.git`

2. Navigate to the project directory:

`cd foobar`

3. Install dependencies:

`npm install`

4. Start the development server:

`npm start`

This command will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 
The page will reload automatically when you make changes.

---

## Running Tests

To run tests for the app, execute:

`npm test`

This command will run all tests associated with the application.

