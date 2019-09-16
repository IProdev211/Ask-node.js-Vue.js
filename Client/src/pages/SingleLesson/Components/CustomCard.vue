<template>
  <section>
    <!-- CARD 1 -->
    <div class="card card-1 text-center" v-if="enrolled">
      <div class="py-3 px-2">
        <h2 class="title">درصد تکمیل دوره</h2>
        <div>
          <pie-chart
            style="height: 100%"
            :chart-data="pieChart1.chartData"
            :extra-options="pieChart1.extraOptions"
            :height="120"
            ref="chart"
            :key="done"
          ></pie-chart>
          <p class="text-center text-white mt-3 mb-0 percent-text">{{ Number(done) }} %</p>
        </div>
      </div>
    </div>

    <!-- CARD 2 -->
    <div class="card card-2 text-center">
      <div class="py-3 px-3">
        <h2 class="title">يادگيری فعال</h2>
        <p
          class="subtitle"
        >در حین انجام تکالیف روزمره خود زبان را بیاموزید، تا سریع تر و بهتر یاد بگیرید.</p>
      </div>
    </div>

    <!-- CARD 4 -->
    <div class="card card-4 text-center">
      <div class="py-3 px-3">
        <h2 class="title">استاندارد های اروپا</h2>
        <p
          class="subtitle"
        >سبک و متد های آموزشی اسک آریا متناسب با استاندارد های اروپا طراحی شده است.</p>
      </div>
    </div>

    <!-- CARD 3 -->
    <div class="card card-3 text-center">
      <div class="py-3 px-3">
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
  props: ['enrolled', 'done', 'remain'],
  components: {
    PieChart
  },
  data() {
    return {
      pieChart1: {
        chartData: {
          datasets: [
            {
              labels: ['تکمیل شده', 'تکمیل نشده'],
              pointRadius: 0,
              pointHoverRadius: 0,
              titleFontFamily: 'IranSansBold',
              backgroundColor: ['#00c09d', '#e2e2e2'],
              borderWidth: 0,
              data: [this.done, this.remain]
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
            titleFontFamily: 'IranSansBold',
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: 'nearest',
            intersect: 0,
            position: 'nearest',
            callbacks: {
              label: (tooltipItem, item) => {
                const dataset = item.datasets[tooltipItem.datasetIndex];
                const index = tooltipItem.index;
                return (
                  Number(dataset.data[index]) + ' % ' + dataset.labels[index]
                );
              }
            }
          }

          // scales: {
          //   yAxes: [
          //     {
          //       display: 0,
          //       ticks: {
          //         display: false
          //       },
          //       gridLines: {
          //         drawBorder: false,
          //         zeroLineColor: 'transparent',
          //         color: 'rgba(255,255,255,0.05)'
          //       }
          //     }
          //   ]

          //   xAxes: [
          //     {
          //       display: 0,
          //       barPercentage: 1.6,
          //       gridLines: {
          //         drawBorder: false,
          //         color: 'rgba(255,255,255,0.1)',
          //         zeroLineColor: 'transparent'
          //       },
          //       ticks: {
          //         display: false
          //       }
          //     }
          //   ]
          // }
        }
      }
    };
  },
  watch: {
    done: function(value, old) {
      this.pieChart1.chartData.datasets[0].data[0] = value;
    },
    remain: function(value, old) {
      this.pieChart1.chartData.datasets[0].data[1] = value;
    }
  }
};
</script>

<style lang="scss" scoped>
pie-chart {
  font-family: IranSansBold !important;
}
.percent-text {
  font-family: IranSansBold;
  font-size: 1.4em;
}

.card {
  border-radius: 10px !important;
  -webkit-box-shadow: 0 1px 15px 0 rgba(123, 123, 123, 0) !important;
  box-shadow: 0 1px 15px 0 rgba(123, 123, 123, 0) !important;
}

.card-1 {
  background: linear-gradient(180deg, #f44881, #ec454f) !important;
}

.card-2 {
  background-image: linear-gradient(180deg, #21c8f6f8, #637afff6),
    url(/img/frontend/london-seemless-bg.svg) !important;
}

.card-3 {
  background-image: linear-gradient(180deg, #62d1b9fa, #20b897f3),
    url(/img/frontend/london-seemless-bg.svg) !important;
}

.card-4 {
  background-image: linear-gradient(180deg, #7f57dbfa, #b372bdf3),
    url(/img/frontend/london-seemless-bg.svg) !important;
}

.title {
  font-family: IranSansBold;
  font-size: 1.25em;
  color: white !important;
}

.subtitle {
  font-size: 1em;
  color: white !important;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 1.2em !important;
  }

  .subtitle {
    font-size: 0.9em !important;
  }
}
</style>

