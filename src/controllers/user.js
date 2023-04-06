import User from "../model/users.js";
export const getAllUsersCount = (req, res) => {
  // get the count of all the users
  User.countDocuments({})
    .then((count) => {
      res.json({
        data: count,
      });
    })
    .catch((err) => {
      res.json({
        message: "an error occured",
        error: err,
      });
    });
};
