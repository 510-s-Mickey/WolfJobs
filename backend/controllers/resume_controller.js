// controllers/resume_controller.js
const Resume = require("../models/resume");
const User = require("../models/user");

const multer = require("multer");

const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("Please upload a PDF file"));
    }
    cb(undefined, true);
  },
});

/**
 * Handles uploading a resume of a user, corresponds to the
 * API Route, /uploadResume
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns status messsage for succesfully uploading a resume
 * or if the user cannot be found
 */
exports.uploadResume = async (req, res) => {
  // first look for a resume with the same applicantId
  const existingResume = await Resume.findOne({
    applicantId: req.body.id,
  });

  if (existingResume) {
    // delete the existing resume
    existingResume.remove();
  }

  // find the user and add the resume
  let user = await User.findOne({ _id: req.body.id });

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  try {
    const resume = new Resume({
      applicantId: user._id, // Assuming the user is authenticated
      fileName: req.file.originalname,
      fileData: req.file.buffer,
      contentType: "application/pdf",
    });
    await resume.save();

    // update the user's resumeId
    user.resumeId = resume._id;
    user.resume = resume.fileName;
    await user.save();

    res.status(201).send({ message: "Resume uploaded successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

/**
 * Returns the resume of the user, corresponds to the API
 * route, /applicantresume/:id
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns the data of the resume or an error message if the
 * resume was not found
 */
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ applicantId: req.params.id });
    if (!resume) {
      return res.status(404).send({ error: "Resume not found" });
    }
    res.set("Content-Type", "application/pdf");
    // send file name
    res.set("Content-Disposition", `inline; filename=${resume.fileName}`);
    res.send(resume.fileData);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

/**
 * Handles uploading a video URL for a user, corresponds to the
 * API Route, /uploadVideoUrl
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns status message for successfully uploading a video URL
 * or if the user cannot be found
 */
exports.uploadVideoUrl = async (req, res) => {
  const { videoUrl, userId } = req.body;
  
  console.log("Received userId:", userId);
  console.log("Received videoUrl:", videoUrl);

  
  if (!userId || !videoUrl) {
    return res.status(400).send({ error: "Video URL and User ID are required" });
  }

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      console.log("User not found for userId:", userId);
      return res.status(404).send({ error: "User not found" });
    }

    if (user.videoUrl) {
      console.log(`Existing video URL found: ${user.videoUrl}`);
      user.videoUrl = null; 
    }

    user.videoUrl = videoUrl;
    await user.save();

    console.log("Updated user with videoUrl:", user);

    res.status(201).send({ message: "Video URL uploaded successfully" });
  } catch (error) {
    console.error("Error updating video URL:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

/**
 * Returns the video URL of the user, corresponds to the API
 * route, /getVideoUrl/:id
 * @param {*} req response from users
 * @param {*} res status of request
 * @returns the video URL or an error message if not found
 */
exports.getVideoUrl = async (req, res) => {
  try {
    
    const user = await User.findById(req.params.id);

    
    if (!user || !user.videoUrl) {
      return res.status(404).send({ error: "Video URL not found" });
    }

    
    return res.status(200).json({
      message: "Video URL found",
      videoUrl: user.videoUrl,
    });
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};


// Make sure to export the multer upload as well
exports.upload = upload;

exports.ping = (req, res) => {
  res.send({ message: "Pong" });
};
