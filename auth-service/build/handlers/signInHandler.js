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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInHandler = void 0;
const datastore_1 = require("../datastore");
const help = __importStar(require("../helpers"));
const cache_1 = require("../cache");
const signInHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    // ---------------- check if all field is existing ----------------
    if (!email || !password) {
        return res.status(400).send({ error: help.ERRORS.WRONG_LOGIN });
    }
    // ---------------- check if all inputs is valid ----------------
    const notValidMessage = help.notValid({ email }, { password });
    if (notValidMessage) {
        return res.status(400).send({ error: notValidMessage });
    }
    // -------------- get user from db -------------------------
    let existing;
    try {
        existing = yield datastore_1.DB.getUserByEmail(email);
    }
    catch (error) {
        return next(error);
    }
    if (!existing) {
        return res.status(403).send({ error: help.ERRORS.WRONG_LOGIN });
    }
    // ---------- check if password is correct or not ------------
    const isMatch = yield help.comparePassword(password, existing.password);
    if (!existing || !isMatch) {
        return res.status(403).send({ error: help.ERRORS.WRONG_LOGIN });
    }
    // ignore password in response "type.UserRes = Omit<type.User, 'password'>"
    const { password: _ } = existing, user = __rest(existing, ["password"]);
    // create token without expire date
    const jwt = help.createToken({
        userId: existing.id,
        verified: existing.verified,
    });
    // create date for cache
    const username = existing.firstname + " " + existing.lastname;
    const cacheUser = Object.assign(Object.assign({}, user), { user_token: jwt });
    // cache user data
    yield cache_1.cache
        .cacheUser(existing.id, cacheUser)
        .then(() => {
        console.log("user cached successfully ... ");
    })
        .catch((err) => {
        console.log("error in caching user", err);
        next(err);
    });
    return res.status(200).send({ user, jwt });
});
exports.signInHandler = signInHandler;
//# sourceMappingURL=signInHandler.js.map