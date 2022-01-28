<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="handleBack">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue';

export default defineComponent({
  name: 'None',
  setup() {
    const proxy: any = (getCurrentInstance() as ComponentInternalInstance)
      .proxy;

    function handleBack() {
      proxy.$router.replace({
        name: 'Login'
      });
    }

    return {
      handleBack
    };
  }
});
</script>
