# JobifyHub

## Overview
JobifyHub is an online platform designed to connect job seekers with recruiters. It provides a space for users to post job listings and enables applicants to apply for available positions. The platform is developed using NestJS for the backend, React for the frontend, and MySQL as the database.

## Backend (NestJS)
#### Endpoints
- POST /users/register: Register a new user.
- POST /users/login: Authenticate and log in a user.
- PATCH /users/reset-password: Reset user password.
- DELETE /users/:id: Delete user account.
- POST /users/logout: Log out a user. (needs to be implemented)
- POST /jobs/create: Create a new job posting. (needs to be implemented)

### Database Schema
#### User Table
- id
- email
- password
- role

#### Job Table
- id
- title
- description
- location

#### Application Table
- id
- resume
- coverLetter
- applicationStatus


## Frontend (ReactTS)
### Features

### Components

### Pages
