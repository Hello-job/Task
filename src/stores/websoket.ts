import { createModel } from '@rematch/core';
import { createSessionId, getSessionRecord } from '@/services/api';
import $http from '@/services/http';

import { RootModel } from './models';

interface soketService {
  ws: WebSocket | null;
  connection: boolean;
  chatMsgList: any[];
}

export const soketService = createModel<RootModel>()({
  state: {
    ws: null,
    connection: false,
    chatMsgList: []
  } as soketService,
  reducers: {
    setWs(state, payload: WebSocket) {
      return {
        ...state,
        ws: payload
      };
    },
    setConnection(state, payload: boolean) {
      return {
        ...state,
        connection: payload
      };
    },
    setChatMsgList(state, payload: any[]) {
      return {
        ...state,
        chatMsgList: payload
      };
    }
  },
  effects: dispatch => ({
    async init(_, rootState) {
      if (rootState.soketService.ws) return;
      const personalInfo = rootState.userInfo.personalInfo;
      const ws = new WebSocket(`ws://localhost:8080?userId=${personalInfo.id}`);
      console.log('>>>>>', rootState.soketService.chatMsgList);
      ws.onopen = () => {
        dispatch.soketService.setConnection(true);
        dispatch.soketService.setWs(ws);
        console.log('>>>>>>websoket连接成功');
      };

      ws.onmessage = msg => {
        console.log('>>>>>>服务端推送消息了', msg.data, rootState.soketService);
        const data = JSON.parse(msg.data);
        switch (data.type) {
          case 'chat':
            dispatch.soketService.setChatMsg(data);
            break;
        }
      };

      ws.onclose = msg => {
        console.log('>>>>>>服务端关闭链接', msg);
      };
    },
    async createChatId(payload) {
      const res = (await $http.post(createSessionId, payload)) as any;
      return res.result;
    },
    async getChatRecord(payload) {
      const res = (await $http.post(getSessionRecord, payload)) as any;
      await dispatch.soketService.setChatMsgList(res.result.data);
    },
    async setChatMsg(state, rootState) {
      const list = rootState.soketService.chatMsgList;
      const chatMsg = state.data;
      list.push(chatMsg);
      dispatch.soketService.setChatMsgList(list);
    }
  })
});
