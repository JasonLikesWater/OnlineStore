import express from "express";
import cors from "cors";

import moviesRouter from "./routes/movies.js";
import salesRouter from "./routes/sales.js";
import usersRouter from "./routes/users.js";
import reviewsRouter from "./routes/reviews.js";
import peopleRouter from "./routes/people.js";
import genresRouter from "./routes/genres.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend is working");
});

app.use("/api/movies", moviesRouter);
app.use("/api/sales", salesRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/people", peopleRouter);
app.use("/api/genres", genresRouter);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));