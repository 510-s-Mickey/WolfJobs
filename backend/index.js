import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
const port = 8000;
import expressLayouts from "express-ejs-layouts";
import routes from "./routes";

//Used for session cookie
import session from "express-session"
import passport from "passport"

app.use(cors());

app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set up view engine

app.set("view engine", "ejs");

app.set("views", "./views");

app.use(
  session({
    name: "wolfjobs",
    //TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router

app.use("/", routes);  

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }

  console.log("Server is running on", port);
});
