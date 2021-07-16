<template>
  <div v-if="loading" class="d-flex justify-content-center loading-page">
    <div class="align-self-center">
      <b-spinner label="Spinning" variant="primary"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading-page {
  z-index: 5000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
}
</style>
