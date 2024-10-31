<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import percentualValueC from './percentualValueC.vue'

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
          data: [10, 2],  // Inicializando com valores padrão
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

onMounted(() => {
  createChart();
})
</script>

<template>
  <div class="percentual-value">

    <section class="doughnut-chart">
      <div class="chart">
        <percentualValueC/>
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