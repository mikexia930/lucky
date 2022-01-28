<template>
  <div class="lucky">
    <div class="img">
      <a-image :width="200" :src="prizeData && prizeData.img" />
    </div>
    <div class="split">
      <div class="bingo" v-if="luckyStatus.showBingo">
        {{ luckyStatus.bingoMan }}
      </div>
      <div class="progress" v-else-if="luckyStatus.loading">
        <a-progress type="circle" :percent="luckyStatus.percent">
          <template #format="percent">
            <span style="color: red">{{ luckyStatus.seconds }}</span>
          </template>
        </a-progress>
      </div>
      <div class="wait" v-else>
        {{ $t('lucky.waitOpen') }}
      </div>
    </div>
    <div class="btn">
      <a-button
        danger
        type="primary"
        :disabled="luckyStatus.loading"
        @click="handleLucky"
      >
        {{ $t('lucky.lucky') }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  getCurrentInstance,
  ComponentInternalInstance,
  onBeforeMount
} from 'vue';
import StorageLib from '@/utils/StorageLib';
import StorageConfig from '@/config/StorageConfig';
import { useI18n } from 'vue-i18n';
import { forEach, isEmpty } from 'lodash';
import { IPrizeItemData } from '@/config/interface/InterfacePrize';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default defineComponent({
  name: 'Lucky',
  props: {
    prizeData: Object as PropType<IPrizeItemData>,
    itemIndex: Number
  },
  setup(props, context) {
    const proxy: any = (getCurrentInstance() as ComponentInternalInstance)
      .proxy;
    const { t } = useI18n();
    const curPrizeData: any = reactive({ ...props.prizeData });
    let employees: any = ref([]);
    let prizes: any = ref([]);
    let bingo: any = ref([]);

    const luckyStatus = reactive({
      showBingo: false,
      bingoMan: '',
      loading: false,
      percent: 0,
      seconds: 5
    });

    onBeforeMount(() => {
      luckyStatus.showBingo = false;
      luckyStatus.bingoMan = '';

      const bingoManes = StorageLib.get(StorageConfig.bingo);
      if (bingoManes) {
        bingo.value = bingoManes;
      }

      employees.value = StorageLib.get(StorageConfig.employee);
      const storePrize = StorageLib.get(StorageConfig.prize);
      forEach(storePrize, item => {
        if (item.name && item.employees) {
          prizes.value.push(item);
        }
      });
    });

    function handleLucky() {
      if (curPrizeData.number <= 0) {
        proxy.$message.error(t('notice.numberEmpty').toString());
      } else {
        luckyStatus.loading = true;
        luckyStatus.showBingo = false;
        luckyStatus.bingoMan = '';
        openLucky();
        waitOpen();
      }
    }

    function openLucky() {
      const joiners = curPrizeData.employees || [];
      let isNo = true;
      if (!isEmpty(joiners) && joiners.length > 0) {
        const lastMen: any = [];
        forEach(joiners, joiner => {
          if (!bingo.value.includes(joiner)) {
            lastMen.push(joiner);
          }
        });
        let bingoMan = '';
        const lastLength = lastMen.length;
        if (lastLength > 0) {
          isNo = false;
          curPrizeData.number -= 1;
          if (lastLength === 1) {
            bingoMan = lastMen[0];
          } else {
            bingoMan = lastMen[getRandomInt(lastLength)];
          }
          luckyStatus.bingoMan = bingoMan;
          bingo.value.push(bingoMan);

          StorageLib.set(StorageConfig.bingo, bingo.value);

          emitTo('update');
        }
      }
      if (isNo) {
        luckyStatus.bingoMan = t('lucky.noBingo').toString();
      }
    }

    let openIntervalIns: any = null;
    function waitOpen() {
      openIntervalIns = setInterval(() => {
        if (luckyStatus.seconds <= 0) {
          clearTimeout(openIntervalIns);
          openIntervalIns = null;

          luckyStatus.showBingo = true;
          luckyStatus.loading = false;
          luckyStatus.percent = 0;
          luckyStatus.seconds = 5;
        } else {
          luckyStatus.seconds -= 1;
          luckyStatus.percent = ((5 - luckyStatus.seconds) / 5) * 100;
        }
      }, 1000);
    }

    function emitTo(type: string) {
      context.emit('handleLucky', {
        type,
        index: props.itemIndex,
        data: curPrizeData
      });
    }

    return {
      employees,
      prizes,
      handleLucky,
      luckyStatus
    };
  }
});
</script>

<style lang="less" scoped>
.lucky {
  width: 750px;
  box-sizing: border-box;
  padding: 20px;
  .img {
    width: 100%;
    text-align: center;
  }
  .split {
    height: 200px;
    background-color: #f2f2f2;
    text-align: center;
    box-sizing: border-box;
    padding: 10px;
    .wait {
      line-height: 180px;
    }
    .bingo {
      color: #ff0000;
      line-height: 180px;
      font-size: 30px;
    }
    .progress {
      box-sizing: border-box;
      padding-top: 30px;
    }
  }
  .btn {
    height: 40px;
    padding-top: 20px;
    text-align: center;
  }
}
</style>
