<template>
  <section class="container">
    <h1 class="text-center text-default">Management Page</h1>
    <div class="pt-5 text-ltr text-left d-flex justify-content-center row">
      <router-link to="/courseoverview">
        <base-button size="lg" type="info">Courses</base-button>
      </router-link>

      <router-link to="/episodeoverview">
        <base-button size="lg" type="info">Episodes</base-button>
      </router-link>

      <router-link to="/manageusers">
        <base-button size="lg" type="info">Users</base-button>
      </router-link>

      <router-link to="/blogoverview">
        <base-button size="lg" type="info">Blogs</base-button>
      </router-link>

      <router-link to="/ticketoverview">
        <base-button size="lg" type="info">Tickets</base-button>
      </router-link>

      <router-link to="/quizoverview">
        <base-button size="lg" type="info">Quizzes</base-button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.btn {
  margin-right: 10px;
  font-size: 1.2em;
}

@media (max-width: 767.98px) {
  .btn {
    margin-right: 10px;
    font-size: 0.9rem;
  }
}
</style>

