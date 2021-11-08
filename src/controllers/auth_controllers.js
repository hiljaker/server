const { connection } = require("../connection");
const { hash, transporter } = require("../helpers");
const { createAuthToken, createVerificationToken } = require("../helpers/token_create");
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

module.exports = {
    signup: async (req, res) => {
        const { email, username, password } = req.body
        const msc = await connection.promise().getConnection()
        try {
            if (!email || !username || !password) {
                throw { message: "isi semua" }
            }
            let sql = `insert into user set ?`
            let dataSignup = {
                email,
                username,
                password: hash(password)
            }
            let [newUser] = await msc.query(sql, dataSignup)
            sql = `select * from user where user_id = ?`
            let [result] = await msc.query(sql, newUser.insertId)
            let verificationTokenData = {
                user_id: result[0].user_id,
                username: result[0].username,
                role: result[0].role
            }
            const verificationToken = createVerificationToken(verificationTokenData)
            msc.release()
            res.set('verification-token', verificationToken)
            let filepath = path.resolve(
                __dirname,
                "../templates/verification_email.html"
            )
            let htmlString = fs.readFileSync(filepath, "utf-8")
            const template = handlebars.compile(htmlString)
            const htmlToEmail = template({
                username: username,
                token: verificationToken
            })
            await transporter.sendMail({
                from: "To Do <hilmawanzaky57@gmail.com>",
                to: "hilmawanzaky57@gmail.com",
                subject: "email verifikasiiii",
                html: htmlToEmail
            })
            return res.status(200).send(result)
        } catch (error) {
            msc.release()
            return res.status(500).send({ message: error.message })
        }
    },
    verifyAccount: async (req, res) => {
        const { user_id } = req.user
        const msc = await connection.promise().getConnection()
        try {
            let sql = `update user set ? where user_id = ?`
            let verified = {
                isVerified: 1
            }
            await msc.query(sql, [verified, user_id])
            sql = `select * from user where user_id = ?`
            let [result] = await msc.query(sql, user_id)
            msc.release()
            return res.status(200).send(result)
        } catch (error) {
            msc.release
            return res.status(500).send({ message: error.message })
        }
    }
};


