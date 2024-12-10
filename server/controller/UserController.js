const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HandleSignup = async (req, res) => {
  const { Fname, email, password } = req.body;

  if (!req.body || Object.keys(req.body).length == 0) {
    return res.status(404).json({ msg: "Data is not Find From CLient side" });
  }

  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(409).json("email already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createData = new User({ Fname, email, password: hashPassword });
    const saveData = await createData.save();
    res.status(201).json({ saveData ,success:true});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const HandleLogin = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Email and password are required" });
  }

  try {
    const findUser = await User.findOne({ email });
    
    if (!findUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, error: "Invalid password" });
    }

    // Generate the Token
    const token = jwt.sign(
      {
        userId: findUser._id,
        email: findUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      token,
      Fname: findUser.Fname,
      userId: findUser._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = { HandleSignup,HandleLogin };
