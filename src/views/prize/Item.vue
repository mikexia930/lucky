<template>
  <a-form layout="vertical">
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="prizeItemData.img" :src="prizeItemData.img" alt="avatar" />
      <div v-else>
        <plus-outlined></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-form-item :label="$t('prize.name')">
      <a-input
        v-model:value="prizeItemData.name"
        :placeholder="$t('prize.name')"
        @change="handleInput"
      />
    </a-form-item>
    <a-form-item :label="$t('prize.number')">
      <a-input-number
        style="width: 100%"
        v-model:value="prizeItemData.number"
        :min="0"
        :max="100"
        @change="handleInputNumber"
      />
    </a-form-item>
    <a-form-item :label="$t('prize.employees')">
      <a-select
        v-model:value="prizeItemData.employees"
        mode="multiple"
        style="width: 100%"
        :options="employees"
        @change="handleEmployeeChange"
      ></a-select>
    </a-form-item>
    <a-form-item>
      <div style="text-align: center">
        <a-button @click="handleDel"> {{ $t('prize.del') }}</a-button>
      </div>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { IPrizeItemData } from '@/config/interface/InterfacePrize';

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default defineComponent({
  name: 'PrizeItem',
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  props: {
    itemData: Object as PropType<IPrizeItemData>,
    itemIndex: Number,
    employees: Object
  },
  setup(props, context) {
    const prizeItemData = reactive({ ...props.itemData });

    function handleEmployeeChange(value: string[]) {
      emitTo('update');
    }

    const beforeUpload = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file)) as string;
      }
      prizeItemData.img = file.url || file.preview;
      emitTo('update');
      return false;
    };

    function handleInput() {
      emitTo('update');
    }

    function handleInputNumber() {
      emitTo('update');
    }

    function handleDel() {
      emitTo('del');
    }

    function emitTo(type: string) {
      context.emit('handleItem', {
        type,
        index: props.itemIndex,
        data: prizeItemData
      });
    }

    return {
      handleDel,
      handleInput,
      handleInputNumber,
      handleEmployeeChange,
      beforeUpload,
      prizeItemData
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
