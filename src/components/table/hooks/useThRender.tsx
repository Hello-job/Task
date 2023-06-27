import ColumnOperation from '../components/column-operation';
import type { operationColumnType } from '@/view/project-overview/interface';
interface addThRenderType {
  type: string;
  onClose: () => void;
  handleColumnsAction: (params: operationColumnType) => void;
}

const useThRender = () => {
  const addThRender = ({
    type,
    onClose,
    handleColumnsAction
  }: addThRenderType) => {
    return (
      <ColumnOperation
        type={type}
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
