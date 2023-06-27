import { useMemo } from 'react';
import FieldSetting from '../field-setting';
import type { operationColumnType } from '@/view/project-overview/interface';

interface ColumnOperationType {
  type: string;
  onClose: () => void;
  handleColumnsAction: (params: operationColumnType) => void;
}

const ColumnOperation: React.FC<ColumnOperationType> = ({
  type,
  onClose,
  handleColumnsAction
}: ColumnOperationType) => {
  const operationProps = {
    onClose
  };
  const operationWidget: Record<string, React.ReactNode> = {
    add: (
      <FieldSetting
        onClose={onClose}
        handleColumnsAction={handleColumnsAction}
      />
    )
  };

  const operOverlay = useMemo(() => {
    return operationWidget[type] ?? <></>;
  }, [type]);

  return <div className=" absolute top-[37px] left-0">{operOverlay}</div>;
};

export default ColumnOperation;
