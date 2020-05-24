<template>
  <div class="app">
    <div class="background"></div>
    <div
        class="app-aside"
        v-if="mobileLayout"
        :class="{ open: mobileSidebar }"
        v-click-outside="hideSide">
      <mobile-side ></mobile-side>
    </div>
    <div class="app-main" :class="{ open: mobileSidebar }">
      <transition name="fade" mode="">
        <div class="head-box" v-if="!isWelcome">
          <mobile-header v-if="mobileLayout"></mobile-header>
          <my-header v-else></my-header>
        </div>
      </transition>

      <transition-group tag="div" class="container clearfix main-container" name="slide-up" :class="{ 'mobile-layout ': mobileLayout }">
        <!-- <nav-view class="left" key="1" v-if="!mobileLayout"></nav-view> -->
        <div class="content-left left" key="2" :class="{ 'full-page': !isAsdiePage, 'mobile-layout': mobileLayout }">
          <nuxt></nuxt>
        </div>
      </transition-group>

      <transition name="fade" mode="">
        <my-footer v-if="!isError && !isWelcome"></my-footer>
      </transition>
    </div>
    <scoll-top></scoll-top>
  </div>
</template>


<script>

import myFooter from '~/components/layouts/footer'
import myHeader from '~/components/layouts/header'
import asideView from '~/components/layouts/aside'
import scollTop from '~/components/layouts/scollTop'
import navView from '~/components/layouts/navView'
import mobileSide from '~/components/mobile/aside'
import mobileHeader from '~/components/mobile/header'

export default {
  head () {
    return !this.mobileLayout ? {} : {
      bodyAttrs: {
        class: 'mobile'
      }
    }
  },
  data () {
    return {
      path: this.$router.options.base
    }
  },

  components: {
    mobileHeader,
    myFooter,
    myHeader,
    asideView,
    mobileSide,
    scollTop,
    navView
  },

  computed: {
    isAsdiePage () {
      return this.$store.state.options.isAsidePage
    },

    isWelcome () {
      return this.$store.state.options.isWelcome
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    mobileSidebar () {
      return this.$store.state.options.mobileSidebar
    },

    isError () {
      return this.$store.state.options.isError
    }
  },
  watch: {
    path () {
      console.log(this.path)
    }
  },
  methods: {
    hideSide () {
      this.$store.commit('options/setMobileSidebar', false)
    }
  },

  mounted () {
    const theme = window.localStorage.getItem('THEME') || 'light'
    document.body.id = theme
    console.log(this.$router.options.base)
  }
}
</script>

<style lang="scss" scoped>

.app {
  background: url('../static/background.png') repeat;
  overflow-y: scroll;
  height: calc(100vh - 60px);
  >.left{
    float: left;
  }
  >.app-aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    width: 60%;
    background: $white;
    @include css3-prefix('transform', 'translateX(-100%)');
    @include transition(all .3s ease-out);

    >.mobile-aside {
      opacity: 0;
      @include transition(all .3s ease-out);
      @include css3-prefix('transform', 'scale(.8)');
    }
  }

  >.app-aside.open {
    @include css3-prefix('transform', 'translateX(0)');
    width: 38%;
    >.mobile-aside {
      opacity: 1;
      @include css3-prefix('transform', 'scale(1)');
    }
  }

  >.app-main {
    @include transition(all .3s ease-out);
    background: #ffffff42;
    >.main-container {
      min-height: calc(100vh - 140px);
      width: 90em;
      padding-top: 10px;
      margin: 0 auto;
    }

    >.main-container.mobile {
      min-height: calc(100vh - 56px);
    }
  }

  >.app-main.open {
    transform: translateX(60%);
  }
}

.content-left {
  position: relative;
  width: $container-left;
  float: left;
  @include css3-prefix(transition, all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-left.full-page,
.content-left.mobile-layout {
  width:78em;
  // background: $bg_color;
  margin: 1em 0;
  margin-left: 4.5em;
  @include css3-prefix(transition, width .5s cubic-bezier(1.0, 0.5, 0.8, 1.0));
}

.content-left.mobile-layout {
  width: 100%;
  margin: 0;
  // padding: 1rem;
  padding-top: 4.5rem;
}

.content-right {
  width: $container-right;
  float: right;
}

.mobile-layout {
  width: 100%!important;
}
</style>
