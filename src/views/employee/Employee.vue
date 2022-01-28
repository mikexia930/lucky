<template>
  <div class="employee">
    <a-card :title="$t('employee.add')" :bordered="false">
      <div class="list">
        <span :key="`${item}-${index}`" v-for="(item, index) in employees">
          <span>{{ item }}</span>
          <close-outlined
            :style="{ fontSize: '12px' }"
            @click="handleDel(index)"
          />
        </span>
      </div>
      <div class="enter">
        <a-form layout="inline">
          <a-form-item>
            <a-input
              v-model:value="employee"
              :placeholder="$t('employee.name')"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSave">{{
              $t('work.add')
            }}</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  defineComponent,
  getCurrentInstance,
  ref,
  onBeforeMount
} from 'vue';
import StorageLib from '@/utils/StorageLib';
import StorageConfig from '@/config/StorageConfig';
import { useI18n } from 'vue-i18n';
import { CloseOutlined } from '@ant-design/icons-vue';
import { forEach, isEmpty, trim } from 'lodash';

export default defineComponent({
  name: 'Employee',
  components: {
    CloseOutlined
  },
  setup() {
    const proxy: any = (getCurrentInstance() as ComponentInternalInstance)
      .proxy;
    const { t } = useI18n();
    const employee = ref('');
    const employees: any = ref([]);

    onBeforeMount(() => {
      employees.value = StorageLib.get(StorageConfig.employee);
    });

    function handleSave(value: string) {
      const curValue = trim(employee.value);
      if (curValue) {
        if (!employees.value.includes(curValue)) {
          employees.value.push(curValue);
          setStorage();
        }
        employee.value = '';
      } else {
        proxy.$message.error(t('notice.employee').toString());
      }
    }

    function handleDel(index: number) {
      employees.value.splice(index, 1);
      setStorage();
    }

    function setStorage() {
      StorageLib.set(StorageConfig.employee, employees.value);
    }

    return {
      handleSave,
      handleDel,
      employee,
      employees
    };
  }
});
</script>

<style lang="less" scoped>
.employee {
  .list {
    display: flex;
    justify-content: flex-start;
    > span {
      display: flex;
      background-color: #f1f1f1;
      padding: 8px;
      border-radius: 4px;
      align-items: center;
      margin-right: 10px;
      > span {
        margin-right: 6px;
      }
    }
  }
  .enter {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
