<template>
  <div class="login f">
    <a-form
      style="width: 100%"
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        :label="$t('login.username')"
        name="username"
        :rules="[{ required: true, message: $t('notice.username') }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item
        :label="$t('login.password')"
        name="password"
        :rules="[{ required: true, message: $t('notice.password') }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 12 }">
        <a-button type="primary" html-type="submit">
          {{ $t('login.login') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue';
import StorageLib from '@/utils/StorageLib';
import StorageConfig from '@/config/StorageConfig';
import { useI18n } from 'vue-i18n';
import { getUnix } from '@/utils/DateLib';

export default defineComponent({
  name: 'Login',
  setup() {
    const proxy: any = (getCurrentInstance() as ComponentInternalInstance)
      .proxy;
    const { t } = useI18n();
    const formState = reactive({
      username: '',
      password: ''
    });
    const onFinish = (values: any) => {
      doLogin();
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    function doLogin() {
      const curUsername = import.meta.env.VITE_APP_HTTP_USERNAME;
      const curPassword = import.meta.env.VITE_APP_HTTP_PASSWORD;
      if (
        formState.username === curUsername &&
        formState.password === curPassword
      ) {
        StorageLib.set(StorageConfig.login, getUnix());
        proxy.$router.replace({
          name: 'Main'
        });
      } else {
        StorageLib.remove(StorageConfig.login);
        proxy.$message.error(t('notice.loginErr').toString());
      }
    }
    return {
      formState,
      onFinish,
      onFinishFailed
    };
  }
});
</script>

<style lang="less" scoped>
.login {
  width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-top: 200px;
}
</style>
