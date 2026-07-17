<template>
  <div class="settings-card">
    <SettingsPresenter class="presenter">
      <template #icon>
        <slot name="icon"></slot>
      </template>
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #description>
        <slot name="description"></slot>
      </template>
      <slot></slot>
    </SettingsPresenter>
  </div>
</template>

<script lang="ts" setup>
import SettingsPresenter from "./SettingsPresenter.vue";
</script>

<style lang="scss" scoped>
$settings-card-padding: var(--spacingVerticalL) var(--spacingHorizontalL);

.settings-card {
  display: block;
  box-sizing: border-box;
  background: var(--colorNeutralBackground1);
  color: var(--colorNeutralForeground1);
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
  border-radius: var(--borderRadiusMedium);
  transition-duration: var(--durationFaster);
  transition-property: background, border, color;
  transition-timing-function: var(--curveEasyEase);

  .presenter {
    padding: $settings-card-padding;
  }
}
</style>