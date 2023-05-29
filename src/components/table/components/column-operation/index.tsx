import { useMemo } from 'react';
import FieldSetting from '../field-setting';
import type { ColumnOperationType } from './interface';

const ColumnOperation: React.FC<ColumnOperationType> = ({
  type,
  onClose
}: ColumnOperationType) => {
  const operationProps = {
    onClose
  };
  const operationWidget: Record<string, React.ReactNode> = {
    add: <FieldSetting onClose={onClose} />
  };

  const operOverlay = useMemo(() => {
    return operationWidget[type] ?? <></>;
  }, [type]);

  return <div className=" absolute top-[37px] left-0">{operOverlay}</div>;
};

export default ColumnOperation;
