const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const app = express();

// buraya request gelince graphql function çalışıyor
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    "mongodb+srv://dgn123:dgn123@cluster0.a0t1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connection Successfly"))
  .catch((err) => console.error(err));
app.listen(PORT, () => {
  console.log("Connection Successfly");
});
