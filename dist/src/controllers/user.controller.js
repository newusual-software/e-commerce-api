"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password: pass } = req.body;
            const checkEmail = yield user_model_1.default.findOne({ email });
            if (!checkEmail)
                return res.status(400).send({ message: "Invalid email or password" });
            const checkPassword = yield bcrypt_1.default.compare(checkEmail.password, pass);
            if (!checkPassword)
                return res.status(400).send({ message: "Invalid email or password" });
            const token = jwt.sign({ _id: checkEmail._id, email }, process.env.KEY);
            const _a = checkEmail._doc, { password } = _a, others = __rest(_a, ["password"]);
            return res.status(200).send(Object.assign(Object.assign({}, others), { token }));
        }
        catch (error) {
            next(error);
        }
    });
}
exports.loginUser = loginUser;
function signUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fname, lname, email, password } = req.body;
            const user = yield user_model_1.default.findOne({ email });
            if (user)
                return res.status(400).send({ message: `An account already exit with this ${email} email` });
            const hashPassword = yield bcrypt_1.default.hash(password, 13);
            const saveUser = new user_model_1.default({
                fname,
                lname,
                email,
                password: hashPassword
            });
            if (saveUser) {
                const _a = saveUser._doc, { password } = _a, others = __rest(_a, ["password"]);
                return res.status(201).send(Object.assign({}, others));
            }
            else {
                return res.status(400).send({ message: "An error occured while creating account please try again later" });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.signUser = signUser;
