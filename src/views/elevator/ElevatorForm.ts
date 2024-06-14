import { reactive } from 'vue';
import {
  MessagePlugin,
  FormProps,
} from "tdesign-vue-next";

import Form from '@/utils/forms/Form';
import { ITable } from "@/utils/interfaces/ITable"

import { IElevator } from '@/utils/interfaces/IElevator';

export default class ElevatorForm extends Form {

  formData: IElevator;
  rules:  FormProps['rules'];
  constructor() {
    super();
    this.formData = reactive<IElevator>({
      brandIdDictText: "",
      deviceCode: "",
      cameraId_dictText: "",
      residentialAreaName: "",
      useUnitAddress: "",
      maintenanceUnit: "",
    });

    this.rules = {};
  }

  onSubmit: FormProps["onSubmit"] = ({ validateResult, firstError, e }) => {
    e && e.preventDefault();
    if (validateResult === true) {
      MessagePlugin.success("提交成功");
      this.handleSubmit();
    } else {
      console.log("Validate Errors: ", firstError, validateResult);
    }
  }

  handleSubmit() {
    
  }

  associateTable(table: ITable) {
    this.table = table;
    table.query(this.formData);
  }

}
