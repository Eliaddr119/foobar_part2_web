// src/userService.js

// Function to get all registered users from localStorage
export const getAllUsers = () => {
    const usersJSON = sessionStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
};

// Function to check if a user with a given user name already exists
export const isUserRegistered = (userName, password) => {
    const users = getAllUsers();
    return users.some((user) => user.userName === userName && user.password === password);
};

// Function to register a new user
export const registerUser = (user) => {
    const users = getAllUsers();
    users.push(user);
    sessionStorage.setItem('users', JSON.stringify(users));
};
