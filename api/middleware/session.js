require("dotenv").config();
/**
 * @param Session Managemnt.
 */
const accessSession = async(req, res, next) => {
    try {
        if (req.session.views) {
            req.session.views++
            res.setHeader('Content-Type', 'text/html')
            res.write('<p>views: ' + req.session.views + '</p>')
            res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
            res.end()
        }
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    } catch(err) {
        res
        .status(500)
        .json({ message: `Internal Server Error` });
        console.log(err);
    }
};

const verif = async(req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res
        .status(403)
        .json({ message: "Unauthorized. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded.username;
        next();
    } catch (err) {
        return res
        .status(401)
        .json({ message: "Invalid or expired token" });
    };
};

module.exports = { accessSession, verif };