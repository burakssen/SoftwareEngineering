const {sign, verify, decode} = require("jsonwebtoken");
const {BAD_REQUEST} = require("../common/constants/statusCodes");
const {JWT_SECRET_KEY} = require("../common/constants/secretKeys");
const {getEmployeeService} = require("../serviceCallers/user");
const {ADMIN, EMPLOYEE, MANAGER} = require("../common/constants/roles");

exports.createTokens = (user) => {
    return sign(
        {username: user.username, id: user.id, role: user.isManager ? MANAGER : EMPLOYEE},
        JWT_SECRET_KEY
    );
};

exports.validateToken = async (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
        return res.status(BAD_REQUEST).json({error: "User not Authenticated!"});
    try {
        if (verify(accessToken, JWT_SECRET_KEY)) {
            const token = decode(accessToken, JWT_SECRET_KEY);

            req.id = token.id;
            if (token.id === -1) {
                req.role = ADMIN;
                req.username = "admin";
                const employee = {username: "admin", id: -1}
                res.setHeader('Access-Control-Allow-Credentials', true);
                res.setHeader('Access-Control-Expose-Headers', '*')
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.cookie("access-token", exports.createTokens(employee), {
                    maxAge: 60 * 60 * 24 * 1000,
                    httpOnly: true,
                    secure: false
                });
            } else {
                const {employee} = await getEmployeeService({id: token.id});
                if (!employee) {
                    return res.status(BAD_REQUEST).json({error: "User is not exist!"});
                }
                req.role = employee.isManager ? MANAGER : EMPLOYEE;
                req.username = employee.username;

                res.setHeader('Access-Control-Allow-Credentials', true);
                res.setHeader('Access-Control-Expose-Headers', '*')
                res.setHeader('Access-Control-Allow-Headers', '*');

                res.cookie("access-token", exports.createTokens(employee), {
                    maxAge: 60 * 60 * 24 * 1000,
                    httpOnly: true,
                    secure: false
                });
            }

            req.authenticated = true;
            return next();
        } else {
            return res.status(BAD_REQUEST).json({error: "Invalid token!"});
        }
    } catch (err) {
        return res.status(BAD_REQUEST).json({error: err});
    }
};
