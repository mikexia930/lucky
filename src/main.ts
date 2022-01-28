import { createApp } from 'vue';
import i18n from './i18n';
import router from '@/router';
import App from './App.vue';
import 'ant-design-vue/lib/message/style/index.css';
import './assets/css/common.less';
import message from 'ant-design-vue/lib/message';

const app = createApp(App);

app.config.globalProperties.$message = message;

app.use(i18n);
app.use(router);
app.mount('#app');
