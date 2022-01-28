<template>
  <div class="main">
    <div>
      <a-button @click="handleEmployee" type="primary" size="large" danger>
        {{ $t('menu.employee') }}
      </a-button>
    </div>
    <a-button @click="handlePrize" type="primary" size="large">
      {{ $t('menu.prize') }}
    </a-button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue';

export default defineComponent({
  name: 'Main',
  setup() {
    const proxy: any = (getCurrentInstance() as ComponentInternalInstance)
      .proxy;

    function handlePrize() {
      proxy.$router.push({
        name: 'Prize'
      });
    }

    function handleEmployee() {
      proxy.$router.push({
        name: 'Employee'
      });
    }

    return {
      handleEmployee,
      handlePrize
    };
  }
});
</script>

<style lang="less" scoped>
.main {
  width: 230px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-top: 200px;
  justify-content: space-between;
}
</style>
