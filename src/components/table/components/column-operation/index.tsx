import { useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
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
  const columnOperationRef = useRef<HTMLDivElement>(null);
  const [isViewRange, setIsViewRange] = useState<boolean>(true);
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

  useEffect(() => {
    const rect = columnOperationRef.current?.getBoundingClientRect();
    const isViewRange = rect
      ? rect?.right <= document.documentElement?.clientWidth
      : true;
    setIsViewRange(isViewRange);
  }, []);

  const operOverlay = useMemo(() => {
    return operationWidget[type] ?? <></>;
  }, [type]);

  return (
    <div
      ref={columnOperationRef}
      className={cls(
        'absolute top-[37px]',
        isViewRange ? 'left-0' : 'right-0'
      )}>
      {operOverlay}
    </div>
  );
};

export default ColumnOperation;
