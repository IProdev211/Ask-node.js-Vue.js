<template>
  <section class="UnitSection">
    <!-- UNIT 1 -->
    <div class="UnitBox d-flex justify-content-between">
      <div class="right d-flex justify-content-end">
        <div class="UnitBadgeUnlocked">
          <i class="fas fa-unlock-alt"></i>
        </div>
        <div class="UnitName pr-4">
          <router-link to="/singlelesson">
            <p class="UnitName text-right">Vocabulary Introduction</p>
          </router-link>
        </div>
      </div>
      <div class="left d-flex justify-content-between">
        <div class="pl-3">
          <p class="detail-price">رایگان</p>
        </div>

        <div>
          <p class="detail-time">۱۲:۳۹</p>
        </div>
      </div>
    </div>
    <!-- UNIT 2 -->
    <div class="UnitBox d-flex justify-content-between">
      <div class="right d-flex justify-content-end">
        <div class="UnitBadgelocked">
          <i class="fas fa-lock"></i>
        </div>
        <div class="UnitName pr-4">
          <router-link to="/singlelesson">
            <p class="UnitName text-right">Grammar Introduction</p>
          </router-link>
        </div>
      </div>
      <div class="left d-flex justify-content-between">
        <div class="pl-3">
          <p class="detail-price">نقدی</p>
        </div>

        <div>
          <p class="detail-time">۲۴:۱۶</p>
        </div>
      </div>
    </div>
    <!-- UNIT 3 -->
    <div class="UnitBox d-flex justify-content-between">
      <div class="right d-flex justify-content-end">
        <div class="UnitBadgelocked">
          <i class="fas fa-lock"></i>
        </div>
        <div class="UnitName pr-4">
          <router-link to="/singlelesson">
            <p class="UnitName text-right">Pronoun Introduction</p>
          </router-link>
        </div>
      </div>
      <div class="left d-flex justify-content-between">
        <div class="pl-3">
          <p class="detail-price">نقدی</p>
        </div>

        <div>
          <p class="detail-time">۷۲:۴۴</p>
        </div>
      </div>
    </div>
    <!-- UNIT 4 -->
    <div class="UnitBox d-flex justify-content-between">
      <div class="right d-flex justify-content-end">
        <div class="UnitBadgeVIP">
          <i class="fas fa-key"></i>
        </div>
        <div class="UnitName pr-4">
          <router-link to="/singlelesson">
            <p class="UnitName text-right">Verbs Introduction</p>
          </router-link>
        </div>
      </div>
      <div class="left d-flex justify-content-between">
        <div class="pl-3">
          <p class="detail-price">VIP Access</p>
        </div>

        <div>
          <p class="detail-time">۲۷:۴۴</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.UnitSection {
  background: rgb(39, 39, 53);
  border-radius: 10px;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-image: initial;
}
.UnitBox {
  // border-radius: 10px;
  -webkit-box-align: center;
  padding: 20px 25px;
  align-items: center;
  border-bottom: 1px solid rgba(133, 133, 133, 0.377);
  border-right: 10px solid rgba(156, 156, 156, 0.377);
  transition: all 0.2s ease 0s;
}

.UnitBox:hover {
  border-right-color: #07d9b6;
  .UnitBadgeUnlocked {
    color: #07d9b6;
  }
  .UnitBadgelocked {
    color: #d82a50;
  }
  .detail-time {
    background: #107a69;
  }
  .UnitName {
    color: white;
  }
}

.UnitBadgeUnlocked {
  font-size: 1.5rem;
  color: #06a086;
}

.UnitBadgelocked {
  font-size: 1.5rem;
  color: #ac2451;
}

.UnitBadgeVIP {
  font-size: 1.5rem;
  color: #e7d800;
}

.UnitName {
  font-size: 1rem;
  color: rgb(158, 158, 158);
  margin-top: auto;
}
.detail-time {
  color: rgb(255, 255, 255);
  font-size: 1em;
  align-self: center;
  background: rgb(44, 62, 80);
  padding: 8px 15px;
  border-radius: 12px;
}

.detail-price {
  color: rgb(255, 255, 255);
  font-size: 1em;
  align-self: center;
  background: rgb(13, 55, 97);
  padding: 8px 15px;
  border-radius: 8px;
}
</style>

