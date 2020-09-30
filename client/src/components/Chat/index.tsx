import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';

type Message = {
  user: string;
  message: string;
  intent: 'chat';
};

const processMessage = (payload: string) => {
  try {
    return JSON.parse(payload);
  } catch (error) {
    return null;
  }
};

const Chat = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [wsRef, setWsRef] = useState<null | WebSocket>(null);

  const history = useHistory();

  const sendMessage = () => {
    if (wsRef?.readyState !== WebSocket.OPEN) {
      // webdocket not connected
      return;
    }
    wsRef.send(JSON.stringify({ message: chatMessage, intent: 'chat' }));
    setChatMessage('');
  };

  useEffect(() => {
    const ws = new WebSocket(
      'ws://localhost:1338/' + localStorage.getItem('token')
    );

    ws.addEventListener('error', () => {
      alert('Please login first');
      history.replace('/login');
    });

    ws.addEventListener('message', (event) => {
      const data = event.data;

      const message: null | Message = processMessage(data);
      if (!message) return;
      console.log(message);
      if (message.intent === 'chat') {
        setChatMessages((oldMessages) => {
          return [...oldMessages, message];
        });
      }
    });

    setWsRef(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>
      <div className='chat-box'>
        {chatMessages.map((message, index) => {
          return (
            <ListItem alignItems='flex-start' key={index}>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary={message.user}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      color='textPrimary'
                    >
                      {message.message}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
        <TextField
          onChange={(e) => setChatMessage(e.target.value)}
          value={chatMessage}
          multiline
          rows={2}
          variant='outlined'
          color='primary'
        />
        <Button variant='outlined' color='primary' onClick={sendMessage}>
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Chat;
