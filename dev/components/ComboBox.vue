<template>
  <fluent-dropdown type="combobox" ref="combobox">
    <fluent-listbox>
      <slot></slot>
    </fluent-listbox>
  </fluent-dropdown>
</template>

<script lang="ts" setup>
import "@fluentui/web-components/listbox/define.js";
import "@fluentui/web-components/dropdown/define.js";
import { onMounted, useTemplateRef } from "vue";
import type { Dropdown } from "@fluentui/web-components/dropdown/index.js";

const model = defineModel<string | null>();
const combobox = useTemplateRef<Dropdown>("combobox");

onMounted(() => combobox.value!.addEventListener("change", e => model.value = (e.target as Dropdown).value));
</script>