import {
  MessagePlugin,
  FormProps,
} from "tdesign-vue-next";

interface IForm {
  formData: FormProps["data"],
  rules: FormProps["rules"],
  onSubmit: FormProps["onSubmit"],
  onValidate: FormProps["onValidate"],
  onReset: FormProps["onReset"],
}

export default class Form implements IForm {

  formData: FormProps["data"];
  rules: FormProps["rules"];

  constructor() {

  }

  onSubmit: FormProps["onSubmit"] = ({ validateResult, firstError, e }) => {
    e && e.preventDefault();
    if (validateResult === true) {
      MessagePlugin.success("提交成功");
      console.log('formData', this.formData);
    } else {
      console.log("Validate Errors: ", firstError, validateResult);
    }
  }

  onValidate: FormProps["onValidate"] = ({
    validateResult,
    firstError,
  }) => {
    if (validateResult === true) {
      console.log("Validate Success");
    } else {
      console.log("Validate Errors: ", firstError, validateResult);
    }
  };

  onReset: FormProps["onReset"] = () => {
    MessagePlugin.success("重置成功");
  };
}