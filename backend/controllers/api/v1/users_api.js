const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const Job = require("../../../models/job");
const Application = require("../../../models/application");
const AuthOtp = require("../../../models/authOtp");
const { sendMail } = require("../../../utils/email_service");

const nodemailer = require("nodemailer");

require("dotenv").config();
/*(async () => {
  const success = await sendMail("huisun.uf@gmail.com", "Test Subject", "This is a test email.");
  console.log("Email sent successfully:", success);
})();*/
/**
 * Creates a new session for users, corresponds to the API route
 * POST /create-session
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for successful sign in,
 * invalid login credentials or server errors
 */
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    res.set("Access-Control-Allow-Origin", "*");
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid username or password",
      });
    }
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Sign In Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "wolfjobs", { expiresIn: "100000" }),
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log("*******", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Signs up the user with valid credentials, corresponds to the API route
 * /signup
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with status message for successful signup, invalid
 * credentials, or server errors
 */
module.exports.signUp = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.status(422).json({
        message: "Passwords do not match",
      });
    }

    // 检查用户是否已经存在
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(400).json({
        message: "User already exists",
        data: {
          token: jwt.sign(existingUser.toJSON(), "wolfjobs", { expiresIn: "100000" }),
          user: existingUser,
        },
        success: true,
      });
    }

    // 创建新用户
    const newUser = await User.create(req.body);


    sendMail(
        newUser.email,
        "Welcome to Job Portal!",
        "Thank you for signing up. Your account has been created successfully!"
    )
        .then(() => {
          console.log("[DEBUG] Email sent successfully.");
        })
        .catch((emailError) => {
          console.error("[DEBUG] Failed to send email:", emailError);
        });

    // 返回成功的响应
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Sign Up Successful, here is your token, please keep it safe",
      data: {
        token: jwt.sign(newUser.toJSON(), "wolfjobs", { expiresIn: "100000" }),
        user: newUser,
      },
      success: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


/**
 * Gets the user profile, corresponds to the API Route
 * /getprofile/:id
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for user information or
 * server errors
 */
