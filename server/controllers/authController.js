import User from "../models/User.js";
import { generateToken, generateEmailToken } from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser)
      return res.status(400).json({ message: "User already Exisit" });
    // const hashedPassword = await bcrypt.hash(password , 10)
    const emailToken = generateEmailToken({email});
    const newUser = await User.create({
      name,
      email,
      password,
      emailToken,
      verificationExpire: Date.now() + 60 * 60 * 1000,
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${emailToken}`;

    await sendEmail({
      to: newUser.email,
      subject: "Verify your email",
      html: `
            <h1>Welcome ${newUser.name}</h1>
            <p>Please verify your email by clicking on this link <a href='${verifyUrl}' >Verify Email</></p>
        `,
    });
    res.status(201).json({
      message: "User created successfully.",
      user: { id: newUser._id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exisitingUser = await User.findOne({ email }).select("+password");
    if (!exisitingUser)
      return res.status(400).json({ message: "Bad credentials" });

    if (exisitingUser.isBlocked)
      return res
        .status(403)
        .json({ message: "Account is blocked . Contact Admin" });

    if (!exisitingUser.isVerified)
      return res.status(401).json({ message: "Verify Email First" });

    const isMatch = await exisitingUser.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Set cookie
    let jwtToken = generateToken({id: exisitingUser._id, role: exisitingUser.role})

    res.cookie("token" , jwtToken , {
      httpOnly : true, // Prevent XSS Attacks / Cookie cannot be accessed by javascript
      secure : process.env.NODE_ENV === "production",  // secure : true => Cookie sent only over HTTPS / process.env.NODE_ENV === "production"
      sameSite : "strict",
      maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days 
    })



    res.status(200).json({
      message: "Logged in successfully",
      success : true ,
      user: {
        id: exisitingUser._id,
        name: exisitingUser.name,
        email: exisitingUser.email,
        role: exisitingUser.role,
      },
      // token: generateToken({
      //   id: exisitingUser._id,
      //   role: exisitingUser.role,
      // }),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const logout = async (req,res) => {
  try {
    res.clearCookie("token" , {
      httpOnly : true,
      secure : process.env.NODE_ENV === "production",
      sameSite : "strict"
    })

    res.status(200).json({message :"Logged out successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const verifyEmailToken = async (req, res) => {
  const { emailToken } = req.params;
  try {
    const user = await User.findOne({
      emailToken,
      verificationExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "invalid token" });

    user.isVerified = true;
    user.emailToken = undefined;
    user.verificationExpire = undefined;

    await user.save();
    res.status(200).json({ message: "email verified successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const googleAuth = async (req,res) => {
  const {email , name} = req.body

  let user = await User.findOne({email})

  if(!user){
    user = await User.create({
      email,
      name,
      isVerified : true,
      password : "google-auth"
    })
  }

  const token = generateToken({id : user._id})

  res.cookie('token' , token , {
    httpOnly : true,
    sameSite : 'strict'
  })

  res.json({user})
}