<template>
  <div class="container text-ltr">
    <div class="row text-center d-flex justify-content-center">
      <div class="col-md-2 col-sm-12 pb-3">
        <h2 class="headerStyling1">{{openTickets}}</h2>
        <p class="subheader">Open</p>
      </div>

      <div class="col-md-2 col-sm-12 pb-3">
        <h2 class="headerStyling3">{{answeredTickets}}</h2>
        <p class="subheader">Answered</p>
      </div>

      <div class="col-md-2 col-sm-12 pb-3">
        <h2 class="headerStyling2">{{inprogressTickets}}</h2>
        <p class="subheader">In Progress</p>
      </div>

      <div class="col-md-2 col-sm-12 pb-3">
        <h2 class="headerStyling4">{{onHoldTickets}}</h2>
        <p class="subheader">On Hold</p>
      </div>

      <div class="col-md-2 col-sm-12 pb-3">
        <h2 class="headerStyling5">{{closedTickets}}</h2>
        <p class="subheader">Closed</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    openTickets: {
      type: Number,
      default: 0
    },
    answeredTickets: {
      type: Number,
      default: 0
    },
    inprogressTickets: {
      type: Number,
      default: 0
    },
    onHoldTickets: {
      type: Number,
      default: 0
    },
    closedTickets: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.headerStyling1 {
  color: #f5b435;
  font-family: IranSansBold;
  margin: 0;
  padding: 0;
}

.headerStyling2 {
  color: #21c8f6;
  font-family: IranSansBold;
  margin: 0;
  padding: 0;
}

.headerStyling3 {
  color: #6edcc4;
  font-family: IranSansBold;
  margin: 0;
  padding: 0;
}

.headerStyling4 {
  color: #ff0080;
  font-family: IranSansBold;
  margin: 0;
  padding: 0;
}

.headerStyling5 {
  color: #37e771;
  font-family: IranSansBold;
  margin: 0;
  padding: 0;
}

.subheader {
  font-size: 0.8rem;
  color: rgb(48, 48, 48);
  padding-top: 8px;
}

// @media (max-width: 800px) {
//   .stat-cards {
//     padding: 0 01%;
//   }
// }
</style>

