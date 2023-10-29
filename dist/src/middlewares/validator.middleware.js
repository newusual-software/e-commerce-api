"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidatorM = exports.registerValidatorM = void 0;
const validator_util_1 = require("../utils/validator.util");
function registerValidatorM(req, res, next) {
    const { error, value } = validator_util_1.registerVal.validate(req.body);
    if (error) {
        return res.status(422).send({ message: error.details[0].message });
    }
    req.body = value;
    next();
}
exports.registerValidatorM = registerValidatorM;
function loginValidatorM(req, res, next) {
    const { error, value } = validator_util_1.loginValidator.validate(req.body);
    if (error) {
        return res.status(422).send({ message: error.details[0].message });
    }
    req.body = value;
    next();
}
exports.loginValidatorM = loginValidatorM;
