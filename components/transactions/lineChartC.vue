<script setup lang="ts">
import {storeToRefs} from 'pinia';
import { Chart } from 'chart.js/auto';

import {useTransactionsStore} from '@/stores/transactions/transactionsStore';

const transactionsStoreInstance = useTransactionsStore();
const {filteredList} = storeToRefs(transactionsStoreInstance);

const myChart = ref<HTMLCanvasElement | null>();
let lineChart: Chart<'line', number[], string> | null = null;

const createLineChart = () => {
  if (myChart.value) {

    const ctx = myChart.value;
    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [], // Inicialmente vazio
        datasets: [{
          label: 'Behavior Transactions',
          data: [65, 69, 7],
          fill: false,
          backgroundColor: [],
          tension: 0.1,
          borderColor: []
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { display: false },
            grid: { color: 'black' }
          },
          x: { grid: { color: 'black' } }
        }
      }
    });

  }
};

/* Update LineChart */
const updateLineChart = ()=>{
  if(lineChart && filteredList.value){
    let allTransactions = [...filteredList.value];
    allTransactions.sort( (a,b)=> Number( new Date(a.transaction_date) ) - Number( new Date(b.transaction_date) ) )

    let totalAmount = 0;
    let datesTransactions: Array<string> = [];
    let amountsTransactions: Array<number> = [];
    let borderColorGraph: Array<string> = [];

    allTransactions.forEach((transaction) => {
      datesTransactions.push(transaction.transaction_date);
      totalAmount += Number(transaction.transaction_amount);
      amountsTransactions.push(totalAmount);

      if(transaction.transaction_type === 'income'){
        borderColorGraph.push('green')
      }else if(transaction.transaction_type === 'expense'){
        borderColorGraph.push('crimson')
      }

    })

    lineChart.data.labels = datesTransactions;
    lineChart.data.datasets[0].data = amountsTransactions;
    lineChart.data.datasets[0].borderColor = borderColorGraph;

    lineChart.update();
  }
};
/* Update LineChart */

watch(filteredList, ()=>{
  updateLineChart();
});

/* LifeCicle Hook: onMounted */
onMounted(() => {
  createLineChart();
  updateLineChart();
});
</script>

<template>
  <div class="container-lineChart">

    <section class="line-chart">
      <div class="chart">
        <canvas ref="myChart"></canvas>
      </div>
    </section>

  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .container-lineChart {
    @apply h-[30rem] w-[50rem] px-2;
  }

  .line-chart {
    @apply h-full w-full flex items-center justify-center;
  }

  .chart {
    @apply h-full w-full flex items-center justify-center;
  }

}

;
</style>