import { useEffect, useRef, useContext } from 'react';
import { SocketContext } from '../context';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const connected = useRef();

  const videoOne = useRef();
  const videoTwo = useRef();

  const { socket } = useContext(SocketContext);

  const peer = useRef();

  useEffect(() => {
    peer.current = buildPeer();
    socket.on('video', (signal) => {
      peer.current.signal(signal);
    });

    return () => {
      socket.off('video');
      peer.current.destroy();
    };
  }, []);

  const buildPeer = () => {
    const newPeer = new Peer({
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

    newPeer.on('signal', (data) => {
      socket.emit('video', {
        signal: data,
        socketID: socket.id
      });
    });

    newPeer.on('stream', (stream) => {
      connected.current = true;
      if (!videoOne.current.srcObject) videoOne.current.srcObject = stream;
      else videoTwo.current.srcObject = stream;
    });

    newPeer.on('close', () => {
      socket.off('video');
      peer.current = buildPeer();
      socket.on('video', (signal) => {
        peer.current.signal(signal);
      });
    });

    return newPeer;
  };

  return [videoOne, videoTwo, connected];
};

export default useWebRTC;
