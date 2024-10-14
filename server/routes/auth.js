
import dotenv from "dotenv"
dotenv.config
import express from "express"
const router = express.Router()
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import User from "../module/user.js"
import verifyToken from "../middleware/auth.js"
import Admin from "../module/admin.js"


//  @route GET api/auth
// @desc Check if user loged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await Admin.findById(req.userId).select("-password")
    if (!user)
      return res.status(400).json({ success: false, message: "User not found" })
    return res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
})


//  @route POST api/auth/register
//  @desc Register user
//  @access Public

router.post("/register", async (req, res) => {
  const { userName, password } = req.body

  //simple validation
  if (!userName || !password)
    return res
      .status(400)
      .json({ success: false, message: "No user name or password" });

  try {
    //check if exiting user
    const user = await Admin.findOne({ userName: userName });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "This name already taken" });

    //begin add user
    const hashPassword = await argon2.hash(password);
    const newUser = new Admin({
      userName: userName,
      password: hashPassword,
    });

    // return token
    const accessToken = jwt.sign(
      { userId: newUser.id },
      process.env.ECCESS_TOKEN_SECRET
    );

    res.status(200).json({ success: true, message: "register successfully", accessToken });
    await newUser.save();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: { error } });
  }
});

//  @route POST api/auth/login
//  @desc  User login
//  @access Public


router.post("/login", async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password)
    return res
      .status(400)
      .json({ success: false, message: "No user name or password" });

  try {
    //check if existing user
    const user = await Admin.findOne({ userName: userName });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Incorrect user name or password!",
      });

    //check password
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res.status(401)
        .json({ success: false, message: "Incorrect user name or password!" });

    //all good
    // return token
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ECCESS_TOKEN_SECRET
    );
    res.status(200).json({ success: true, message: "User login successfully", accessToken });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: { error } });
  }
});

export default router
