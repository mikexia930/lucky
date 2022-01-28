<template>
  <div class="prize">
    <a-card :title="$t('prize.add')" :bordered="false">
      <div class="item" v-for="(item, index) in prizes">
        <prize-item
          :item-data="item"
          :item-index="index"
          :employees="employees"
          @handleItem="handlePrizeItem"
        />
      </div>
      <div class="enter">
        <a-button danger type="primary" @click="handleAdd">
          {{ $t('work.add') }}
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import StorageLib from '@/utils/StorageLib';
import StorageConfig from '@/config/StorageConfig';
import { isEmpty, forEach } from 'lodash';
import PrizeItem from './Item.vue';

export default defineComponent({
  name: 'Prize',
  components: {
    PrizeItem
  },
  setup() {
    const prizes: any = ref([]);
    const employees: any = [];

    onBeforeMount(() => {
      const storeEmp = StorageLib.get(StorageConfig.employee);
      if (!isEmpty(storeEmp)) {
        forEach(storeEmp, item => {
          employees.push({
            value: item,
            label: item
          });
        });
      }
      prizes.value = StorageLib.get(StorageConfig.prize);
    });

    function handleAdd() {
      const item: any = {
        name: '',
        img: '',
        number: 0,
        employees: []
      };
      prizes.value.push(item);
      storageData();
    }

    function handlePrizeItem(payload: any) {
      const { type, index, data } = payload;
      switch (type) {
        case 'update':
          prizes.value[index] = data;
          break;
        case 'del':
          prizes.value.splice(index, 1);
          break;
      }
      storageData();
    }

    function storageData() {
      StorageLib.set(StorageConfig.prize, prizes.value);
    }

    return {
      handleAdd,
      prizes,
      employees,
      handlePrizeItem
    };
  }
});
</script>

<style lang="less" scoped>
.prize {
  .item {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #c1c1c1;
  }
}
</style>
