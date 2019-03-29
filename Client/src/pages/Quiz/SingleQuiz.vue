<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 card">
        <!-- Quiz Name (Course Name) -->
        <h5 class="card-header-custom">Grammar Bootcamp <span>Proper Noun Quiz</span></h5>
        <div class="card-body">
          <div class="row d-flex justify-content-between">
            <div>
              <p class="QuizScore">نمره: 14/20</p>
            </div>

            <div>
              <a href="#" class="btn btn-primary btn-simple btn-sm">Start Quiz</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-header-custom {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  font-size: 1.4rem;
  background-color: rgba(29, 29, 29, 0.03);
  border-bottom: 1px solid rgba(158, 158, 158, 0.253);
}

.QuizScore {
  font-size: 1.2rem;
}
</style>

