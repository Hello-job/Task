import { Models } from '@rematch/core';
import { userInfo } from './userInfo';
import { uploadFile } from './upload';
import { soketService } from './websoket';
export interface RootModel extends Models<RootModel> {
  userInfo: typeof userInfo;
  uploadFile: typeof uploadFile;
  soketService: typeof soketService;
}
export const models: RootModel = { userInfo, uploadFile, soketService };
