<template>
  <div class="settings-presenter" v-fill-color="fillColor">
    <div class="header-root">
      <div class="icon-holder" v-check-solt="$slots.icon">
        <slot name="icon"></slot>
      </div>
      <div class="header-panel">
        <span v-check-solt="$slots.header">
          <slot name="header"></slot>
        </span>
        <span class="description" v-check-solt="$slots.description">
          <slot name="description"></slot>
        </span>
      </div>
    </div>
    <div class="content-presenter" v-check-solt="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { Swatch } from "@fluentui/web-components";
import type { DesignToken } from "@microsoft/fast-foundation";
import checkSolt from "../directives/checkSolt";
import fillColor from "../directives/fillColor";
export default {
  name: "SettingsPresenter",
  directives: {
    checkSolt,
    fillColor
  },
  data() {
    return {
      fillColor: this.injectFillColor as any as DesignToken<Swatch>
    }
  },
  inject: {
    injectFillColor: {
      from: "fillColor",
      default: undefined as DesignToken<Swatch> | undefined
    }
  }
};
</script>

<style scoped>
.settings-presenter {
  --settings-card-description-font-size: var(--type-ramp-minus-1-font-size);
  --settings-card-header-icon-max-size: var(--type-ramp-base-line-height);
  --settings-card-header-icon-margin: 0 calc((var(--base-horizontal-spacing-multiplier) * 6 + var(--design-unit) * 0.5) * 1px) 0 calc((var(--base-horizontal-spacing-multiplier) * 6 - var(--design-unit) * 4) * 1px);
  --settings-card-vertical-header-content-spacing: calc(var(--design-unit) * 2px) 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-presenter :deep(div.header-root) {
  display: flex;
  align-items: center;
  flex: 1;
}

.settings-presenter :deep(div.icon-holder) {
  max-width: var(--settings-card-header-icon-max-size);
  max-height: var(--settings-card-header-icon-max-size);
  margin: var(--settings-card-header-icon-margin);
  fill: currentColor;
}

.settings-presenter :deep(div.header-panel) {
  display: flex;
  flex-direction: column;
  margin: 0 calc(var(--design-unit) * 6px) 0 0;
}

.settings-presenter :deep(span.description) {
  font-size: var(--settings-card-description-font-size);
  color: var(--neutral-fill-strong-hover);
}

.settings-presenter :deep(div.content-presenter) {
  display: grid;
}

.settings-presenter :deep(a.text-button) {
  font-weight: bold;
  text-decoration: inherit;
}

@media (max-width: 640px) {
  .settings-presenter {
    flex-flow: column;
    justify-content: normal;
    align-items: normal;
  }

  .settings-presenter :deep(div.header-panel) {
    margin: 0;
  }

  .settings-presenter :deep(div.content-presenter) {
    margin: var(--settings-card-vertical-header-content-spacing);
  }

  .settings-nowarp .settings-presenter {
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  .settings-nowarp .settings-presenter :deep(div.header-panel) {
    margin: 0 calc(var(--design-unit) * 6px) 0 0;
  }

  .settings-nowarp .settings-presenter :deep(div.content-presenter) {
    margin: 0;
  }

  .settings-keepwarp .settings-presenter {
    flex-flow: column;
    justify-content: normal;
    align-items: normal;
  }

  .settings-keepwarp .settings-presenter :deep(div.header-panel) {
    margin: 0;
  }

  .settings-keepwarp .settings-presenter :deep(div.content-presenter) {
    margin: var(--settings-card-vertical-header-content-spacing);
  }
}
</style>