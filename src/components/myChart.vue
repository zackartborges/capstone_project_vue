<template>
  <div>
    <canvas id="my-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import myPackData from "../pack-data.js";

export default {
  name: "myChart",
  data() {
    return {
      myPackData: myPackData,
    };
  },
  mounted() {
    const ctx = document.getElementById("pack-chart");
    new Chart(ctx, this.myPackData);
  },
};
</script>
