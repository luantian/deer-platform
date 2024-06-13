import { reactive } from 'vue';
import {
  MessagePlugin,
  FormProps,
  CustomValidator,
} from "tdesign-vue-next";

import Form from './Form';
import LoginModel from "@/models/Login"

export default class LoginForm extends Form {
  
  constructor() {
    super();

    this.formData = reactive({
      username: "",
      password: "",
    });

    this.rules = {
      username: [
        {
          required: true,
          message: "姓名必填",
          type: "error",
        },
        {
          min: 2,
          message: "至少需要两个字",
          type: "error",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "密码必填",
          type: "error",
        },
        {
          validator: this.passwordValidator,
        },
      ],
    };
  }

  onSubmit: FormProps["onSubmit"] = ({ validateResult, firstError, e }) => {
    e && e.preventDefault();
    if (validateResult === true) {
      MessagePlugin.success("提交成功");
      console.log('formData', this.formData);

      LoginModel.getPhone({
        ...this.formData,
        browserCode: null
      });

    } else {
      console.log("Validate Errors: ", firstError, validateResult);
    }
  }

  passwordValidator: CustomValidator = (val) => {
    if (val.length > 0 && val.length <= 2) {
      return {
        result: false,
        message: "太简单了！再开动一下你的小脑筋吧！",
        type: "error",
      };
    }
    if (val.length > 2 && val.length < 4) {
      return {
        result: false,
        message: "还差一点点，就是一个完美的密码了！",
        type: "warning",
      };
    }
    return {
      result: true,
      message: "太强了，你确定自己记得住吗！",
      type: "success",
    };
  }


}
