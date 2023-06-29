import { Context, createContext } from 'react';
import type { TableRowContextType } from './index';

const TableContentContext = createContext({} as TableRowContextType);

const TableContentContextProvider = TableContentContext.Provider;

export { TableContentContext, TableContentContextProvider };
