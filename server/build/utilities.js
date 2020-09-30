"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMessage = void 0;
exports.processMessage = (payload) => {
    try {
        return JSON.parse(payload);
    }
    catch (error) {
        return null;
    }
};
