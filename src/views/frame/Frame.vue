<template>
  <div>
    <div class="header">
      <div class="main" @click="handleMain">
        {{ $t('menu.main') }}
      </div>
      <div class="logout" @click="logout">[{{ $t('work.quit') }}]</div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue';
import StorageLib from '@/utils/StorageLib';
import StorageConfig from '@/config/StorageConfig';

export default defineComponent({
  name: 'Frame',
  beforeRouteUpdate() {
    const token = StorageLib.get(StorageConfig.login);
    if (!token) {
      this.$router.replace({
        name: 'Login'
      });
    }
  },
  setup() {
    const proxy: any = (getCurrentInstance() as ComponentInternalInstance)
      .proxy;
    function logout() {
      StorageLib.remove(StorageConfig.login);
      proxy.$router.replace({
        name: 'Login'
      });
    }

    function handleMain() {
      proxy.$router.push({
        name: 'Main'
      });
    }

    return {
      logout,
      handleMain
    };
  }
});
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #c1c1c1;
  display: flex;
  justify-content: space-between;

  .main {
    padding-left: 30px;
    cursor: pointer;
  }

  .logout {
    padding-right: 30px;
    cursor: pointer;
  }
}
</style>
