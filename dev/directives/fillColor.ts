import { nextTick, toRaw, FunctionDirective } from "vue";
import { fillColor, Swatch } from "@fluentui/web-components";
import type { DesignToken } from "@microsoft/fast-foundation";

const directive: FunctionDirective<HTMLElement, DesignToken<Swatch>> = async (element, binding) => {
  if (element instanceof HTMLElement) {
    if (binding.value !== binding.oldValue) {
      const color = toRaw(binding.value);
      await nextTick();
      if (color) {
        fillColor.setValueFor(element, color.getValueFor(element.parentElement!));
      }
      else {
        fillColor.deleteValueFor(element);
      }
    }
  }
};

export default directive;