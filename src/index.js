import { app } from "./app.js";
import DBconnect from "./db/db_connection.js";
import { configDotenv } from "dotenv";

configDotenv({
    path: "./.env"
})

DBconnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`Database connection is failed!! : `, err);
        throw err
    })