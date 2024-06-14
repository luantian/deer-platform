import {
  TableProps, TableRowData,
} from "tdesign-vue-next";
import { reactive, ref } from "vue";
import Table from "@/utils/tables/Table";
import ElevatorModel from "@/models/Elevator"
import { IElevator } from "@/utils/interfaces/IElevator";

export default class ElevatorTable extends Table {

  columns: TableProps['columns'] = [
    {
      colKey: 'index',
      title: '序号',
      fixed: 'left'
    },
    {
      colKey: 'brandIdDictText',
      title: '电梯品牌',
    },
    {
      colKey: 'deviceCode',
      title: '电梯注册代码',
    },
    {
      colKey: 'useUnitAddress',
      title: '使用单位位置',
    },
    {
      colKey: 'residentialAreaName',
      title: '小区名称',
    },
    {
      colKey: 'maintenanceUnit',
      title: '维保单位',
    },
    {
      colKey: 'maintenanceStaffs',
      title: '维保人员',
    },
    {
      colKey: 'maintenanceStatusCode_dictText',
      title: '运行状态',
    },
    {
      colKey: 'cameraId_dictText',
      title: '摄像头编码',
    },
    {
      colKey: 'cameraStatus',
      title: '摄像头状态',
    },
    {
      colKey: "operate",
      title: "操作",
      fixed: 'right'
    }
  ];
  pagination: TableProps['pagination'] = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  constructor() {
    super();
  }

  async query(params: IElevator) {
    this.clearFieldIfEmpty(params);
    console.log('params', params);
    const { data } = await ElevatorModel.queryList({
      "column": "createTime",
      "order": "desc",
      "field": "id,,,brandIdDictText,registerCode,useUnitAddress,residentialAreaName,maintenanceUnit,maintenanceStaffs,maintenanceStatusCode_dictText,cameraNo,cameraStatus,action",
      "pageNo": this.pagination?.current,
      "pageSize": this.pagination?.pageSize,
      ...params
    });

    if (data.code == 200) {
      console.log('elevatorList', this.data);
      data.result.records.map((item: IElevator) => {
        this.data?.push(item);
      })
      if (this.pagination) {
        this.pagination.total = Number(data.result.total);
      }
    }

  }
  add() { }
  edit() { }
  delete() { }

}
