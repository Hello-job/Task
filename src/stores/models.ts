import { Models } from '@rematch/core';
import { userInfo } from './userInfo';
import { uploadFile } from './upload';
import { soketService } from './websoket';
import { application } from './application';
export interface RootModel extends Models<RootModel> {
  userInfo: typeof userInfo;
  uploadFile: typeof uploadFile;
  soketService: typeof soketService;
  application: typeof application;
}
export const models: RootModel = {
  userInfo,
  uploadFile,
  soketService,
  application
};
