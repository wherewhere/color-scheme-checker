<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
:deep(h1) {
  font-size: var(--fontSizeBase600);
  line-height: var(--lineHeightBase600);
}

:deep(h2) {
  font-size: var(--fontSizeBase500);
  line-height: var(--lineHeightBase500);
}

:deep(h3) {
  font-size: var(--fontSizeBase400);
  line-height: var(--lineHeightBase400);
}
</style>