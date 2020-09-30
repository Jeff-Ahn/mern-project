import React, { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:1338');
    ws.addEventListener(
      'open',
      () => {
        ws.send(JSON.stringify({ status: 'ok' }));
      },
      { once: true }
    );
  }, []);
  return <div>chat app</div>;
};

export default Chat;
