import express from "express";         // Importing express
import usersRouter from "./users";      // Importing users router

const router = express.Router();       // Creating a new router instance

router.use("/users", usersRouter);    // Using the users router

export default router;                 // Exporting the router
