const express = require('express');
const cors = require('cors');
const app = express()
const port = 1818
const bearer = require('express-bearer-token');
const { upload_routes, auth_routes } = require('./src/routes');

app.use(express.json())
app.use(cors({
    exposedHeaders: ["verification-token"]
}))
app.use(bearer())

app.use("/", upload_routes)
app.use("/", auth_routes)

app.listen(port, () => {
    console.log(`server berjalan di port ${port}`);
})