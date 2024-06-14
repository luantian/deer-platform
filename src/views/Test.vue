<template>
  <div>
    <t-form
      ref="form"
      :data="elevatorForm.formData"
      :rules="elevatorForm.rules"
      layout="inline"
      @reset="elevatorForm.onReset"
      @submit="elevatorForm.onSubmit"
    >
      <t-form-item v-for="(item, index) in conditions" :key="item" :label="item" :name="item">
        <t-input v-model="elevatorForm.formData[item]"></t-input>
      </t-form-item>
      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">提交</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
        </t-space>
      </t-form-item>
    </t-form>

    <t-table
      row-key="index"
      :data="elevatorTable.data"
      :columns="elevatorTable.columns"
      :pagination="elevatorTable.pagination"
      lazy-load
    >
      <template #operate>
        <t-space>
          <t-button size="small">查看</t-button>
          <t-button size="small">编辑</t-button>
          <t-button size="small">删除</t-button>
        </t-space>
      </template>
    </t-table>
  </div>
</template>

<script lang="tsx" setup>
import { ref, reactive } from "vue";

import ElevatorTable from "@/views/elevator/ElevatorTable";
import ElevatorForm from "@/views/elevator/ElevatorForm";

const elevatorTable = new ElevatorTable();
const elevatorForm = new ElevatorForm();

const conditions = reactive(Object.keys(elevatorForm.formData));

elevatorForm.associateTable(elevatorTable);

</script>
