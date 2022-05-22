const { Category } = require("../models");

class Controller {
    static getCategory(req, res) {
        Category.findAll()
            .then((categories) => {
                res.status(200).json(categories);
            })
            .catch((err) => {
                next(err);
            });
    }
    static async postCategory(req, res) {
        try {
            const checkCategory = await Category.findOne({
                where: { name: req.body.name },
            });
            if (checkCategory) throw { status: 400, message: "Has been Category" };
            const addCategory = await Category.create({ name: req.body.name });
            res.status(201).json({ message: `Category ${addCategory} success to add` });
        } catch (error) {
            res.status(err.status).json(err.message);
        }
    }
}
module.exports = Controller;
