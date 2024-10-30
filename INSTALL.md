# Installation Instructions for Project Setup

**Prerequisites:**

- Ensure that you have Node.js version 18.0 installed. If not, download and install it from [Node.js Official Website.](https://nodejs.org/en/download/)
- Download and install the latest version of MongoDB from [MongoDB Official Website.](https://www.mongodb.com/try/download/community)
- Make sure you have React version 18.0

**Step 1: Clone the Repository from this [link](https://github.com/SE-Fall-2024/WolfJobs)**

**Step 2: Prerequisites**
- Make sure [Docker]([url](https://www.docker.com/)) is downloaded.

**Step 3: Run WolfJobs**
- Open a terminal window and navigate to the home directory (WolfJobs)
- Enter the docker command: `docker compose up --build`
  - The first build can take a while, so be patient!

**Step 4: Open [http://localhost:5173](http://localhost:5173) to view it in the browser.**

**Congratulations! The project should now be up and running successfully.**

# Additional commands for WolfJobs

#### `docker compose down`
- Removes Docker containers

#### `npm run lint:back`
- runs EsLint static analysis tool on the backend code

#### `npm run lint:front`
- runs EsLint static analysis tool on the frontend code

### Frontend Directory 
Accessible by `cd frontend` from the parent directory: WolfJobs.

#### `npm test`
- Runs frontend tests

####   `npm run coverage`
- Runs coverage report for frontend tests

### Backend Directory
Accessible by `cd backend` from the parent directory: Wolfjobs.

#### `npm test`
- Runs backend tests

#### `npm run coverage`
- Runs backend coverage
