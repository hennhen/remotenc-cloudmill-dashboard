import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../context';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const history = useHistory();

  const [connected, setConnected] = useState(false);

  const videoOne = useRef();
  const videoTwo = useRef();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return history.push('/');

    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683'
          },
          {
            urls: 'turn:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683'
          }
        ]
      }
    });

    peer.on('signal', (data) => {
      socket.emit('video', {
        signal: data,
        socketID: socket.id
      });
    });

    peer.on('stream', (stream) => {
      if (videoOne.current) videoOne.current.srcObject = stream;
      if (videoTwo.current) videoTwo.current.srcObject = stream;
    });

    socket.on('video', (signal) => {
      setConnected(true);
      peer.signal(signal);
    });
  }, []);

  return [videoOne, videoTwo, connected];
};

export default useWebRTC;
