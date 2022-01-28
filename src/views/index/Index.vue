<template>
  <div class="index">
    <div class="title">{{ subject }}</div>
    <div class="prize">
      <div class="item" :key="index" v-for="(prize, index) in prizes">
        <a-image :width="300" :src="prize.img" />
        <span class="name">{{ prize.name }}</span>
        <span class="number">{{ $t('lucky.number') }}：{{ prize.number }}</span>
        <span>
          <a-button type="primary" danger @click="goLucky(index)">{{
            $t('lucky.lucky')
          }}</a-button>
        </span>
      </div>
    </div>
    <a-modal
      :width="'800px'"
      v-model:visible="prizeModal.visible"
      :title="$t('lucky.lucky')"
      :footer="null"
    >
      <lucky :prize-data="prizeModal.data" @handleLucky="handleLucky" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  ComponentInternalInstance,
  onBeforeMount
} from 'vue';
import StorageLib from '@/utils/StorageLib';
import StorageConfig from '@/config/StorageConfig';
import { useI18n } from 'vue-i18n';
import { forEach } from 'lodash';
import Lucky from './lucky.vue';

export default defineComponent({
  name: 'Index',
  components: {
    Lucky
  },
  setup() {
    const subject = import.meta.env.VITE_APP_SUBJECT;
    const proxy: any = (getCurrentInstance() as ComponentInternalInstance)
      .proxy;
    const { t } = useI18n();

    let employees: any = ref([]);
    let prizes: any = ref([]);

    const prizeModal = reactive({
      visible: false,
      data: {
        img: '',
        name: '',
        number: 0,
        employees: []
      }
    });

    onBeforeMount(() => {
      employees.value = StorageLib.get(StorageConfig.employee);
      const storePrize = StorageLib.get(StorageConfig.prize);
      forEach(storePrize, item => {
        if (item.name && item.employees) {
          prizes.value.push(item);
        }
      });
    });

    function goLucky(index: number) {
      const curPrize = prizes.value[index];
      if (curPrize.number <= 0) {
        proxy.$message.warn(t('notice.numberEmpty').toString());
      } else {
        prizeModal.visible = true;
        prizeModal.data = curPrize;
      }
    }

    function handleLucky(payload: any) {
      const { type, data, index } = payload;
      switch (type) {
        case 'update':
          prizes.value.splice(index, 1, data);
          break;
      }
    }

    return {
      subject,
      employees,
      prizes,
      goLucky,
      prizeModal,
      handleLucky
    };
  }
});
</script>

<style lang="less" scoped>
.index {
  width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: 50px;
  .title {
    width: 100%;
    text-align: center;
    height: 60px;
    font-size: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
  .prize {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .item {
      width: 300px;
      border: 1px solid #f1f1f1;
      margin: 5px;
      border-radius: 4px;
      > span {
        display: block;
        height: 40px;
        text-align: center;
      }
      .name {
        font-size: 16px;
        color: #ff0000;
      }
      .number {
        font-size: 12px;
        color: #c1c1c1;
      }
    }
  }
}
</style>
