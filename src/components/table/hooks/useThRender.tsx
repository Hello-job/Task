import ColumnOperation from '../components/column-operation';
import type { operationColumnType } from '@/view/project-overview/interface';
import type { ColumnType } from '@/stores/project/types';
interface addThRenderType {
  type: string;
  columns: ColumnType[];
  onClose: () => void;
  handleColumnsAction: (params: operationColumnType) => void;
}

const useThRender = () => {
  const addThRender = ({
    type,
    columns,
    onClose,
    handleColumnsAction
  }: addThRenderType) => {
    return (
      <ColumnOperation
        type={type}
        columns={columns}
        onClose={onClose}
        handleColumnsAction={handleColumnsAction}
      />
    );
  };

  return {
    addThRender
  };
};

export default useThRender;
