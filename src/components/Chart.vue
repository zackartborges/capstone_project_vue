<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  methods: {
    chartConstructor(chartType, chartData, chartOptions) {
      const chartElement = document.querySelector("canvas");
      const chart = new Chart(chartElement, {
        type: chartType,
        data: chartData,
        options: chartOptions,
      });
    },
  },
};
</script>
