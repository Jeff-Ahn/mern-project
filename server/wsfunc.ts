import Message from './models/messages';
import { v4 as uuid } from 'uuid';
import { CustomWebSocket } from './utilities';

export let clients: CustomWebSocket[] = [];

export const setClients = (newClients: CustomWebSocket[]) => {
  clients = newClients;
};

export const broadCastMessage = (message: any, ws: CustomWebSocket) => {
  const newMessage = new Message({
    email: ws.connectionID,
    message: message.message,
    date: Date.now(),
  });

  newMessage.save();

  // broadcast it to all clients
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    client.send(
      JSON.stringify({
        message: message.message,
        user: ws.connectionID,
        intent: 'chat',
      })
    );
  }
};

export const retrieveAndSendMessages = async (
  ws: CustomWebSocket,
  count: number
) => {
  const messages = await Message.find({}, { email: 1, message: 1 })
    .sort({ date: -1 })
    .limit(count)
    .lean();
  console.log(messages);
  ws.send(
    JSON.stringify({
      intent: 'old-messages',
      data: messages,
    })
  );
};
