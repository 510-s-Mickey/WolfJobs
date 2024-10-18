import express from "express";                          // Importing express
import homeController from "../controllers/home_controller"; // Importing home controller
import usersRouter from "./users";                       // Importing users router
import apiRouter from "./api";                           // Importing API router

const router = express.Router();                        // Creating a new router instance

console.log("router loaded");                          // Log message indicating the router is loaded

router.get("/", homeController.home);                  // Define the home route
router.use("/users", usersRouter);                     // Use the users router
router.use("/api", apiRouter);                         // Use the API router

export default router;                                  // Export the router
