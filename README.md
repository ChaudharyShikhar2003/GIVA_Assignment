# Product Listing App

A full-stack task management application with React frontend and Node.js/Express backend. It is hosted on  [link][https://chaudharyshikhar2003.github.io/GIVA_Assignment/]
NOTE: We have hosted only the frontend on [link][https://chaudharyshikhar2003.github.io/GIVA_Assignment/], it is hosted on the dummy branch, and if you want to run it locally, please switch to master branch

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn package manager
- PostgreSQL (if running without Docker)

## Getting Started

### Backend Setup
1. Navigate to the backend directory:

` cd backend `


2. Start the backend services using Docker Compose:

` docker compose up `


This will start the Node.js server and MongoDB database.

### Frontend Setup
1. Navigate to the frontend directory:

` cd frontend `

2. Install dependencies:

` npm install `

3. Start the development server:

` npm run dev `


The frontend will be available at `http://localhost:3000`

## Testing

The backend APIs are thoroughly tested using Jest and Supertest. To run the tests:


` cd backend `
` npm test `
