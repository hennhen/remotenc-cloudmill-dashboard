import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../context';
import Peer from 'simple-peer';

const useWebRTC = () => {
  const history = useHistory();

  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const videoOne = useRef();
  const videoTwo = useRef();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return history.push('/');

    const connectVideo = async () => {
      const webcamStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      setStream(webcamStream);
      if (videoOne.current) {
        videoOne.current.srcObject = webcamStream;
      }
    };

    socket.emit('webrtc', { hello: 'hello' });

    socket.on('allUsers', (users) => {
      delete users[socket.id];
      setUsers(users);
    });

    socket.on('hey', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    connectVideo();
  }, []);

  const callPeer = (id) => {
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
      },
      stream: stream
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: socket.id
      });
    });

    peer.on('stream', (stream) => {
      if (videoTwo.current) {
        videoTwo.current.srcObject = stream;
      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    });
    peer.on('signal', (data) => {
      socket.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', (stream) => {
      videoTwo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  };

  return [
    users,
    videoOne,
    videoTwo,
    stream,
    callAccepted,
    receivingCall,
    callPeer,
    acceptCall
  ];
};

export default useWebRTC;
