import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
const schema = require("./schema/schema");
import * as dotenv from "dotenv";

const app = express();
dotenv.config();

// Allow cross-origin request
app.use(cors());

mongoose.connect(process.env.DB_CONN!, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("Database Connection Established");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Now listening to port ${process.env.PORT}`);
});
