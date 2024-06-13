<template>
  <t-form
    ref="form"
    :data="loginForm.formData"
    :rules="loginForm.rules"
    @reset="loginForm.onReset"
    @submit="loginForm.onSubmit"
  >
    <t-form-item label="用户名" name="username">
      <t-input v-model="loginForm.formData.username"></t-input>
    </t-form-item>

    <t-form-item
      label="密码"
      name="password"
    >
      <t-input v-model="loginForm.formData.password" type="password"></t-input>
    </t-form-item>

    <t-form-item>
      <t-space size="small">
        <t-button theme="primary" type="submit">提交</t-button>
        <!-- <t-button theme="default" variant="base" type="reset">重置</t-button> -->
      </t-space>
    </t-form-item>
  </t-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormInstanceFunctions } from "tdesign-vue-next";

import LoginForm from "@/utils/forms/LoginForm";
import LoginModel from '@/models/Login';

const form = ref<FormInstanceFunctions>(null);

const loginForm = new LoginForm();



</script>

<style lang="less" scoped>
</style>
