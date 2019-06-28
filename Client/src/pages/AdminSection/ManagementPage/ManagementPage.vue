<template>
  <section class="container">
    <h1 class="text-center text-danger">Management Page</h1>

    <div class="pt-3">
      <div class="d-flex justify-content-end row">
        <router-link to="/manageusers">
          <base-button size="lg" type="primary">Manage: Users</base-button>
        </router-link>

        <router-link to="/courseoverview">
          <base-button size="lg" type="primary">Manage: Courses</base-button>
        </router-link>

        <router-link to="/episodeoverview">
          <base-button size="lg" type="primary">Manage: Episodes</base-button>
        </router-link>

        <router-link to="/blogoverview">
          <base-button size="lg" type="primary">Manage: Blogs</base-button>
        </router-link>

        <router-link to="/quizoverview">
          <base-button size="lg" type="primary">Manage: Quizzes</base-button>
        </router-link>

        <router-link to="/ticketoverview">
          <base-button size="lg" type="primary">Manage: Tickets</base-button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>

