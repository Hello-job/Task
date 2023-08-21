import { createModel } from '@rematch/core';
import { RootModel } from './models';
import $http from '@/services/http';
import { upload } from '@/services/api';

interface uploadFileType {
  file: any;
}

export const uploadFile = createModel<RootModel>()({
  state: {
    fileList: [] as any[]
  },
  reducers: {
    setFileList(state, payload: any[]) {
      return {
        ...state,
        fileList: payload
      };
    }
  },
  effects: () => ({
    async uploadFile(payload: uploadFileType) {
      const res = await $http.upload(upload, payload);
      return res;
    }
  })
});
