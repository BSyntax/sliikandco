# Sliik & Co. Fashion E-Commerce

![Sliik & Co. Hero](/public/readme-assets/hero.png)

Sliik & Co. is a modern, full-stack fashion e-commerce platform built with React, Node.js, Express, and MongoDB. It delivers a premium shopping experience with seamless browsing, secure payments, and intuitive user interactions designed for fashion-focused customers.

**Note:**  
This is a demo project created for learning, portfolio presentation, and job applications.  
All product images are used strictly for educational purposes and remain the property of their respective owners.

---

## Overview

Sliik & Co. showcases a complete retail experience with emphasis on design, functionality, and user experience. The platform features dynamic product management, secure payment processing with Stripe, user authentication, order tracking, and a responsive design that works beautifully across all devices.

---

## Features

### Shopping Experience

- **Product Catalog** — Browse products with advanced filtering by category, price, color, and size
- **Search Functionality** — Quick product search with real-time results
- **Product Details** — Detailed product pages with image galleries, descriptions, and reviews
- **Shopping Cart** — Add, remove, and update quantities with persistent cart state
- **Wishlist** — Save favorite items for later
- **Collections** — Curated product collections and lookbooks

### User Authentication & Profiles

- **User Registration & Login** — Secure authentication with JWT tokens
- **Profile Management** — Update personal information, phone number, and password
- **Address Book** — Save multiple shipping addresses with default address selection
- **Order History** — View past orders with detailed order information

### Checkout & Payments

- **Secure Checkout** — Multi-step checkout process with address selection
- **Stripe Integration** — Secure payment processing with credit/debit cards
- **Address Management** — Choose from saved addresses or add new ones during checkout
- **Order Confirmation** — Email confirmations and order tracking

### Reviews & Ratings

- **Product Reviews** — Users can leave reviews and ratings for products
- **Review Display** — View all reviews with ratings breakdown
- **Verified Purchases** — Review system integrated with order history

### Design & UX

- **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- **Modern UI** — Clean, elegant interface with smooth animations
- **Dark Mode Support** — Comfortable viewing in any lighting condition
- **Accessibility** — Keyboard navigation and screen reader support

### Backend Capabilities

- **RESTful API** — Well-structured API endpoints for all operations
- **MongoDB Database** — Efficient data storage with Mongoose ODM
- **Authentication Middleware** — Secure route protection with JWT
- **Error Handling** — Comprehensive error handling and validation
- **Order Management** — Complete order processing and tracking system

---

## Tech Stack

### Frontend

- **React** — Component-based UI library
- **React Router** — Client-side routing and navigation
- **Context API** — Centralized state management for cart, auth, and checkout
- **Stripe.js** — Secure payment form integration
- **React Icons** — Icon library for UI elements
- **Custom CSS** — Modular, maintainable styling

### Backend

- **Node.js** — JavaScript runtime environment
- **Express.js** — Web application framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **JWT** — JSON Web Tokens for authentication
- **Stripe API** — Payment processing
- **bcrypt.js** — Password hashing

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment processing

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sliikandco.git
   cd sliikandco
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

---

## Project Structure

```
sliikandco/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── context/          # Context providers (Auth, Cart, Checkout)
│   ├── utils/            # Utility functions and helpers
│   └── assets/           # Images and static assets
├── server/               # Backend server code
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   └── middleware/      # Custom middleware
└── public/              # Public assets
```

---

## Features in Development

- [ ] Wishlist sync across devices
- [ ] Advanced product recommendations
- [ ] Multiple payment methods
- [ ] Admin dashboard for product management

---

## Contact

**Muzuvukile Nqwiliso**  
[GitHub](https://github.com/BSyntax) | [LinkedIn](https://www.linkedin.com/in/muzuvukile-nqwiliso-9722122a2) | [Email](mailto:mzu.nqwiliso@gmail.com)

---

## Acknowledgments

- Product images are used for educational purposes only
- Stripe for payment processing infrastructure
- MongoDB for database solutions
- React community for excellent documentation and resources
