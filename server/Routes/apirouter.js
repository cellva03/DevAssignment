const router = require("express").Router();
const User = require("../model/User");

// Create a new user
router.post("/register", async (req, res) => {
  console.log(req.body);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  });
  user.save().then((data) => {
    res.send({ user: true, data: data, message: "User created successfully" });
  });
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .then((data) => {
      if (data.length > 0) {
        if (data[0].password === req.body.password) {
          res.send({ user: true, data: data, message: "User logged in" });
        } else {
          res.send({ user: false, data: data, message: "Incorrect password" });
        }
      } else {
        res.send({ user: false, data: data, message: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Error while fetching users", data: err });
    });
});

router.get("/users", async (req, res) => {
  User.find({})
    .then((data) => {
      res.send({ message: "Users fetched successfully", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Error while fetching users", data: err });
    });
});

router.delete("/users/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((data) => {
      User.find({})
        .then((data) => {
          res.send({ message: "User deleted successfully", data: data });
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "Error while fetching users", data: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Error while deleting user", data: err });
    });
});

router.get("/users/:id", async (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.send({ message: "User fetched successfully", data: data });
    })
    .catch((err) => {
      res.send({ message: "Error while fetching user", data: err });
      console.log(err);
    });
});

router.put("/users/:id", async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send({ message: "User updated successfully", data: data });
    })
    .catch((err) => {
      res.send({ message: "Error while updating user", data: err });
      console.log(err);
    });
});

module.exports = router;
