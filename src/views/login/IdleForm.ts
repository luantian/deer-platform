import { reactive } from 'vue';
import {
  CustomValidator,
} from "tdesign-vue-next";

import Form from '@/utils/forms/Form';

export default class IdleForm extends Form {
  constructor() {
    super();

    this.formData = reactive({
      username: "admin",
      password: "Aa123456.",
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
