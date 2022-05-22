const Controller = require("../controllers/researchController");
const { authentication, authorAccess } = require("../middlewares/auth");
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "---" + file.originalname);
    },
});
const upload = multer({ storage: fileStorageEngine });
const researchRouter = require("express").Router();

researchRouter.post("/", authentication, upload.single("document"), Controller.postResearch); // Create
researchRouter.get("/", authentication, Controller.getAllResearch); // Read All
researchRouter.get("/read/:researchId", authentication, Controller.researchByPk); // Read ByPk

researchRouter.put("/edit/:researchId", authentication, authorAccess, Controller.putResearch); // Update PUT (all)

researchRouter.patch("/softEdit/:researchId", authentication, authorAccess, Controller.patchResearch); // Update PACTH (status)
researchRouter.delete("/delete/:researchId", authentication, authorAccess, Controller.deleteResearch); // Delete

module.exports = researchRouter;
