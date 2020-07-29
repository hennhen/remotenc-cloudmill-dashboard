import { useEffect, useRef, useContext } from 'react';
import { SocketContext } from '../context';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const connected = useRef();

  const videoOne = useRef();
  const videoTwo = useRef();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const peer = buildPeer();
    socket.on('video', (signal) => {
      peer.signal(signal);
    });

    return () => {
      socket.off('video');
      peer.destroy();
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
