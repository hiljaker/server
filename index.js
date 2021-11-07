const express = require('express');
const cors = require('cors');
const app = express()
const port = 1818
const path = require('path');
const multer = require('multer');
const { upload_routes } = require('./src/routes');

app.use(cors())

app.use("/", upload_routes)

app.listen(port, () => {
    console.log(`server berjalan di port ${port}`);
})