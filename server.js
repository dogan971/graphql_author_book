const express = require("express");

const graphqlHTTP = require("express-graphql");
const app = express();

// buraya request gelince graphql function çalışıyor
app.use("/graphql",graphqlHTTP({
    
}))


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Connection Success");
});
