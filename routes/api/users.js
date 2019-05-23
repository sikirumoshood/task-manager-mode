const express = require("express");
const Router = express.Router();
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const secretOrKey = require("../../config/keys").secretOrKey;

//@route api/users/test
//@desc tests api
//@access public
Router.get("/test", (req, res) => {
  res.json({ msg: "User route works" });
});

//@route api/users/register
//@desc Registers new user
//@access public

Router.post("/register", (req, res) => {
  //Validate
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email
    });

    //Check if email exists

    User.findOne({ email: newUser.email }).then(user => {
      if (user) {
        errors.email = "Email has been used";
        return res.status(400).json(errors);
      } else {
        //Get avatar image url
        const avatar = gravatar.url(newUser.email, {
          s: "200", //size
          r: "pg", //rating
          d: "mm" //default})
        });

        newUser.avatar = avatar;

        //Hash password and save user

        bcrypt
          .genSalt(10)
          .then(salt => {
            bcrypt
              .hash(req.body.password, salt)
              .then(hash => {
                newUser.password = hash;

                //Save

                newUser
                  .save()
                  .then(user => {
                    return res.json(user);
                  })
                  .catch(err => {
                    console.log(err);
                    return res.status(500).json({ msg: "Unable to save user" });
                    //console.log("Unable to save user " + err);
                  });
              })
              .catch(err => {
                return res.status(500).json({ msg: "Error generating hash" });
              });
          })
          .catch(err => {
            console.log("Bcrypt error " + err);
          });
      }
    });
  }
});

//@route api/users/login
//@desc login user
//@access public

Router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ msg: "Error , user not found" });
        }

        //Compare passwords

        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch) {
              //Sign jwt
              const jwtPayload = {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
              };

              //Encode payload in jwt

              Jwt.sign(
                jwtPayload,
                secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  return res.json({ success: true, token: `Bearer ${token}` });
                }
              );
            } else {
              errors.password = "Password incorrect";
              res.status(400).json(errors);
            }
          })
          .catch(err => {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ msg: "Error finding user" });
      });
  }
});

//@route api/users/current
//@desc Get the current user
//@access private

Router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Find user
    User.findOne({ email: req.user.email })
      .then(user => {
        if (user) {
          return res.json(user);
        } else {
          return res.status(404).json({ msg: "User not found" });
        }
      })
      .catch(err => {
        console.log(err);
        return res.json({ msg: "Error finding user" });
      });
  }
);

module.exports = Router;
