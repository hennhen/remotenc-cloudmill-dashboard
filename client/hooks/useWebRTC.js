import { useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../context';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const history = useHistory();

  const connected = useRef();

  const videoOne = useRef();
  const videoTwo = useRef();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return history.push('/');

    connect();
  }, []);

  const connect = () => {
    const peer = new Peer({
      initiator: true,
      config: {
        iceServers: [
          {
            urls: 'turn:18.163.61.138:3478',
            username: 'admin',
            credential: '12345'
          }
        ]
      }
    });

    peer.on('signal', (data) => {
      if (connected.current) return;
      socket.emit('video', {
        signal: data,
        socketID: socket.id
      });
    });

    peer.on('stream', (stream) => {
      connected.current = true;
      if (videoOne.current) videoOne.current.srcObject = stream;
      if (videoTwo.current) videoTwo.current.srcObject = stream;
    });

    socket.on('video', (signal) => {
      peer.signal(signal);
    });

    peer.on('error', (err) => {
      console.error(err.code);
      connected.current = false;
      peer.destroy();
      connect();
    });

    peer.on('close', () => {
      peer.destroy();
    });
  };

  return [videoOne, videoTwo, connected];
};

export default useWebRTC;