module.exports.getProfile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "The User info is",

      data: {
        user: user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Edits the user's profile, corresponds to the API Route
 * /edit
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for successfully
 * updated the users or server errors
 */
module.exports.editProfile = async function (req, res) {
  try {
    let user = await User.findById(req.body.id);

    user.name = req.body.name;
    user.password = req.body.password;
    user.role = req.body.role;
    user.address = req.body.address;
    user.phonenumber = req.body.phonenumber;
    user.hours = req.body.hours;
    user.availability = req.body.availability;
    user.gender = req.body.gender;
    check = req.body.skills;
    user.skills = check;
    user.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(500).json({
      message: "User is updated Successfully",

      data: {
        user,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Finds the list of searched users, corresponds to the API Route
 * /search/:name
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with status message with the list of
 * users or for server errors
 */
module.exports.searchUser = async function (req, res) {
  try {
    var regex = new RegExp(req.params.name, "i");

    let users = await Job.find({ name: regex });
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "The list of Searched Users",

      data: {
        users: users,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Creates a new job and saves it to the database, corresponds to
 * the API Route /createjob
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with status message for succesful job
 * creation or for errors in the process
 */
module.exports.createJob = async function (req, res) {
  let user = await User.findOne({ _id: req.body.id });
  check = req.body.skills;
  try {
    let job = await Job.create({
      name: req.body.name,
      managerid: user._id,
      managerAffiliation: user.affiliation,
      type: req.body.type,
      location: req.body.location,
      description: req.body.description,
      pay: req.body.pay,
      requiredSkills: req.body.requiredSkills,
      question1: req.body.question1,
      question2: req.body.question2,
      question3: req.body.question3,
      question4: req.body.question4,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      data: {
        job: job,
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "NOT CREATED",
    });
  }
};

/**
 * Gets the list of jobs for the user, corresponds to the API Route
 * /
 *
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with the list of jobs
 */
module.exports.index = async function (req, res) {
  let jobs = await Job.find({}).sort("-createdAt");

  //Whenever we want to send back JSON data
  res.set("Access-Control-Allow-Origin", "*");
  return res.status(200).json({
    message: "List of jobs",

    jobs: jobs,
  });
};

/**
 * Gets the list of applications, corresponds to the API Route
 * /fetchapplications
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with the list of applications
 */
module.exports.fetchApplication = async function (req, res) {
  let application = await Application.find({}).sort("-createdAt");

  //Whenever we want to send back JSON data
  res.set("Access-Control-Allow-Origin", "*");
  return res.status(200).json({
    message: "List of Applications",

    application: application,
  });
};

/**
 * Creates a new application for the job (if already applied, sends
 * a message about that), corresponds to the API Route
 * /createapplication
 * @param {*} req respnse from users
 * @param {*} res status of request
 * @returns JSON object with a status message for successful
 * application creation or about an already existing application
 */
module.exports.createApplication = async function (req, res) {
  try {
    const existingApplication = await Application.findOne({
      applicantid: req.body.applicantId,
      jobid: req.body.jobId,
    });

    if (existingApplication) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(400).json({
        message: "You have already applied for the job",
        error: true,
      });
    }

    let application = await Application.create({
      applicantid: req.body.applicantid,
      applicantname: req.body.applicantname,
      applicantemail: req.body.applicantemail,
      applicantskills: req.body.applicantSkills,
      skills: req.body.skills,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      hours: req.body.hours,
      dob: req.body.dob,
      gender: req.body.gender,
      jobname: req.body.jobname,
      jobid: req.body.jobid,
      managerid: req.body.managerid,
    });
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      data: {
        application: application,
      },
      message: "Job Created!!",
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "NOT CREATED",
    });
  }
};

/**
 * Modifies an existing application by moving application into a grading
 * status, allowing applicants to answer questions, corresponds to the
 * API Route /modifyApplication
 * @param {*} req respnse from users
 * @param {*} res status of request
 * @returns JSON object with a status message for succesfully updating
 * the application or server errors
 */
module.exports.modifyApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = req.body.status;

    //change answer only from screening to grading
    if (req.body.status === "grading") {
      application.answer1 = req.body.answer1;
      application.answer2 = req.body.answer2;
      application.answer3 = req.body.answer3;
      application.answer4 = req.body.answer4;
    }

    if (req.body.status === "rating") {
      application.rating = req.body.rating;
    }
    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Application is updated Successfully",
      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Accepts an existing application by changing its status, corresponds
 * to the API Route /acceptapplication
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for succesfully
 * updating the application or server errors.
 */
module.exports.acceptApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = "1";

    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Application is updated Successfully",

      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Rejects an existing application by changing its status, corresponds
 * to the API Route /rejectapplication
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for succesfully
 * updating the application or server errors.
 */
module.exports.rejectApplication = async function (req, res) {
  try {
    let application = await Application.findById(req.body.applicationId);

    application.status = "2";

    application.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Application is updated Successfully",

      data: {
        application,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Closes an existing job by changing its status, corresponds
 * to the API Route /closejob
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for succesfully
 * updating the job or server errors.
 */
module.exports.closeJob = async function (req, res) {
  try {
    let job = await Job.findById(req.body.jobid);

    job.status = "closed";

    job.save();
    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      message: "Job is updated Successfully",

      data: {
        job,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

function getTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
}

/**
 * Generates an OTP and sends an email to the user, corresponds
 * to the API route /generateOTP
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for succesfully
 * generating an OTP or server errors
 */
module.exports.generateOtp = async function (req, res) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    let authOtp = await AuthOtp.create({
      userId: req.body.userId,
      otp: otp,
    });

    const { email } = await User.findById(req.body.userId);
    // Send mail to user
    const mailOptions = {
      from: '"Job Portal" <' + process.env.EMAIL + ">", // sender address
      to: email, // list of receivers
      subject: "OTP", // Subject line
      html: `<p>Your OTP is ${otp}</p>`, // plain text body
    };

    await getTransport().sendMail(mailOptions);

    res.set("Access-Control-Allow-Origin", "*");
    return res.status(500).json({
      success: true,
      message: "OTP is generated Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Verifies the OTP that the user entered, corresponds to the
 * API route /verifyOTP
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns JSON object with a status message for succesfully
 * verification, an incorrect OTP, or server errors
 */
module.exports.verifyOtp = async function (req, res) {
  try {
    const authOtp = await AuthOtp.findOne({
      userId: req.body.userId,
      otp: req.body.otp,
    });

    if (!authOtp) {
      return res.status(422).json({
        error: true,
        message: "OTP is not correct",
      });
    }

    authOtp.remove();

    await User.updateOne(
        { _id: req.body.userId },
        { $set: { isVerified: true } }
    );

    res.set("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      success: true,
      message: "OTP is verified Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};