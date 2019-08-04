<template>
  <div class="container text-ltr pb-5">
    <div class="stat-cards text-center">
      <div class="d-flex justify-content-center">
        <div class="stitched1">
          <h2 class="headerStyling1">{{openTickets}}</h2>
          <p class="subheader">Open</p>
        </div>

        <div class="stitched3">
          <h2 class="headerStyling3">{{answeredTickets}}</h2>
          <p class="subheader">Answered</p>
        </div>

        <div class="stitched2">
          <h2 class="headerStyling2">{{inprogressTickets}}</h2>
          <p class="subheader">In Progress</p>
        </div>

        <div class="stitched4">
          <h2 class="headerStyling4">{{onHoldTickets}}</h2>
          <p class="subheader">On Hold</p>
        </div>

        <div class="stitched5">
          <h2 class="headerStyling5">{{closedTickets}}</h2>
          <p class="subheader">Closed</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    openTickets: {
      type: Number,
      default: 0,
    },
    answeredTickets: {
      type: Number,
      default: 0,
    },
    inprogressTickets: {
      type: Number,
      default: 0,
    },
    onHoldTickets: {
      type: Number,
      default: 0,
    },
    closedTickets: {
      type: Number,
      default: 0,
    },
  }
};
</script>

<style lang="scss" scoped>
.stitched1 {
  padding: 10px;
  margin: 5px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling1 {
    color: #f5b435;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.9rem;
    color: #fff;
  }
}

.stitched2 {
  padding: 10px;
  margin: 5px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling2 {
    color: #21c8f6;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.9rem;
    color: #fff;
  }
}

.stitched3 {
  padding: 10px;
  margin: 5px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling3 {
    color: #6edcc4;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.9rem;
    color: #fff;
  }
}

.stitched4 {
  padding: 10px;
  margin: 5px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling4 {
    color: #ff0080;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.9rem;
    color: #fff;
  }
}

.stitched5 {
  padding: 10px;
  margin: 5px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling5 {
    color: #37e771;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.9rem;
    color: #fff;
  }
}

.stat-cards {
  padding: 0 30%;
}

@media (max-width: 800px) {
  .stat-cards {
    padding: 0 01%;
  }
}
</style>

