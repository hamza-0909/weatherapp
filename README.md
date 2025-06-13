# React Native Weather App

This is a simple React Native mobile application built with Expo, featuring user authentication (Login/Signup) and a home screen that displays weather information based on the user's location and a list of users fetched from a dummy API.

## Features

-   **User Authentication**: Login and Signup screens with integration to DummyJSON API.
    -   Login: Uses `https://dummyjson.com/auth/login`
    -   Signup: Uses `https://dummyjson.com/users/add` (requires username, email, password, firstName, lastName, age).
        *Note: DummyJSON requires `firstName`, `lastName`, and `age` for user creation.*
-   **Home Screen**: Displays current weather conditions based on the user's geographical location using the OpenWeatherMap API.
    -   Fetches users data from `https://dummyjson.com/users` and displays it in a simple list.
-   **Responsive UI**: Basic and attractive styling for all screens.
-   **Navigation**: Uses React Navigation for smooth screen transitions.





