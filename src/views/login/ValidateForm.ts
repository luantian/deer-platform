import { reactive } from 'vue';
import { MessagePlugin } from "tdesign-vue-next";

import Form from '@/utils/forms/Form';
import LoginModel from "@/models/Login";

export default class IdleForm extends Form {
  constructor() {
    super();

    this.formData = reactive({
      phone: "",
      captcha: "1",
    });

    this.rules = {
      captcha: [
        {
          required: true,
          message: "验证码必填",
          type: "error",
        },
      ],
    };
  }

  async sendCode(userInfo: any) {
    const { data } = await LoginModel.sendCode(userInfo)
    if (data.code == 200) {
      MessagePlugin.success('二维码发送成功')
    }
  }

}
