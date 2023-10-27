import { useCallback, useMemo } from 'react';
import type { RowDataType } from '@/types';

interface AddRecordProps {
  rowItem: RowDataType;
  rowData: RowDataType;
}

interface Props {
  dataSource: RowDataType[];
  setVisibleList: (data: RowDataType[]) => void;
}

interface ReturnProps {
  addUpRecord: (params: AddRecordProps) => void;
  addDownRecord: (params: AddRecordProps) => void;
  deleteRecord: (params: Pick<AddRecordProps, 'rowItem'>) => void;
}

const useRowOperationFns = ({
  dataSource,
  setVisibleList
}: Props): ReturnProps => {
  /**
   * 添加记录
   * @param param0
   * @returns
   */
  const handleAddRecord = useCallback(
    (parmas: AddRecordProps, callback: (index: number) => number) => {
      const { rowItem, rowData } = parmas;
      const fIndex = dataSource.findIndex(
        (row: RowDataType) => row.id === rowItem.id
      );
      if (~fIndex) {
        const newDataList = dataSource.splice(callback(fIndex), 0, rowData);
        setVisibleList([...newDataList]);
      }
    },
    [dataSource, setVisibleList]
  );

  /**
   * 向上添加记录
   * @param param0
   * @returns
   */
  const addUpRecord = useCallback(
    (parmas: AddRecordProps) => {
      handleAddRecord(parmas, (index: number) => index - 1);
    },
    [handleAddRecord]
  );

  /**
   * 向下添加记录
   * @param param0
   * @returns
   */
  const addDownRecord = useCallback(
    (parmas: AddRecordProps) => {
      handleAddRecord(parmas, (index: number) => index);
    },
    [handleAddRecord]
  );

  /**
   * 删除记录
   */
  const deleteRecord = useCallback(
    (parmas: Pick<AddRecordProps, 'rowItem'>) => {
      const { rowItem } = parmas;
      const fIndex = dataSource.findIndex(
        (row: RowDataType) => row.id === rowItem.id
      );
      if (~fIndex) {
        const newDataList = dataSource.splice(fIndex, 1);
        setVisibleList([...newDataList]);
      }
    },
    [dataSource, setVisibleList]
  );

  return useMemo(
    () => ({ addUpRecord, addDownRecord, deleteRecord }),
    [addUpRecord, addDownRecord, deleteRecord]
  );
};

export type { ReturnProps };

export default useRowOperationFns;
