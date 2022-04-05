const express = require("express");

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
app.listen(PORT, () => {
  console.log("Connection Success");
});
