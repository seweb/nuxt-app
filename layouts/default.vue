<template>
  <main class="main">
    <aside class="sidebar"></aside>
    <div class="content">
      <nuxt />
    </div>
  </main>
</template>

<style lang="scss">
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-x: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.main {
  display: flex;

  @include display-less(big) {
    flex-direction: column;
  }
}

.sidebar {
  width: 270px;
  background: #F9FAFB;
  min-height: 100vh;
  @include display-less(big) {
    min-height: auto;
    height: 200px;
    width: 100%;
  }
  @include display-less(tablet) {
    height: 70px;
  }
}

.content {
  padding: 70px 60px;
  width: calc(100% - 270px);
  @include display-less(big) {
    width: 100%;
  }
  @include display-less(tablet) {
    padding: 20px;
  }
}

</style>
