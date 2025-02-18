import { useEffect, useRef } from 'react';

const useWebSocket = (url) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [url]);

  return socket.current;
};

export default useWebSocket;