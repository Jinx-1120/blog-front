<template>
  <div class="carrousel" :class="{ mobile: mobileLayout }">
     <transition name="module" mode="out-in">
      <!-- <empty-box class="article-empty-box" v-if="!article.data.data.length">
        <slot>{{ $i18n.text.article.empty || 'No Result Article.' }}</slot>
      </empty-box> -->
      <div class="swiper" v-swiper:swiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide item" v-for="(article, index) in list.slice(0, 9)" :key="index">
            <div class="content">
              <img :src="article.coverImg" :alt="article.title">
              <nuxt-link :to="`/article/${article._id}`" class="title">
                <span>{{ article.title }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        setWrapperSize: true,
        autoHeight: true,
        mousewheel: true,
        observeParents: true,
        grabCursor: true,
        preloadImages: false,
        lazy: true
      }
    }
  },
  computed: {
    list () {
      return this.$store.state.article.artList
    },
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },
  }
}
</script>

<style lang="scss" scoped>
  .carrousel {
    height: 18em;
    margin-bottom: 1em;
    position: relative;
    overflow: hidden;
    background-color: $module-bg;
    > .swiper {
      .item {
        > .content {
          width: 100%;
          height: 18em;
          position: relative;
          overflow: hidden;
          > img {
            width: 100%;
            height: 100%;
            @include css3-prefix(transform, rotate(0deg) scale(1));
            @include css3-prefix(transition, transform 1s);
            &:hover {
              @include css3-prefix(transform, rotate(2deg) scale(1.1));
            }
          }
          > .title {
            position: absolute;
            margin: 0;
            top: 0.8rem;
            right: 3.5rem;
            color: #555;
            padding-right: .6em;
            padding-left: 1em;
            height: 2em;
            line-height: 2em;
            font-size: 1em;
            font-weight: bold;
            border-radius: 1px;
            letter-spacing: .3px;
            max-width: 75%;
            @include text-overflow;
            -webkit-background-clip: text;
            // background-color: $module-hover-bg-opacity-9;
            background: linear-gradient(90deg, transparent 0%, #ffffff 4em, #ffffff, #fff);
            &:hover {
              color: #000;
              // background: none;
              padding-left: .6em;
              background-color:  var(--module-bg);
            }
          }
        }
      }
    }
    &.mobile {
      height: calc((100vw - 2rem) * .35);
      > .swiper {
        .item {
          > .content {
            > .title {
              right: 1.7rem;
              max-width: 70%;
            }
          }
        }
      }
    }
  }
</style>

