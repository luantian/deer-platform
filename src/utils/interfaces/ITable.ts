import {
  TableProps,
} from "tdesign-vue-next";

export interface ITable {
  data: TableProps['data'];
  columns: TableProps['columns'];
  // size: TableProps['size'];
  addVisible: Boolean;
  editVisible: Boolean;
  pagination: TableProps['pagination'];
  query(params: any): void;
  add: (params: any) => void;
  edit: (params: any) => void;
  delete: (params: any) => void;
}