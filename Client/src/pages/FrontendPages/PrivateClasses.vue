<template>
  <div>
    <div class="private-classes-background">
      <div class="container">
        <h2 class="subheading text-danger pt-3">Our Private Classes</h2>
        <div class="private-classes pb-2">
          <div class="row pricing">
            <div class="col-lg-4 col-sm-12 pt-3 px-3">
              <div class="pricing-box hover">
                <div class="pricing-title bg-bronze">
                  <h3 class="text-white titleSize py-3">Bronze</h3>
                </div>
                <div class="pricing-price">
                  <span class>125,000 Tomans</span>
                  <p class="py-0 my-0 smalltext">Per Session</p>
                </div>
                <div class="pricing-features pt-3">
                  <ul>
                    <li>Speaking Practice</li>
                    <li>Listening Practice</li>
                    <li>Vocabulary & Pronunciation Practice</li>
                    <li>Placement Test</li>
                    <li>End of Course Certificate</li>
                  </ul>
                </div>
                <div class="pricing-action">
                  <a
                    href="https://www.askarya.ir/assets/AskArya-RegistrationForm.jpg"
                    target="_blank"
                    download="Register"
                    class="btn btn-lg btn-block btn-outline-primary"
                  >Register</a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-sm-12 pt-3 px-3">
              <div class="pricing-box hover">
                <div class="pricing-title bg-silver">
                  <h3 class="text-white titleSize py-3">Silver</h3>
                </div>
                <div class="pricing-price">
                  <span class>175,000 Tomans</span>
                  <p class="py-0 my-0 smalltext">Per Session</p>
                </div>
                <div class="pricing-features pt-3">
                  <ul>
                    <li>Speaking Practice</li>
                    <li>Listening Practice</li>
                    <li>Vocabulary & Pronunciation Practice</li>
                    <li>Grammar Practice</li>
                    <li>Reading Practice</li>
                    <li>Placement Test</li>
                    <li>End of Course Certificate</li>
                  </ul>
                </div>
                <div class="pricing-action">
                  <a
                    href="https://www.askarya.ir/assets/AskArya-RegistrationForm.jpg"
                    target="_blank"
                    download="Register"
                    class="btn btn-lg btn-block btn-outline-primary"
                  >Register</a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-sm-12 pt-3 px-3">
              <div class="pricing-box hover">
                <div class="pricing-title bg-gold">
                  <h3 class="titleSize text-black py-3">Gold</h3>
                </div>
                <div class="pricing-price">
                  <span>200,000 Tomans</span>
                  <p class="py-0 my-0 smalltext">Per Session</p>
                </div>
                <div class="pricing-features pt-3">
                  <ul>
                    <li>Free Discussion Practice</li>
                    <li>Listening Practice</li>
                    <li>Vocab & Pronunciation Practice</li>
                    <li>2 Custom Exams During Length of Course</li>
                    <li>Placement Test</li>
                    <li>Critiquing Movies & Talk Shows</li>
                    <li>Test Preparation - IELTS/TOEFL</li>
                    <li>Mock Aviation English Test</li>
                    <li>Learn Key Native Speaking Techniques</li>
                    <li>Resume/CV Consultation</li>
                    <li>End of Course Certificate</li>
                  </ul>
                </div>
                <div class="pricing-action">
                  <a
                    href="https://www.askarya.ir/assets/AskArya-RegistrationForm.jpg"
                    target="_blank"
                    download="Register"
                    class="btn btn-lg btn-block btn-askarya"
                  >Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FREE DISCUSSION SECTION -->
    <div class="freeDiscussion container pt-3">
      <h2 class="my-5 text-danger">Our Free Discussion Classes</h2>
      <div class="py-5">
        <h2>
          Not Seeing the
          <strong class="text-success">Results</strong> You Want?
        </h2>
        <p
          class="py-3"
        >It has been a few months since you have started your English classes. So far, things are going well. You feel great and have already seen some improvements in your English speaking and general English skills. Then it happens. All of a sudden, your learning progress stops. You are not seeing results. No matter how hard you study, you cannot seem to progress to the next level. Your motivation starts to drop, and you feel stuck and hopeless.
          <br>
          <br>Chances are this scenario has happened to you at least once. This is a common occurrence with language students, and not only are they annoying, they are flat out discouraging.
        </p>
      </div>

      <div class="py-3">
        <h2>
          The Solution? Ask Arya’s
          <strong class="text-success">Free Discussion Groups</strong>.
        </h2>
        <p
          class="py-3"
        >Ask Arya’s aim is to teach you how to practically and effectively use the English you have learnt or are currently learning in everyday situations. Most students mistakenly believe that attending language classes are sufficient enough to learn a language fully. However, this is not the case as explained above.
          <br>
          <br>In order to properly understand and utilise what you have learned in theory, you need to practice it in a productive learning environment, with a fully capable and experienced Native English speaker.
          <br>
          <br>In our Free Discussion groups, language learners can practice what they have learnt, under the correct supervision of Native English speakers. In addition, not only will you cover conversations and discussions, various other topics will be covered, such as: critiquing films, critiquing books (novels, poetry, history, etc.), writing letters (job related and personal), and much more. In all of these learning programs, you will learn by practicing real world examples and scenarios.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.private-classes-background {
  background: linear-gradient(180deg, #1e1e2f, rgb(141, 89, 237));
  width: 100%;
  padding-top: 60px;
  padding-bottom: 80px;
  min-height: 50vh;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw));
}

.section-header {
  font-size: 1.5rem;
  color: white;
}

.hero-header {
  font-size: 75px;
}

li,
ul {
  margin: 0;
  padding: 0;
}

.private-classes {
  padding-top: 50px;
  .pricing {
    position: relative;
  }

  .pricing [class^='col-'] {
    padding: 0;
    margin-top: 10px;
  }

  .pricing-box {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.075);
    border-radius: 16px !important;
    text-align: center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background-color: rgb(40, 40, 63);
  }

  .pricing-title {
    background-color: rgb(68, 68, 129);
    border-radius: 16px 16px 0 0;
  }

  .titleSize {
    font-size: 1.7rem;
  }

  .pricing-price {
    position: relative;
    padding: 16px 0;
    color: #fff;
  }

  .pricing-price:after {
    content: '';
    position: absolute;
    width: 100px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    top: auto;
    bottom: 0;
    left: 50%;
    margin-left: -50px;
  }

  .pricing-price span {
    display: inline-block;
    color: #fff;
    margin: 7px 3px 0 0;
    font-size: 1.9rem;
    font-weight: 400;
  }

  .pricing-features {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .pricing-features ul {
    margin: 0;
    padding: 17px 0;
    list-style: none;
  }

  .pricing-features li {
    padding: 10px 0;
    font-size: 15px;
  }

  .pricing-action {
    padding: 15px 30px;
  }

  .hover {
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 5px;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  .hover:hover {
    -webkit-box-shadow: 0 10px 30px -5px rgba(136, 136, 136, 0.4);
    box-shadow: 0 10px 30px -5px rgba(24, 15, 145, 0.4);
    -webkit-transform: translateY(-10px);
    transform: translateY(-10);
    cursor: pointer;
  }

  p {
    font-size: 17px;
    padding-top: 13px;
  }
  .smalltext {
    font-size: 15px;
    color: #696969;
  }
  .bg-gold {
    background-color: #ffd700 !important;
  }

  .bg-silver {
    background-color: #c0c0c0 !important;
  }

  .bg-bronze {
    background-color: #cd7f32 !important;
  }
  .text-black {
    color: black;
  }
}
</style>
