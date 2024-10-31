<script setup lang="ts">
import { Chart } from 'chart.js/auto';

const myChart = ref<HTMLCanvasElement | null>();
let lineChart: Chart<'line', number[], string> | null = null;

const createLineChart = () => {
  if (myChart.value) {

    const ctx = myChart.value;
    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['teste 1', 'teste 2', 'teste 3'], // Inicialmente vazio
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

/* LifeCicle Hook: onMounted */
onMounted(()=>{
  createLineChart();
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
  .container-lineChart{
    @apply
    h-[30rem]
    w-[50rem]
    px-2;
  }

  .line-chart{
    @apply
    h-full
    w-full
    flex items-center justify-center;
  }

  .chart{
    @apply
    h-full
    w-full
    flex items-center justify-center;
  }

};
</style>