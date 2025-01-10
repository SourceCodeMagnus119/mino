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
}

module.exports =  accessSession;