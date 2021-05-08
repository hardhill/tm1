<script>
  import {Bar} from 'vue-chartjs'

  export default {
    name: "MyChart",
    extends: Bar,
    mounted() {
      const chartdata = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {

              label: 'Автоматические',
              backgroundColor: '#62bbfd',
              data: [40, 39, 10, 40, 39, 80, 40]
            }
          ]
        },
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              stacked: false,
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
        }
      this.renderChart(chartdata, options)
    }
  }
</script>

<style scoped>

</style>
