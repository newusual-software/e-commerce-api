"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVal = exports.loginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const loginValidator = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.loginValidator = loginValidator;
const registerVal = joi_1.default.object().keys({
    fname: joi_1.default.string().required(),
    lname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.registerVal = registerVal;
