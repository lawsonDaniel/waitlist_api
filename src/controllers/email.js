import User from "../model/users.js";
import validator from "validator";
import { sendUserMail } from "../utils/sendMail.js";

export const AddNewMail = (req, res) => {
  //check if the mail valid
  if (validator.isEmail(req.body.email)) {
    // check if the mail exists
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.json({ message: "mail already exists",status:false });
        } else {
          const createUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            sex: req.body.sex,
          });
          // save user
          createUser
            .save()
            .then((userResponse) => {
              // get the count of all the users
              User.countDocuments({})
                .then((count) => {
                  res.json({
                    message: "user created",
                    userNumber: count,
                    status:true,
                    data: userResponse,
                  });
                  // send user mail
                  sendUserMail(req.body.email, req.body.name, count);
                })
                .catch((err) => {
                  res.json({
                    message: "an error occured",
                    error: err,
                    status: false
                  });
                });
            })
            .catch((err) => {
              res.json({
                message: "error creating user",
                data: err,
                status: false
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          message: "an error occured",
          error: err,
          status: false
        });
      });
  } else {
    res.json({
      message: "invalid email address",
      status: false
    });
  }
};
