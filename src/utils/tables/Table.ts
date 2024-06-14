
import {
  TableProps,
} from "tdesign-vue-next";

import { ITable } from '@/utils/interfaces/ITable'

export default class Table implements ITable {
  data: TableProps['data'] = [];
  columns: TableProps['columns'] = [];
  addVisible: Boolean = false;
  editVisible: Boolean = false;
  pagination: TableProps['pagination'] = {
    current: 1,
    pageSize: 10,
    total: 0,
  }
  constructor() {

  }

  query(params: any) { }
  add() { }
  edit() { }
  delete() { }

  clearFieldIfEmpty(obj: any) {
    for (let key in obj) {
      if (obj[key] === "") {
        delete obj[key];
      }
    }
  }
}
