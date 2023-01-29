const express = require("express");
const app = express();
const userPreferences = require("./routes/user-preferences");
const userQueue = require("./routes/user-queue");
require("dotenv").config();

app.use(express.json());
app.use("/user-preferences", userPreferences);
app.use("/user-queue", userQueue);

// Łączymy się z serwerem Redis i „stawiamy” serwer API.
// Do kontaktu z serwerem wykorzystamy bibliotekę IORedis.
const client = require("./config/redisClient");

client.on("error", err => {
    console.error("Error connecting to Redis", err);
    if (err.code === "ECONNREFUSED") {
        // Zapewne serwer Redis-a nie został uruchomiony więc kończymy.
        client.quit();
    }
});
client.on("connect", () => {
    console.log(`Connected to Redis.`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`API server listening at http://localhost:${port}`);
    });
});
