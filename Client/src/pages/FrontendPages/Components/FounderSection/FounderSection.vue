<template>
  <div class="container pb-5">
    <h1 class="pb-5 founder-header text-danger text-center">{{ $t('frontendHome.OurFounder') }}</h1>
    <div class="row">
      <div class="col-md-8">
        <h2 class="subheading2 text-info">{{ $t('frontendHome.WhosFounder') }}</h2>
        <p>
          {{ $t('frontendHome.WhosFounder1') }}
          <br>
          <br>
          {{ $t('frontendHome.WhosFounder2') }}
          <br>
          <br>
          {{ $t('frontendHome.WhosFounder3') }}
        </p>
        <div class="Education py-4">
          <hr class="hr-1">
          <h2 class="subheading2 text-info">{{ $t('frontendHome.Education') }}</h2>
          <p>
            <span class="font-weight-bold text-success">Air Transport Pilot Licence:</span> Frozen ATPL -
            <small>Oxford Aviation Academy, London</small>
          </p>
          <p>
            <span class="font-weight-bold text-success">Degree:</span> Bachelors of Engineering, Computer Network Security-
            <small>Westminster University, London</small>
          </p>
          <p>
            <span class="font-weight-bold text-success">A-levels:</span> Business, Persian, Mathematics, & ICT -
            <small>William Morris Sixth Form, London</small>
          </p>
          <p>
            <span class="font-weight-bold text-success">GCSE's:</span> Mathematics, Science, English, French, Persian, ICT, Geography, & History -
            <small>Holland Park Secondary School, London</small>
          </p>
        </div>
      </div>
      <div class="col-md-4 py-4 text-center">
        <img
          class="rounded-circle img-fluid"
          src="img/frontend/aryapilot-askarya.png"
          alt="Picture of our fearless leader 2"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-header {
  font-size: 3.6rem;
}
.founder-header {
  font-size: 1.5rem;
  // color: white;
}
.subheader-founder {
  font-size: 1rem;
  color: rgb(197, 197, 197);
}
</style>
