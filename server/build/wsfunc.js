"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveAndSendMessages = exports.broadCastMessage = exports.setClients = exports.clients = void 0;
const messages_1 = __importDefault(require("./models/messages"));
exports.clients = [];
exports.setClients = (newClients) => {
    exports.clients = newClients;
};
exports.broadCastMessage = (message, ws) => {
    const newMessage = new messages_1.default({
        email: ws.connectionID,
        message: message.message,
        date: Date.now(),
    });
    newMessage.save();
    // broadcast it to all clients
    for (let i = 0; i < exports.clients.length; i++) {
        const client = exports.clients[i];
        client.send(JSON.stringify({
            message: message.message,
            user: ws.connectionID,
            intent: 'chat',
        }));
    }
};
exports.retrieveAndSendMessages = async (ws, count) => {
    const messages = await messages_1.default.find({}, { email: 1, message: 1 })
        .sort({ date: -1 })
        .limit(count)
        .lean();
    console.log(messages);
    ws.send(JSON.stringify({
        intent: 'old-messages',
        data: messages,
    }));
};
