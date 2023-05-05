import React, { useState, useEffect } from 'react';
import SoketService from '@/shared/Websoket';

const useWebSocketTest = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // 创建WebSocket连接
    const WebSocket = SoketService.Instance;
    WebSocket.connect();
    const { ws } = WebSocket;
    setWs(ws);

    // // 处理WebSocket连接
    ws?.addEventListener('open', event => {
      console.log('WebSocket连接已建立');
    });

    // 处理WebSocket消息
    ws?.addEventListener('message', event => {
      console.log('收到WebSocket消息：', event.data);
      setMessages(prevMessages => [...prevMessages, event.data]);
    });

    // 关闭WebSocket连接
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  return { messages, ws };
};

export default useWebSocketTest;
