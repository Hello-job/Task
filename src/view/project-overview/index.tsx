import { useState } from 'react';
import VritualList from '@/components/virtual-list/indedx';
import Table from '@/components/table';
import type { ColumnType } from './interface';
import { dataSource } from './data';
import type { rowItemType } from './data';
import { Loading } from 'surprisec-react-components';

interface onChangeRow {
  column: ColumnType;
  rowItem: rowItemType;
  value: any;
}

const ProjectOverView = () => {
  const listData = [];
  for (let i = 0; i < 3; i++) {
    listData.push({ id: i, value: '测试数据' });
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
        type: 'select',
        props: {
          options: [
            {
              id: 9,
              value: 1,
              color: '#E1E2E4',
              name: '未开始'
            },
            {
              id: 8,
              value: 2,
              color: '#377AFF',
              name: '进行中'
            },
            {
              id: 10,
              value: 3,
              color: '#45CB7E',
              name: '已完成'
            }
          ]
        }
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
    },
    {
      name: 'text2',
      label: '多行文本',
      field: {
        type: 'textarea'
      },
      width: 300
    }
  ];
  const [visibleList, setVisibleList] = useState(dataSource);

  const onChange = ({ column, rowItem, value }: onChangeRow) => {
    visibleList.find(item => {
      if (item.id === rowItem.id) {
        rowItem[column.name] = value;
      }
    });
    setVisibleList([...visibleList]);
  };

  return (
    <div className="w-full h-full bg-skin-bg-base rounded-sm flex flex-col p-5">
      {/* <VritualList
        itemSize={40}
        ListData={listData}
        bufferScale={1}
        columns={columns}></VritualList> */}
      <Table
        columns={columns}
        visibleList={visibleList}
        onChange={onChange}
        setVisibleList={setVisibleList}
      />
    </div>
  );
};

export default ProjectOverView;
