import express from "express";           // Importing express
import v1Router from "./v1";              // Importing the v1 router

const router = express.Router();         // Creating a new router instance

router.use("/v1", v1Router);            // Using the v1 router

export default router;                   // Exporting the router
