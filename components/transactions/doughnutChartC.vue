<script setup lang="ts">
import {storeToRefs} from 'pinia';
import { Chart } from 'chart.js/auto';
import percentualValueC from './percentualValueC.vue'

import { useTransactionsStore } from '@/stores/transactions/transactionsStore';

const transactionsStoreInstance = useTransactionsStore();
const {filteredList} = storeToRefs(transactionsStoreInstance);

const myChart = ref<HTMLCanvasElement | null>(null);
let doughnutChart: Chart<"doughnut", number[], string> | null = null;

const createChart = () => {
  if (myChart.value) {
    const ctx = myChart.value;

    doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          data: [], 
          borderWidth: 0,
          hoverOffset: 5,
          backgroundColor: ['green', 'crimson'],
        }]
      },
      options: {
        responsive: true,
        cutout: 130
      }
    });
  }
};

const updateDoughnutChart = ()=>{
  if(doughnutChart){
    let totalIncome = 0;
    let totalExpense = 0;

    filteredList.value.forEach((transaction)=>{
      if(Number(transaction.transaction_amount) > 0){
        totalIncome += Number(transaction.transaction_amount)
      }else{
        totalExpense += Number(transaction.transaction_amount)
      }
    })

    doughnutChart.data.datasets[0].data = [totalIncome, totalExpense];
    doughnutChart.update();
  }

};

watch(filteredList, ()=>{
  updateDoughnutChart();
})

onMounted(() => {
  createChart();
  updateDoughnutChart();
})
</script>

<template>
  <div class="percentual-value">

    <section class="doughnut-chart">
      <div class="chart">
        <percentualValueC />
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

  .doughnut-chart {
    @apply relative h-[23rem] w-[40rem] flex items-center justify-center;
  }

  .chart {
    @apply h-full w-full flex items-center justify-center;
  }
}
</style>