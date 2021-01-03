import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";
const schema = require("./schema/schema");

const app = express();

// Allow cross-origin request
app.use(cors());

mongoose.connect(
  "mongodb+srv://ayeolakenny:2969529697@todo.icjil.mongodb.net/todo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

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

app.listen(4000, () => {
  console.log("Now listening to port 4000");
});
