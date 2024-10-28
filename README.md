![Banner](resources/Banner.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm-build](https://github.com/SE-Fall-2024/WolfJobs/actions/workflows/build-checker.yml/badge.svg)](https://github.com/SE-Fall-2024/WolfJobs/actions/workflows/build-checker.yml)
[![Issues](https://img.shields.io/github/issues/SE-Fall-2024/wolfjobs)](https://GitHub.com/SE-Fall-2024/Wolfjobs/)
[![Issues Closed](https://img.shields.io/github/issues-closed/SE-Fall-2024/wolfjobs)](https://GitHub.com/SE-Fall-2024/Wolfjobs/)
![last commit](https://img.shields.io/github/last-commit/SE-Fall-2024/Wolfjobs)
![Lines of code](https://tokei.rs/b1/github/SE-Fall-2024/wolfjobs)
[![Repo-size](https://img.shields.io/github/repo-size/SE-Fall-2024/Wolfjobs)](https://GitHub.com/SE-Fall-2024/Wolfjobs/)
[![file_count](https://img.shields.io/github/directory-file-count/SE-Fall-2024/Wolfjobs)](https://GitHub.com/SE-Fall-2024/Wolfjobs/)
[![language_count](https://img.shields.io/github/languages/count/SE-Fall-2024/Wolfjobs)](https://GitHub.com/SE-Fall-2024/Wolfjobs/)
[![Downloads](https://img.shields.io/github/downloads/SE-Fall-2024/WolfJobs/total)](https://GitHub.com/SE-Fall-2024/Wolfjobs/)
[![Top Language](https://img.shields.io/github/languages/top/SE-Fall-2024/wolfjobs)](https://GitHub.com/SE-Fall-2024/Wolfjobs/)
[![DOI](https://zenodo.org/badge/429097663.svg)](https://zenodo.org/badge/latestdoi/429097663) TODO
[![Release](https://img.shields.io/github/v/release/deepr41/wolfjobs)](https://gitHub.com/SE-Fall-2024/Wolfjobs) TODO
[![codecov](https://codecov.io/github/SE-Fall-2024/WolfJobs/graph/badge.svg?token=ZIAN9cdn9q)](https://codecov.io/github/SE-Fall-2024/WolfJobs)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/SE-Fall-2024/WolfJobs/blob/master/.prettierrc.json)
[![EsLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://github.com/SE-Fall-2024/WolfJobs/blob/master/eslint.config.mjs)

<!-- ![Static Badge](https://img.shields.io/badge/any_text-i_like-blue) -->

# Tech Stack 
<!-- Really Good Reference: https://github.com/Ileriayo/markdown-badges -->

#### Backend Technologies

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![RestAPI](https://img.shields.io/badge/RestAPI-005571?style=for-the-badge&logo=restapi)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

#### Frontend Technologies

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

#### Styling

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

#### Testing

![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/-chai-%23a40802?style=for-the-badge&logo=chai&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)

#### Package Management

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

#### CI/CD

![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)


# What's New

- Implemented new GitHub Actions are documented and described in the Wiki [here](https://github.com/SE-Fall-2024/WolfJobs/wiki/Github-Actions-Documentation).
- Containerization of Entire Application! This provides a seamless process to build the application.
- Minor changes to UI to match [style guide](https://www.figma.com/file/sqt0gh5H7bZEkryKZ9jFnK/WolfJobs).
- Implemented Prettier formating and EsLinting for style consistancy and static analysis
- Used In-Memory MongoDB databases to create a new MongoDB database in memory when testing the backend every time
- Fixed backend tests to no longer timeout and implemented a test suite of backend tests using ^



### Documented the application architecture in a software architecture diagram
![Diagram](https://github.com/SE-Fall-2024/WolfJobs/blob/8fc26401efe658c2fff36937a051a6430b69c36e/resources/Arch%20Diagram.png)

NOTE: Note about routes/v1/index.js step
From the backend/index.js file, it points to the /routers folder which contains an index.js file which points to another index.js which checks a user.js file for API endpoints, and then checks the final routes/api/v1/index.js and routes/api/v1/user.js. The different index.js files point to each other while checking the same level user.js files for API endpoints until it hits the routes/v1/user.js which contains the majority of the API endpoints. It took us awhile to figure this out and we wanted to document how it worked.


# Presentation Video

# About WolfJobs

Eager to dive into a side hustle or seize a full-time job opportunity? Look no further than WolfJobs. Our platform is the ultimate connector between recruiters in need of talent for both short-term and full-time roles and candidates seeking the freedom to choose. Dive in, earn your share, and opt out whenever you want – or stay on for a longer journey!

At the heart of our bustling campus, WolfJobs stands out as the top student employment portal. Whether you're on the hunt for a short-term tech project, a part-time shift at a campus dining hall, or a full-time position that offers stability and growth, WolfJobs has a spot just for you.

# Why WolfJobs?

At WolfJobs, it’s not just about work – it's about joining a vibrant pack where every wolf (err, student!) counts. Step in and find your howl!🐺🎉

- **Competitive & Rewarding:** As part of the WolfJobs family, we pride ourselves on offering competitive wages paired with flexible schedules. Your time is valuable, and we recognize that.

- **Holistic Growth & Learning:** With our commitment to fostering a culture rich in learning and opportunity, every job position at WolfJobs paves the way for personal and professional growth.

- **A Confluence of Values:** Our foundation rests on unwavering values: integrity, respect for diversity, responsibility, stewardship, and relentless pursuit of excellence. Every job posted resonates with these ideals, ensuring a harmonious and enriching work environment.

- **Inclusivity & Belonging:** At WolfJobs, every student is a valuable asset. Our emphasis on inclusion ensures that you're not just taking up a job; you're becoming a part of a diverse, dynamic community where your voice matters.

# Application Preview:

## Applicant Side

### Signup & Login

![Signup & Login](resources/Student%20-%20Sign%20Up%20%26%20Login.gif)

### Student Applies for Job

![Apply for Job](resources/Student%20Applies%20to%20a%20Job.gif)

### Application Status & Questionaire

![Questionaire](resources/Applicant%20Filling%20answers.gif)

## Manager Side

### Manager Sign Up
![Manager Sign Up](resources/Manager%20-%20Sign%20Up.gif)

### Manager Login
![Manager Login](resources/Manager%20-%20Login.gif)

### Edit Profile
![Edit Profile](resources/Open%20%26%20Edit%20Profile.gif)

### Add/Close Job
![Add/Close Job](resources/Add%20%26%20Close%20Job.gif)

### Screening
![Screening](resources/Manager%20-%20Screening.gif)

### Review & Accept Applications
![Review Applications](resources/Manager%20-%20Grade%2C%20Review%20%26%20Accept%20Candidates.gif)


# Installation Instructions for Project Setup
<!-- Need to update this!! Especially if we dockerize -->

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

# Future Improvements

**1. Email Service** - On getting selected/rejected to a job, the applicant should be getting an email about it.

**2. Interview Video Submission** - Managers can request applicants to submit a video screening file and applicants can upload a video on their side of the portal.

**3. Job Analysis** – WolfJobs will provide the functionality of analysing various aspects of a job. Job Analysis based on various parameters using graphical representation will help in making prediction on which jobs are more preferred and for which jobs applicants have more inclination. Hiring managers can then decide what rewards and salary to be given to the applicants of that job. Even applicants will get to know, which job is being preferred among other applicants.

**4. Interview Appointment Scheduling** – WolfJobs will also provide the facility for the hiring manager to organize an interview appointment for the job based on applicant’s availability and convenient time uploaded by the hiring manager. Either of the users can upload their availability time in the G-sheet and using google calendar appointments can be organised.

**5. Candidate Matching Percentage** – WolfJobs applicant skill matching feature will include a percentage to how fit a candidate's skills are based on the job's required skills. Applicants will see a match percentage indicating how likely they are to get accepted and recieve an interview. 

**6. Matching based on Resume** – WolfJobs applicants will be able to parse their resume and WolfJobs will extract key skills from the resume and compare it with required job skills to give candidates job matching status.

**7. Database Security and Hashing** – WolfJobs currently does not securely store the password and user information in the database. This data needs to be protected and hashed to ensure security.

**8. Refactoring of Backend** - Reference the note attached to architecture diagram. There are multiple index.js files that reference eachother and should be consolidated.

**9. Fix Resume Storage and View** - Wolfjobs currently does not display resumes stored in the databases.

# Contributors

  <table>
  <tr>
    <td align="center"><a href="https://github.com/deepr41"><img src="https://avatars.githubusercontent.com/deepr41" width="100px;" alt=""/><br /><b>Deepak Rajendran</b></a></td>
    <td align="center"><a href="https://github.com/shafa112"><img src="https://avatars.githubusercontent.com/shafa112" width="100px;" alt=""/><br /><b>Shafa Hassan</b></a><br /></td>
    <td align="center"><a href="https://github.com/Janhavi-23"><img src="https://avatars.githubusercontent.com/Janhavi-23" width="100px;" alt=""/><br /><b>Janhavi Pendse</b></a><br /></td>
    <td align="center"><a href="https://github.com/deepp2905"><img src="https://avatars.githubusercontent.com/deepp2905" width="100px;" alt=""/><br /><b>Deep Patel</b></a><br /></td>
  </tr>
</table>

## Iteration 2:
 <table>
  <tr>
    <td align="center"><a href="https://github.com/sanjitkverma"><img src="https://avatars.githubusercontent.com/sanjitkverma" width="100px;" alt=""/><br /><b>Sanjit Verma</b></a></td>
    <td align="center"><a href="https://github.com/arul28"><img src="https://avatars.githubusercontent.com/arul28" width="100px;" alt=""/><br /><b>Arul Sharma</b></a><br /></td>
    <td align="center"><a href="https://github.com/Harris-A-Khan"><img src="https://avatars.githubusercontent.com/Harris-A-Khan" width="100px;" alt=""/><br /><b>Harris Khan </b></a><br /></td>
    <td align="center"><a href="https://github.com/Sarvesh-Somasundaram"><img src="https://avatars.githubusercontent.com/Sarvesh-Somasundaram" width="100px;" alt=""/><br /><b>Sarvesh Somasundaram</b></a><br /></td>   
  </tr>
</table>

## Iteration 3:
 <table>
  <tr>
    <td align="center"><a href="https://github.com/nrcase"><img src="https://avatars.githubusercontent.com/nrcase" width="100px;" alt=""/><br /><b>Nick Case</b></a></td>
    <td align="center"><a href="https://github.com/hannahestes"><a href="https://github.com/hannahe6"><img src="https://avatars.githubusercontent.com/hannahestes" width="100px;" alt=""/><br /><b>Hannah Estes</b></a></a><br /></td>
    <td align="center"><a href="https://github.com/satwikakancharla"><img src="https://avatars.githubusercontent.com/satwikakancharla" width="100px;" alt=""/><br /><b>Satwika Kancharla </b></a><br /></td>
  </tr>
</table>
