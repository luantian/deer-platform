import {
  MessagePlugin,
  FormProps,
} from "tdesign-vue-next";

import { IForm } from "@/utils/interfaces/IForm";
import { ITable } from "@/utils/interfaces/ITable";
export default class Form implements IForm {

  formData: FormProps["data"];
  rules: FormProps["rules"];
  table?: ITable;

  constructor() {

  }

  onSubmit: FormProps["onSubmit"] = ({ validateResult, firstError, e }) => {
    e && e.preventDefault();
    if (validateResult === true) {
      console.log('formData', this.formData);
    } else {
      console.log("Validate Errors: ", firstError, validateResult);
    }
  }

  onValidate: FormProps["onValidate"] = ({ validateResult }) => validateResult;

  onReset: FormProps["onReset"] = () => {
    MessagePlugin.success("重置成功");
  };
}