const router = require("express").Router();
const User = require("../models/users.model");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser
      .save()
      .then(() => res.status(200).json({ message: "Register successfull" }));
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "User already exists" });
    console.log(res.status(200));
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "Please register first" });
    }
    if (password !== user.password) {
      return res.status(200).json({ message: "Invalid password" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(200).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
