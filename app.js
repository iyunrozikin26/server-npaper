require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const userRouter = require("./routes/userRoute");
const researchRouter = require("./routes/researchRoute");
const categoryRouter = require("./routes/categoryRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("upload"));

app.use("/users", userRouter);
app.use("/research", researchRouter);
app.use("/categories", categoryRouter);

app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
});
