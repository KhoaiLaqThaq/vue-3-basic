<template>
  <div id="id">
    <Header />

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/views/common/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header
  }
});
</script>
