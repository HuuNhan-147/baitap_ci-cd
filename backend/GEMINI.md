# Blog Portfolio Backend Setup

## Goal

Build a backend system for my personal portfolio blog that allows me to create, update, delete, and display blog posts.

The backend will be built using **Node.js, Express, and MongoDB** and will connect with an existing portfolio frontend.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Frontend

* Existing portfolio frontend (already built)

---

# Database Setup

Use MongoDB Atlas with the following connection string:

mongodb+srv://admin:huunhan147@cluster0.h80r0.mongodb.net/

Create a database named:

Blog

Create a collection named:

blogs

---

# Blog Schema (MongoDB)

Each blog post should contain the following fields:

| Field     | Type          | Description                            |
| --------- | ------------- | -------------------------------------- |
| _id       | ObjectId      | Auto generated id                      |
| title     | String        | Blog title                             |
| slug      | String        | URL friendly title                     |
| excerpt   | String        | Short summary of the blog              |
| content   | String        | Full blog content (markdown supported) |
| category  | String        | Blog category                          |
| tags      | Array[String] | Blog tags                              |
| author    | String        | Author name                            |
| image     | String        | Blog thumbnail image                   |
| readTime  | String        | Estimated reading time                 |
| featured  | Boolean       | Featured blog                          |
| createdAt | Date          | Created date                           |
| updatedAt | Date          | Updated date                           |

---

# Example Blog Document

{
"title": "Tất tần tật về Async/Await trong JavaScript",
"slug": "javascript-async-await",
"excerpt": "Tìm hiểu toàn diện về Async/Await...",
"content": "Full blog content...",
"category": "JavaScript",
"tags": ["JavaScript","Async","Promise"],
"author": "Huu Nhan",
"image": "https://images.unsplash.com/photo-1627398242454",
"readTime": "10 minutes",
"featured": true,
"createdAt": "2026-03-11T10:00:00Z",
"updatedAt": "2026-03-11T10:00:00Z"
}

---

# Backend Setup

Initialize a Node.js project:

npm init -y

Install dependencies:

npm install express mongoose cors dotenv

---

# Project Structure

backend
│
├── server.js
│
├── config
│   └── db.js
│
├── models
│   └── Blog.js
│
├── controllers
│   └── blogController.js
│
├── routes
│   └── blogRoutes.js
│
├── middleware
│   └── errorHandler.js
│
└── .env

---

# Environment Variables (.env)

PORT=5000

MONGO_URI=mongodb+srv://admin:huunhan147@cluster0.h80r0.mongodb.net/Blog

---

# Server Setup

Create an Express server.

Requirements:

* Enable CORS
* Enable JSON body parsing
* Connect to MongoDB using Mongoose
* Use environment variables
* Use MVC architecture

Server should run on:

http://localhost:5000

---

# API Requirements

Base route:

/api/blogs

---

# 1. Get All Blogs

GET /api/blogs

Return all blog posts.

Optional query parameters:

?page=1
&limit=10
&category=javascript

---

# 2. Get Blog by Slug

GET /api/blogs/:slug

Return blog details.

Example:

GET /api/blogs/javascript-async-await

---

# 3. Create Blog

POST /api/blogs

Request body example:

{
"title": "",
"slug": "",
"excerpt": "",
"content": "",
"category": "",
"tags": [],
"author": "",
"image": "",
"readTime": "",
"featured": false
}

---

# 4. Update Blog

PUT /api/blogs/:id

Update an existing blog.

---

# 5. Delete Blog

DELETE /api/blogs/:id

Delete a blog post.

---

# Frontend Integration

The frontend portfolio should call backend APIs.

Example API endpoint:

http://localhost:5000/api/blogs

Example fetch request:

fetch("http://localhost:5000/api/blogs")
.then(res => res.json())
.then(data => console.log(data))

---

# Frontend Features

The frontend should support the following features:

## Blog List Page

Display all blogs.

## Blog Detail Page

Display full blog content.

## Admin Blog Management

Admin can:

* Create blog
* Edit blog
* Delete blog

---

# Expected Result

Visitors can:

* View blog list
* Read blog details

Admin (portfolio owner) can:

* Create blog posts
* Update blog posts
* Delete blog posts

All blog data should be stored in MongoDB Atlas.

---

# Development Guidelines

Use:

* MVC architecture
* async/await
* proper error handling
* JSON responses
* RESTful API design
