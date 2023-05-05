import VritualList from '@/components/virtual-list/indedx';
import faker from 'faker';
import Header from './header';
import type { ColumnType } from './interface';

const ProjectOverView = () => {
  const listData = [];
  for (let i = 0; i < 3; i++) {
    listData.push({ id: i, value: faker.lorem.sentences() });
  }

  const columns: ColumnType[] = [
    {
      name: 'title',
      label: '标题',
      field: {
        type: 'textarea'
      },
      width: 200
    },
    {
      name: 'recordStatus',
      label: '记录状态',
      field: {
        type: 'select'
      },
      width: 200
    },
    {
      name: 'text',
      label: '多行文本',
      field: {
        type: 'textarea'
      },
      width: 300
    }
  ];

  return (
    <div className="w-full h-full bg-skin-bg-base rounded-sm flex flex-col p-5">
      <Header columns={columns} />
      <VritualList
        itemSize={40}
        ListData={listData}
        bufferScale={1}
        columns={columns}></VritualList>
    </div>
  );
};

export default ProjectOverView;
