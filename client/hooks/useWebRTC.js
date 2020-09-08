import { useEffect, useState, useRef, useContext } from 'react';
import { SocketContext } from '../context';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const connected = useRef();

  const videoOne = useRef();
  const videoTwo = useRef();
  const [data, setData] = useState({ x: 0, y: 0, z: 0, a: 0, c: 0 });

  const { socket } = useContext(SocketContext);

  const peer = useRef();

  const disconnect = useRef();

  useEffect(() => {
    peer.current = buildPeer();
    socket.on('rtc', (signal) => {
      peer.current.signal(signal);
    });

    return () => {
      disconnect.current = true;
      socket.off('rtc');
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
      socket.emit('rtc', {
        signal: data,
        socketID: socket.id
      });
    });

    newPeer.on('stream', (stream) => {
      connected.current = true;
      if (!videoOne.current.srcObject) videoOne.current.srcObject = stream;
      else videoTwo.current.srcObject = stream;
    });

    newPeer.on('data', (dataString) => {
      const data = JSON.parse(dataString);
      setData(data);
    });

    newPeer.on('error', (err) => {
      console.error(err);
    });

    newPeer.on('close', () => {
      if (disconnect.current) return;
      socket.off('rtc');
      peer.current = buildPeer();
      socket.on('rtc', (signal) => {
        peer.current.signal(signal);
      });
    });

    return newPeer;
  };

  return { videoOne, videoTwo, data, connected };
};

export default useWebRTC;
