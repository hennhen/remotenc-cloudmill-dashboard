import { useEffect, useState, useRef } from 'react';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const videoOne = useRef<HTMLVideoElement>(null);
  const videoTwo = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState({ x: 0, y: 0, z: 0, a: 0, c: 0 });

  // const { socket } = useContext(SocketContext);

  const peer = useRef<Peer.Instance>();

  const connected = useRef<boolean>();

  const disconnect = useRef<boolean>();

  useEffect(() => {
    peer.current = buildPeer();
    // socket.on('rtc', (signal) => {
    //   peer.current.signal(signal);
    // });

    return () => {
      disconnect.current = true;
      // socket.off('rtc');
      if (peer.current) peer.current.destroy();
    };
  }, []);

  const buildPeer = () => {
    const newPeer = new Peer({
      initiator: true,
      config: {
        iceServers: [
          {
            urls: 'stun:stun.remotenc.com:5349'
          },
          {
            urls: 'turn:turn.remotenc.com:5349',
            username: 'user',
            credential: '12345678'
          }
        ]
      }
    });

    newPeer.on('signal', (data) => {
      // socket.emit('rtc', {
      //   signal: data,
      //   socketID: socket.id
      // });
    });

    newPeer.on('stream', (stream) => {
      if (!videoOne.current || !videoTwo.current) return;
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
      // socket.off('rtc');
      peer.current = buildPeer();
      // socket.on('rtc', (signal) => {
      //   peer.current.signal(signal);
      // });
    });

    return newPeer;
  };

  return { videoOne, videoTwo, data, connected };
};

export { useWebRTC };