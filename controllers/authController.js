const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) { error.status = 400; throw error; }

    const { name, email, password } = req.body;
    if (await User.findOne({ email })) {
      const err = new Error("Email already registered"); err.status = 409; throw err;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.json({ success:true, message:"Registered", user: { id:user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) { error.status = 400; throw error; }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { const e = new Error("Invalid credentials"); e.status = 400; throw e; }

    const match = await bcrypt.compare(password, user.password);
    if (!match) { const e = new Error("Invalid credentials"); e.status = 400; throw e; }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ success:true, message:"Login successful", token, user:{ id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) { next(err); }
};
