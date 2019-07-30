<template>
  <section>
    <!-- CARD 1 -->
    <div class="card card-1 text-center">
      <div class="py-3 px-2">
        <h2 class="title">درصد تکمیل دوره</h2>
        <div>
          <pie-chart
            style="height: 100%"
            :chart-data="pieChart1.chartData"
            :extra-options="pieChart1.extraOptions"
            :height="120"
          ></pie-chart>
        </div>
      </div>
    </div>

    <!-- CARD 2 -->
    <div class="card card-2 text-center">
      <div class="py-3 px-2">
        <h2 class="title">يادگيری فعال</h2>
        <p
          class="subtitle"
        >در حین انجام تکالیف روزمره خود زبان را بیاموزید، تا سریع تر و بهتر یاد بگیرید.</p>
      </div>
    </div>

    <!-- CARD 4 -->
    <div class="card card-4 text-center">
      <div class="py-3 px-2">
        <h2 class="title">استاندارد های اروپا</h2>
        <p
          class="subtitle"
        >سبک و متد های آموزشی اسک آریا متناسب با استاندارد های اروپا طراحی شده است.</p>
      </div>
    </div>

    <!-- CARD 3 -->
    <div class="card card-3 text-center">
      <div class="py-3 px-2">
        <h2 class="title">یادگیری سریع</h2>
        <p
          class="subtitle"
        >ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.</p>
      </div>
    </div>
  </section>
</template>

<script>
import PieChart from 'src/components/Charts/PieChart';

export default {
  components: {
    PieChart
  },
  data() {
    return {
      pieChart1: {
        chartData: {
          labels: [1, 2],
          datasets: [
            {
              label: 'Emails',
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ['#00c09d', '#e2e2e2'],
              borderWidth: 0,
              data: [60, 40]
            }
          ]
        },
        extraOptions: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          cutoutPercentage: 70,
          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: 'nearest',
            intersect: 0,
            position: 'nearest'
          },

          scales: {
            yAxes: [
              {
                display: 0,
                ticks: {
                  display: false
                },
                gridLines: {
                  drawBorder: false,
                  zeroLineColor: 'transparent',
                  color: 'rgba(255,255,255,0.05)'
                }
              }
            ],

            xAxes: [
              {
                display: 0,
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(255,255,255,0.1)',
                  zeroLineColor: 'transparent'
                },
                ticks: {
                  display: false
                }
              }
            ]
          }
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.card-1 {
  background: linear-gradient(180deg, #f44881, #ec454f) !important;
}

.card-2 {
  background: linear-gradient(180deg, #21c8f6, #637bff) !important;
}

.card-3 {
  background: linear-gradient(180deg, #6edcc4, #1aab8b) !important;
}

.card-4 {
  background: linear-gradient(180deg, #8b60ed, #b372bd) !important;
}

.title {
  font-family: IranSansBold;
  font-size: 1.5em;
  color: white !important;
}

.subtitle {
  font-size: 1em;
  color: white !important;
}

@media only screen and (min-device-width: 768px) {
  .title {
    font-size: 1.1em !important;
  }

  .subtitle {
    font-size: 0.85em !important;
  }
}
</style>

