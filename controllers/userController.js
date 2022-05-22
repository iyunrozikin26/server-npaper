const { comparePassword } = require("../middlewares/bcrypt");
const { sign } = require("../middlewares/jwt");
const { User, Profile } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class Controller {
    static async postRegister(req, res) {
        try {
            const user = {
                username: req.body.username.toLowerCase(),
                email: req.body.email,
                password: req.body.password,
            };
            const postUser = await User.create(user);
            const profile = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                studentID: req.body.studentID,
                university: req.body.university,
                studyProgram: req.body.studyProgram,
                image: req.body.image,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                UserId: postUser.id,
            };
            const postProfile = await Profile.create(profile);
            res.status(201).json({ id: postUser.id, email: postUser.email, username: postProfile.username });
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
    static async postLogin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) throw { status: 401, message: "wrong email / password" };
            else {
                if (comparePassword(password, user.password)) {
                    const access_token = sign({ email: user.email });

                    res.status(200).json({
                        access_token,
                        email: user.email,
                        role: user.role,
                        username: user.username,
                        id: user.id,
                    });
                } else {
                    throw { status: 401, message: "wrong email / password" };
                }
            }
        } catch (error) {
            res.status(error.status).json(error.message);
        }
    }
    static googleLogin(req, res, next) {
        let payload;
        client
            .verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.CLIENT_ID,
            })
            .then((ticket) => {
                payload = ticket.getPayload();

                return User.findOne({
                    where: {
                        email: payload.email,
                    },
                });
            })
            .then((user) => {
                if (!user) {
                    let user = {
                        username: payload.email.split("@")[0],
                        email: payload.email,
                        password: "qwerty123",
                        phoneNumber: "need to update",
                        address: "need to update",
                        role: "student",
                    };
                    return User.create(user);
                } else {
                    return user;
                }
            })
            .then((newUser) => {
                const access_token = sign({ email: newUser.email });

                res.status(200).json({
                    access_token,
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Controller;
