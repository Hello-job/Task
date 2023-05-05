import { ReactElement } from 'react';

interface RouterItemMetaType {
  side?: boolean;
  name?: string;
}

interface RouterItemType {
  path: string;
  element: ReactElement<any, any>;
  meta?: RouterItemMetaType;
}

export type { RouterItemType, RouterItemMetaType };
