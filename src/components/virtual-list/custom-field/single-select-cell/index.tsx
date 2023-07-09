import { Popover } from 'antd';
import Cell from '../cell';
import type { ColumnType } from '@/view/project-overview/interface';
interface SingleSelectType {
  column: ColumnType;
}

const SingleSelect = ({ column }: SingleSelectType) => {
  const content = () => {
    return <h1>你好</h1>;
  };
  return (
    <Cell>
      <Popover trigger="click" placement="bottom" content={content()}>
        <span>{column.title}</span>
      </Popover>
    </Cell>
  );
};

export default SingleSelect;
