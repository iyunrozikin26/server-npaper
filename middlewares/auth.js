const { User, Research } = require("../models");
const { verify } = require("./jwt");

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;
        if (!access_token) throw { status: 401, message: "login first, please" };

        const decoded = verify(access_token);
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) throw { status: 401, message: "Not Authorized" };
        else {
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role,
            };
            next();
        }
    } catch (error) {
        res.status(error.status).json(error);
    }
}
async function authorAccess(req, res, next) {
    try {
        if (req.user.role === "admin") {
            next();
        } else {
            const getResearch = await Research.findByPk(req.params.researchId);
            if (!getResearch) throw { status: 404, message: "Research Not Found" };
            if (getResearch.UserId === req.user.id) {
                next();
            } else {
                throw { status: 403, message: "cannot to access this food" };
            }
        }
    } catch (error) {
        res.status(error.status).json(error.message);
    }
}

module.exports = { authentication, authorAccess };
