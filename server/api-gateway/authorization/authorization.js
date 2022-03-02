const asyncHandler = require("../middleware/async");
const dotenv = require("dotenv");

const {SUCCESS, BAD_REQUEST} = require("../common/constants/statusCodes");

const {createTokens, createVideoToken} = require("./token");
const crypto = require("crypto");
const {getEmployeeWithUsernameService} = require("../serviceCallers/employee");
const {SECRET_KEY} = require("../common/constants/secretKeys");
const {ADMIN} = require("../common/constants/roles");

dotenv.config();

exports.admin = {
    username: "admin",
    password: "L8+pA3KY2q+phWTU9CC2P+jx0T8QSul+XrHGOZeNIFE="
}

exports.loginController = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    const hashed_password = crypto.createHash("sha256", SECRET_KEY).update(password, "binary").digest("base64");

    if (username === exports.admin.username && hashed_password === exports.admin.password) {
        const accessToken = createTokens({username: "admin", id: -1});
        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: true,
            secure: false
        });
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Expose-Headers', '*')
        res.setHeader('Access-Control-Allow-Headers', '*');
        return res.status(SUCCESS).json({username: ADMIN, id: -1, role: ADMIN});
    }

    const {employee} = await getEmployeeWithUsernameService({username});

    if (employee == null) {
        return res.status(BAD_REQUEST).json({error: "There is not any employee with given credentials."});
    }

    if (hashed_password === employee.password) {
        const accessToken = createTokens(employee);
        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: true,
            secure: false
        });
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Expose-Headers', '*')
        res.setHeader('Access-Control-Allow-Headers', '*');
        return res.status(SUCCESS).json(employee);
    } else {
        return res.status(BAD_REQUEST).json({error: "Wrong username and password combination"});
    }
});

exports.videoTokenController = asyncHandler(async (req, res) => {
    const videoId = req.body.videoId;
    const videoToken = createVideoToken({videoId : videoId, id: req.id});
    res.status(SUCCESS).json({token: videoToken});
});

exports.logoutController = asyncHandler(async (req, res) => {
    req.cookies["access-token"] = null;
    console.log(SUCCESS);
    res.status(SUCCESS).join({err: "Logout Successful"});
    console.log(res);
});