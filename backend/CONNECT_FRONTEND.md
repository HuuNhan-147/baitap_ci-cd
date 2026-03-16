# Task: Connect Frontend Portfolio with Blog Backend API

## Context

The backend blog API has already been implemented using:

- Node.js
- Express
- MongoDB
- Mongoose

The server is running at:

http://localhost:5000

Base API route:

/api/blogs

Existing APIs:

GET /api/blogs
GET /api/blogs/:id
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id

The frontend portfolio already exists and contains a Blog section UI.

Your task is to connect the frontend with the backend APIs.

---

# Requirements

Use **fetch API or axios** to call the backend.

Base API URL:

http://localhost:5000/api/blogs

---

# Features to Implement

## 1. Fetch and Display Blog List

On the Blog page:

- Call API GET /api/blogs
- Display list of blog posts

Each blog card should display:

- title
- summary
- author
- createdAt

Each blog should link to:

/blog/:id

---

## 2. Blog Detail Page

When user clicks a blog:

Fetch:

GET /api/blogs/:id

Display:

- title
- author
- created date
- full content

---

## 3. Add New Blog (Admin)

Create a form to add a new blog post.

Fields:

title
summary
content
author

Send request:

POST /api/blogs

After successful creation:

- redirect to blog list
- refresh blog list

---

## 4. Edit Blog

Add edit button on blog detail page.

Edit form should allow updating:

title
summary
content
author

API:

PUT /api/blogs/:id

---

## 5. Delete Blog

Add delete button.

API:

DELETE /api/blogs/:id

After deletion:

redirect to blog list.

---

# Code Structure

Create an API service file:

services/blogApi.js

Example functions:

- getBlogs()
- getBlogById(id)
- createBlog(data)
- updateBlog(id, data)
- deleteBlog(id)

---

# Example API Service

Use fetch or axios.

Example:

fetch("http://localhost:5000/api/blogs")

---

# UI Updates Required

Update frontend pages:

BlogList
BlogDetail
BlogForm (Add/Edit)

---

# Error Handling

Handle:

- API errors
- loading state
- empty blog list

---

# Expected Result

Users can:

- view blogs
- open blog detail

Admin can:

- create blog
- edit blog
- delete blog

All operations should interact with the backend API.