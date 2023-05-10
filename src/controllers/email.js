import User from "../model/users.js";
import validator from "validator";
import { sendUserMail } from "../utils/sendMail.js";
import { v4 } from 'uuid';

export const AddNewMail = async (req, res) => {
  try {
    const { name, email, phone, sex } = req.body;

    // Check if the email is valid
    if (!validator.isEmail(email)) {
      return res.json({
        message: "Invalid email address",
        status: false
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "Email already exists",
        status: false
      });
    }
    //check if it is a vaid number
    if(phone.split('').length < 10){
      return res.json({
        message: "Enter a valid phone number",
        status: false
      });
      //check if it is a valid name
    }else if(name.split('').length < 4){
      return res.json({
        message: "Enter a valid name",
        status: false
      });
    }else{
      // Create a new user
      const privateCode = v4();
      const createUser = new User({
        name,
        email,
        phone,
        sex,
        code: privateCode
      });
  
      // Save the user
      const userResponse = await createUser.save();
  
      // Get the count of all users
      const count = await User.countDocuments({});
  
      res.json({
        message: "User created",
        userNumber: privateCode,
        status: true,
        data: userResponse
      });
  
      // Send user mail
      sendUserMail(email, name, privateCode);
    }
    
   
  } catch (err) {
    res.json({
      message: "An error occurred",
      error: err,
      status: false
    });
  }
};
