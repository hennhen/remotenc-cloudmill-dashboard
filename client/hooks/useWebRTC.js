import { useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../context';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const history = useHistory();

  const connected = useRef();
  const peer = useRef();

  const videoOne = useRef();
  const videoTwo = useRef();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return history.push('/');
    peer.current = buildPeer();
    socket.on('video', (signal) => {
      peer.current.signal(signal);
    });

    return () => {
      console.log('peer close');
      socket.off('video');
      return peer.current.destroy();
    };
  }, []);

  const buildPeer = () => {
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
      if (!videoOne.current.srcObject) videoOne.current.srcObject = stream;
      else videoTwo.current.srcObject = stream;
    });

    peer.on('error', (err) => {
      console.error(err.code);
      connected.current = false;
    });

    return peer;
  };

  return [videoOne, videoTwo, connected];
};

export default useWebRTC;
