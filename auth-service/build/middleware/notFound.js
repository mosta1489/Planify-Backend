"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (_, res) => {
    res.status(404).send(`Oops! page not found`);
};
exports.notFound = notFound;
//# sourceMappingURL=notFound.js.map