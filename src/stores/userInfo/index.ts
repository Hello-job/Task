import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import $http from '@/services/http';
import { getUserInfo, updateUserInfo, getUserAll } from '@/services/api';
import { Storage } from '@/shared';

interface personalInfoType {
  id: number;
  avatar: string;
  user_name: string;
  sessionId?: string;
}

interface userInfoType {
  personalInfo: personalInfoType;
  memberList: personalInfoType[];
}

const defaultPersonalInfo: personalInfoType = {
  id: 0,
  avatar: '',
  user_name: ''
};

export type { personalInfoType };

export const userInfo = createModel<RootModel>()({
  state: {
    personalInfo: defaultPersonalInfo,
    memberList: []
  } as userInfoType,
  reducers: {
    setUserInfo(state, payload: personalInfoType) {
      return {
        ...state,
        personalInfo: payload
      };
    },
    setMemberList(state, payload) {
      return {
        ...state,
        memberList: payload
      };
    }
  },
  effects: dispatch => ({
    async getUserInfo() {
      const { id } = Storage.local.get('userInfo');
      if (id) {
        const res = (await $http.get(getUserInfo, { id })) as any;
        dispatch.userInfo.setUserInfo(res?.result?.user);
      }
    },
    async update(payload: any, rootState) {
      const personalInfo = rootState.userInfo.personalInfo;
      const params = {
        id: personalInfo.id,
        ...payload
      };
      const res = (await $http.post(updateUserInfo, params)) as any;
      if (res.code === 0) {
        const newPersonalInfo = {
          ...personalInfo,
          avatar: payload.avatar
        };
        dispatch.userInfo.setUserInfo(newPersonalInfo);
      }
      return res;
    },
    async getUserAll() {
      try {
        const res = (await $http.get(getUserAll)) as any;
        if (res.code === 0) {
          dispatch.userInfo.setMemberList(res.result.userList);
        }
      } catch (err) {
        console.log('.>>>>err');
      }
    }
  })
});
