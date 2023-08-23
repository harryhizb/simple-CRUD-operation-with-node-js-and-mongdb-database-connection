const express = require("express");
const routes = require("./routes/routes");

const app = express();
const port = 4000;

app.use(express.json());
app.use(routes);

async function startServer() {
  try {
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
