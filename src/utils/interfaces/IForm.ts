import {
  FormProps,
} from "tdesign-vue-next";

import { ITable } from '@/utils/interfaces/ITable'

export interface IForm {
  formData: FormProps["data"],
  rules: FormProps["rules"],
  onSubmit: FormProps["onSubmit"],
  onValidate: FormProps["onValidate"],
  onReset: FormProps["onReset"],
  table?: ITable,
}
