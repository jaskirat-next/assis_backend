import jwt from "jsonwebtoken";

export const auth  = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res(401).json({
                msg: "authorization token is required"
            })
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null

        if(!token) {
            return res.status(401).json({
                msg: "invalid authorizaion format "
            })
        }

        const decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next();
    } catch(err) {
        return res.status(401).json({
            msg: "invald or expred token"
        })

        console.error(err)
    }
}