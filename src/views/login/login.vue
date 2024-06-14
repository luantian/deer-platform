<template>
  <div v-if="states.step === Estep.idle">
    <t-form
      ref="form"
      :data="idleForm.formData"
      :rules="idleForm.rules"
      @reset="idleForm.onReset"
      @submit="idleFormSubmit"
    >
      <t-form-item label="用户名" name="username">
        <t-input v-model="idleForm.formData.username"></t-input>
      </t-form-item>

      <t-form-item label="密码" name="password">
        <t-input v-model="idleForm.formData.password" type="password"></t-input>
      </t-form-item>

      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">提交</t-button>
          <!-- <t-button theme="default" variant="base" type="reset">重置</t-button> -->
        </t-space>
      </t-form-item>
    </t-form>
  </div>
  <div v-if="states.step === Estep.validate">
    <t-form
      ref="form"
      :data="validateForm.formData"
      :rules="validateForm.rules"
      @reset="validateForm.onReset"
      @submit="validateSubmit"
    >
      <t-form-item name="phone">
        <t-input v-model="validateForm.formData.phone" disabled=""></t-input>
      </t-form-item>

      <t-form-item name="captcha">
        <t-space>
          <t-input v-model="validateForm.formData.captcha"></t-input>
          <t-button @click="sendCode">获取验证码</t-button>
        </t-space>
      </t-form-item>

      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">登录</t-button>
          <!-- <t-button theme="default" variant="base" type="reset">重置</t-button> -->
        </t-space>
      </t-form-item>
    </t-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { MessagePlugin, FormInstanceFunctions } from "tdesign-vue-next";
import LocalStorageExpires from "@/cache/LocalStorageExpires";

import LoginModel from "@/models/Login";

import IdleForm from "./IdleForm";
import ValidateForm from "./ValidateForm";
import { Estep } from "./Enum";

const form = ref<FormInstanceFunctions>(null);

const states = reactive({
  step: Estep.idle,
  userInfo: null,
});

const idleForm = new IdleForm();
const validateForm = new ValidateForm();

const idleFormSubmit = async ({ validateResult, e }) => {
  e && e.preventDefault();
  if (validateResult) {
    const { data } = await LoginModel.getPhone({
      ...idleForm.formData,
      browserCode: null,
    });

    console.log("data", data);
    if (data.code == 200) {
      states.step = Estep.validate;
      states.userInfo = data.result.sysUser;
      validateForm.formData.phone = states.userInfo.phone;
    }
  }
};

const validateSubmit = async ({ validateResult, e }) => {
  e && e.preventDefault();
  if (validateResult) {
    const { data } = await LoginModel.toLogin({
      ...idleForm.formData,
      ...validateForm.formData,
      browserCode: null,
    });

    console.log("data", data);
    if (data.code == 200) {
      MessagePlugin.success("登录成功");
      LocalStorageExpires.setItem({ name: 'token', value: data.result.token });
      LocalStorageExpires.setItem({ name: 'dict', value: data.result.sysAllDictItems });
      LocalStorageExpires.setItem({ name: 'userInfo', value: data.result.userInfo });
      LocalStorageExpires.setItem({ name: 'browserCode', value: data.result.browserCode });
      LocalStorageExpires.setItem({ name: 'departs', value: data.result.departs });
      LocalStorageExpires.setItem({ name: 'multi_depart', value: data.result.multi_depart });

    }
  }
};

const sendCode = () => {
  validateForm.sendCode(states.userInfo);
};
</script>

<style lang="less" scoped>
</style>
