import { AlertContext } from '../context';

import { useEffect, useState, useRef, useContext } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

const useWebRTC = (ip: string) => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0, a: 0, c: 0 });

  const videoOne = useRef<HTMLVideoElement>(null);
  const videoTwo = useRef<HTMLVideoElement>(null);
  const socket = useRef<any>(null);
  const peer = useRef<Peer.Instance>();
  const connected = useRef<boolean>();
  const disconnect = useRef<boolean>();

  const { setAlert } = useContext(AlertContext);

  const history = useHistory();

  useEffect(() => {
    const connectSocket = async () => {
      try {
        socket.current = await io(ip);
        socket.current.on('connect', () => {
          peer.current = buildPeer();
        });
        socket.current.on('rtc', (signal: string) => {
          if (peer.current) peer.current.signal(signal);
        });
      } catch (err) {
        setAlert({
          type: 'error',
          message: 'Unable to connect to server, please come back later.'
        });
        history.push('/jobs');
      }
    };

    connectSocket();

    return () => {
      disconnect.current = true;
      socket.current.close();
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

    newPeer.on('signal', (signal: string) => {
      socket.current.emit('rtc', signal);
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
      socket.current.off('rtc');
      peer.current = buildPeer();
      socket.current.on('rtc', (signal: string) => {
        if (peer.current) peer.current.signal(signal);
      });
    });

    return newPeer;
  };

  return { videoOne, videoTwo, data, connected };
};

export { useWebRTC };
