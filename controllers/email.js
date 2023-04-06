import User from "../model/users.js";
import validator from "validator";

export const AddNewMail = (req, res) => {
  //check if the mail valid
  if (validator.isEmail(req.body.email)) {
    // check if the mail exists
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.json({ message: "mail already exists" });
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
              res.json({
                message: "user created",
                data: userResponse,
              });
            })
            .catch((err) => {
              res.json({
                message: "error creating user",
                data: err,
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          message: "an error occured",
          error: err,
        });
      });
  } else {
    res.json({
      message: "invalid email address",
    });
  }
};
