<template>
  <div class="background">
    <div class="container">
      <h1 class="title text-center pt-5">تماس با ما</h1>
      <p class="subtitle text-center">راه ارتباطی ما فقط از این سه طریق می باشد.</p>

      <div class="iconSection">
        <p>
          <a href="https://t.me/AskAryaSomething" class="li-ic">AskAryaSomething@</a>
          <i class="fab fa-telegram pr-4 icon"></i>
        </p>
        <p class="pt-1">
          <a href="tel:+989032227796" class="fb-ic">09032227796</a>
          <i class="fa fa-phone pr-4 icon"></i>
        </p>
        <p class="pt-1">
          <a href="mailto:info@askarya.ir" class="fb-ic">info@askarya.ir</a>
          <i class="fa fa-envelope pr-4 icon"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'تماس با ما | اسک آریا',
    titleTemplate: 'تماس با ما | اسک آریا',
    htmlAttrs: {
      lang: 'fa',
      amp: true
    },

    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'اسک آریا' },
      { property: 'og:site_name', content: 'اسک آریا' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.askarya.ir/'
      },
      {
        property: 'og:image',
        content: 'https://www.askarya.ir/img/askarya-logo.png'
      },
      {
        property: 'og:description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد. در حین انجام تکالیف روزمره خود زبان را بیاموزید، تا سریع تر و بهتر یاد بگیرید. سبک و متد های آموزشی اسک آریا متناسب با استاندارد های اروپا طراحی شده است.'
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد. در حین انجام تکالیف روزمره خود زبان را بیاموزید، تا سریع تر و بهتر یاد بگیرید. سبک و متد های آموزشی اسک آریا متناسب با استاندارد های اروپا طراحی شده است.'
      }
    ],
    link: [{ rel: 'canonical', href: 'https://www.askarya.ir/' }]
  }
};
</script>


<style lang="scss" scoped>
.background {
  background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  background-size: cover;
  background-position: center;
  height: 90vh;
  position: inherit;
}

.title {
  font-size: 3em;
  font-family: IranSansBold;
  color: rgb(255, 255, 255) !important;
}

.subtitle {
  font-size: 1.2em;
  color: rgb(235, 235, 235) !important;
}

.iconSection {
  padding: 4rem 0;
}

.iconSection a,
.iconSection i,
.iconSection p {
  color: rgb(255, 255, 255) !important;
  padding: 10px 0;
  font-size: 1.5em;
  text-align: left;
}

.iconSection a:hover {
  color: rgb(251, 255, 0) !important;
}

@media (max-width: 768px) {
  .background {
    background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
    background-size: cover;
    background-position: center bottom;
    height: 100vh;
    position: inherit;
  }
  .iconSection a,
  .iconSection i,
  .iconSection p {
    font-size: 1.4em;
    text-align: left;
  }
  .subtitle {
    font-size: 0.9rem;
    color: rgb(218, 218, 218) !important;
  }
}

@media (max-width: 550px) {
  .iconSection a,
  .iconSection i,
  .iconSection p {
    font-size: 1.2em;
    text-align: left;
  }
}
</style>