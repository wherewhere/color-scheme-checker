<template>
  <fluent-accordion class="settings-expander">
    <fluent-accordion-item class="expander" marker-position="end" :expanded="expanded">
      <div slot="heading">
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
          <slot name="action-content"></slot>
        </SettingsPresenter>
      </div>
      <slot></slot>
    </fluent-accordion-item>
  </fluent-accordion>
</template>

<script lang="ts" setup>
import "@fluentui/web-components/accordion/define.js";
import "@fluentui/web-components/accordion-item/define.js";
import SettingsPresenter from "./SettingsPresenter.vue";

defineProps<{
  expanded?: "true" | "false";
}>();
</script>

<style lang="scss" scoped>
$settings-expander-item-padding-left: 58px;
$settings-expander-item-padding-right: 44px;
$settings-expander-header-padding: var(--spacingVerticalL) 0 var(--spacingVerticalL) var(--spacingHorizontalL);
$settings-expander-item-padding: var(--spacingVerticalS) $settings-expander-item-padding-right var(--spacingVerticalS) $settings-expander-item-padding-left;

.settings-expander {
  fluent-accordion-item.expander {
    max-width: none;
    box-sizing: border-box;
    background: var(--colorNeutralBackground1);
    color: var(--colorNeutralForeground1);
    border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);
    border-radius: var(--borderRadiusMedium);
    transition-duration: var(--durationFaster);
    transition-property: background, border, color;
    transition-timing-function: var(--curveEasyEase);

    &::part(region) {
      border-bottom-left-radius: calc(var(--borderRadiusMedium) - 1px);
      border-bottom-right-radius: calc(var(--borderRadiusMedium) - 1px);
    }

    &::part(heading),
    &::part(button) {
      height: auto;
    }

    &::part(heading) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      $padding: 0.5 * $settings-expander-item-padding-right - 10px;
      padding: 0 $padding 0 0;
      column-gap: calc($padding - var(--spacingHorizontalS));

      &:hover {
        background: var(--colorNeutralBackground1Hover);
      }

      &:active {
        background: var(--colorNeutralBackground1Pressed);
      }
    }

    &::part(button) {
      flex: 1;
    }

    &::part(content) {
      margin: 0;
      border-top: var(--strokeWidthThin) solid var(--colorNeutralStroke1Hover);
    }

    &::slotted(.default-marker-expanded) {
      display: none;
    }
  }

  .presenter {
    padding: $settings-expander-header-padding;
  }

  :deep(div.setting-expander-content-grid) {
    background: var(--colorNeutralBackground1);
    padding: $settings-expander-item-padding;
    transition-duration: var(--durationFaster);
    transition-property: background, border, color;
    transition-timing-function: var(--curveEasyEase);
  }
}
</style>