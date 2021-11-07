module.exports = {
    uploadImage: (req, res) => {
        console.log(req.files);
        return res.status(200).send("berhasil!")
    }
};
