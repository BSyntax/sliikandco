# Sliik & Co. — Fashion E-Commerce Website

Sliik & Co. is a modern, fully responsive e-commerce platform built with React, Express, Node.js, and MongoDB. It delivers a sleek and seamless online shopping experience for fashion enthusiasts who value both style and usability.

## Overview

This project is designed as a full-featured fashion retail website. It focuses on clean design, smooth interaction, and efficient state management using React Context API. The application allows users to explore curated collections, manage shopping carts, create wishlists, and check out securely.

## Features

* **Modern UI/UX** — A visually appealing and responsive design focused on simplicity and elegance.
* **Product Management** — Displays products dynamically from the backend with filtering and searching functionality.
* **Wishlist** — Users can save favorite items for later.
* **Cart System** — Add, remove, and update products in the shopping cart.
* **User-Friendly Navigation** — Clear and consistent layout with header, footer, and announcement bar.
* **Newsletter Subscription** - Stay connected through email updates.
* **Lookbook and About Sections** — Showcase brand identity and featured collections.
* **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile screens.

## Tech Stack

**Frontend:**

* React (with JSX)
* React Router
* Context API for global state management
* CSS Modules / Custom styling
* React Icons

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose for data modeling)
* RESTful API structure

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/BSyntax/sliikandco.git
   ```

2. Navigate into the project directory:

   ```bash
   cd sliikandco
   ```

3. Install dependencies for both client and server:

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. Start the development servers:

   ```bash
   # In one terminal
   cd server && npm run dev

   # In another terminal
   cd client && npm start
   ```

5. Open your browser and go to:

   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env` file in the `/server` directory and include:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

## Future Enhancements

* Implement authentication and user profiles
* Add payment integration (Stripe)

## Author

**Sliik & Co.** — Developed and designed by Muzuvukile Nqwiliso.
A vision-driven e-commerce experience built to blend technology and style.
