import ColumnOperation from '../components/column-operation';

interface addThRenderType {
  type: string;
  onClose: () => void;
}

const useThRender = () => {
  const addThRender = ({ type, onClose }: addThRenderType) => {
    return <ColumnOperation type={type} onClose={onClose} />;
  };

  return {
    addThRender
  };
};

export default useThRender;
