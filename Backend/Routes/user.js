import express from "express"
import checkAPIs from 'express-validator';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import  User from "../Model/user.js"
import auth from "../middleware/auth.js"
import { upload, gfs } from "../Model/userProfile.js";



const router = express.Router();
const { check, validationResult } = checkAPIs;

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

  router.post("/me", async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      
      const user = await User.findOne({ email: req.body.email });

      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

  router.post("/updateprofile", [
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], async(req, res) => {
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    const password= await bcrypt.hash(req.body.password, salt);
    req.body.password=password
  
    await User.findOneAndUpdate({ email: req.body.email } ,body, async(err, data) => {
      

     
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send("credentials updated");
      }
    });
  });

  //Image uploading
router.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(201).send(req.file);
  // console.log("fileeeee =>>", req.file.filename);
});

router.get("/retrive/image/single", (req, res) => {
  // console.log("queryyyy = >>>>>>>>>>>>>>>", req);
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        res.status(404).json({ err: "file not found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});

export default router;