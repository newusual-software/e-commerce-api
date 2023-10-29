"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.routeNotFound = void 0;
function routeNotFound(req, res, next) {
    const error = new Error(`${req.originalUrl} route not found!`);
    res.status(404);
    next(error);
}
exports.routeNotFound = routeNotFound;
function errorHandler(error, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.send(error);
}
exports.errorHandler = errorHandler;
