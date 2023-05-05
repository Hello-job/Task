class SoketService {
  static instance: SoketService | null = null;
  static get Instance() {
    if (!this.instance) {
      this.instance = new SoketService();
    }
    return this.instance;
  }

  ws: WebSocket | null = null;

  // 连接成功
  successWs = false;

  connect() {
    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onopen = () => {
      this.successWs = true;
      console.log('>>>>>服务链接成功了');
    };

    this.ws.onmessage = (msg: any) => {
      console.log('>>>>>>>客户端收到了消息', msg.data);
    };

    this.ws.onerror = () => {
      console.log('>>>>>>>websoket链接错误');
    };

    this.ws.onclose = () => {
      this.successWs = false;
      console.log('>>>>>>websoket链接关闭了');
    };
  }

  send(data: any) {
    if (this.successWs) {
      this.ws?.send(data);
    } else {
      setTimeout(() => {
        this.send(data);
      }, 500);
    }
  }

  close() {
    this.ws?.close();
  }

  reconnection() {
    if (!this.successWs) {
      setTimeout(() => {
        this.connect();
        if (this.successWs) {
          this.reconnection();
        }
      }, 500);
    } else {
      console.log('>>>>>.重新连接成功');
    }
  }
}

export default SoketService;
