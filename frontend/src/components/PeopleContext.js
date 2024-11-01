import React, { createContext, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  const fetchPeople = () => {
    fetch(`http://localhost:8080/entities`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Server is not working');
        }
        return response.json();
      })
      .then(data => {
        setPeople(data);
      })
      .catch(error => {
        if (error.message === 'Failed to fetch') {
            setError('Network is not working');
        } else {
            setError('Error fetching persons: ' + error.message);
        }
      });
  };

  useEffect(() => {
    fetchPeople();

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/websocket'),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      console.log('WebSocket connected');
      client.subscribe('/topic/newPerson', function (message) {
        const newPerson = JSON.parse(message.body);
        console.log('The new person is:', newPerson);

        setPeople(prevPeople => [...prevPeople, newPerson]);
      });
    };

    // client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <PeopleContext.Provider value={{ people, setPeople, fetchPeople, error }}>
      {children}
    </PeopleContext.Provider>
  );
};