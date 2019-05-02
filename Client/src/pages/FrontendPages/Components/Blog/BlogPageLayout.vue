<template>
  <div class="container">
    <div class="row pb-5">
      <div class="col-12 pb-4">
        <BlogHeader></BlogHeader>
      </div>
      <div class="col-md-12 my-3">
        <BlogInfo></BlogInfo>
      </div>
      <div class="container text-ltr card pb-5">
        <div class="text-center pt-5">
          <img
            class="rounded-circle img-fluid blog-img"
            src="img/GeneralGrammarCourse.png"
            alt="Picture of our fearless leader 2"
          >
        </div>
        <h3 class="subheading pt-3">The IELTS Exam</h3>
        <p
          class="lead"
        >The International English Language Testing System (IELTS) is an exam, which gives an accurate and reliable measurement of your English language abilities. It is recognized by more than 7,000 educational institutions, governments and employers around the world and is often used for the purposes of gaining admission into a university or to obtain a visa to live in an English-speaking country. It’s the world’s most popular English language proficiency test and it is taken by more than 1.7 million people every year.</p>
        <br>

        <h4
          class="subheading2 py-4"
        >The IELTS is divided into four parts to measure the four primary language abilities - Here is an overview:</h4>
        <div class="container">
          <ul class="pt-3">
            <li class="lead">Listening – 4 sections, 40 questions, 30 minutes</li>
            <li class="lead">Reading – 3 sections, 40 questions, 60 minutes</li>
            <li class="lead">Writing – 2 writing tasks, 60 minutes</li>
            <li class="lead">Speaking – 3 parts, 11-14 minutes</li>
          </ul>
        </div>
        <h3 class="subheading py-4">Academic vs. General IELTS</h3>
        <p class="lead">
          There are two different types of IELTS exams – Academic and General. The Academic IELTS is usually for those who want to study in an English-speaking university, while the General IELTS focuses on basic practical language skills in social and workplace contexts and is typically for those who need the IELTS for visa purposes. However, this is only a general guide and it is important to contact the organisation or institution where you are applying to find out what it requires.
          <br>
          <br>The Listening and Speaking sections of the IELTS are exactly the same for both Academic and General tests. However, the Reading and Writing sections vary depending on which test you are taking.
        </p>

        <h3 class="subheading py-4">Breakdown of Exam Sections</h3>

        <h3 class="subheading2 py-3">Listening</h3>
        <p class="lead">
          In the listening section you will hear four recorded texts, monologues and conversations by a range of native speakers. Each section is heard only once. You will be asked questions which test your ability to understand main ideas, detailed factual information, opinions of the speakers and the purpose of a communication.
          <br>
          <br>The Listening and Speaking sections of the IELTS are exactly the same for both Academic and General tests. However, the Reading and Writing sections vary depending on which test you are taking.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogHeader from './BlogComponents/BlogHeader.vue';
import BlogInfo from './BlogComponents/BlogInfo.vue';

export default {
  components: {
    BlogInfo,
    BlogHeader
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 20px;
}
p {
  font-size: 1rem;
}
.blog-img {
  width: 200px;
}
</style>
