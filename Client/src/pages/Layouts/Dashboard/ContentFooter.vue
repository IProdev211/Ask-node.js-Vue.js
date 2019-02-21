<template>
  <footer class="footer">
    <div class="container-fluid">
      <!-- <ul class="nav">
        <li class="nav-item">
          <a href="https://www.askarya.ir/" target="_blank" rel="noopener" class="nav-link">Ask Arya</a>
        </li>
        <li class="nav-item">
          <a
            href="https://www.askarya.ir/about"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >About Us</a>
        </li>
        <li class="nav-item">
          <a href="https://www.askarya.ir/" target="_blank" rel="noopener" class="nav-link">Blog</a>
        </li>
      </ul>-->
      <div class="copyrigh">
        &copy; {{ year }}, made with <i class="tim-icons icon-heart-2"></i> by
        <a href="https://askarya.ir" target="_blank">Ask Arya</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
