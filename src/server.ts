import app from "./app";
import AppDataSource from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database conected!");
    app.listen(8000, () => {
      console.log("Server running in port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
