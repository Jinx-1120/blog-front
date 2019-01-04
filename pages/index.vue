<template>
  <div>
    <div  class="clearfix main left" :class="{mobile : mobileLayout}">
      <swiper-view class="swiper-box"></swiper-view>
      <div class="article">
        <!-- <div class="tag-list">

        </div> -->
        <articleView
          :articleList="list"
          :haveMoreArt="haveMoreArt"
          @loadMore="loadMore"></articleView>

      </div>
    </div>
    <div class="aside left" v-if="!mobileLayout">
      <div class="aside-fixed-box" :class="{ fixed: fixedMode.fixed }" v-scroll-top>
        <div class="aside-hot" >
          <p class="title">
            <i class="iconfont icon-hotfill"></i>
            <span>有点意思</span>
          </p>
          <ul class="left aside-article-list">

            <li class="item" :key="item.id" v-for="item in hotList.slice(0, 10)">
              <span class="index"></span>
              <nuxt-link
                class="title"
                :to="`/article/${item._id}`"
                :title="`${item.title} `">
                <span>{{ item.title }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- <no-ssr>
          <transition name="fade">
            <aside-ad :initIndex="adIndex" @slideChange="changeAsideAdSwiper" v-if="fixedMode.fixed"></aside-ad>
          </transition>
        </no-ssr> -->
        <div class="aside-tag">
          <!-- <empty-box v-if="!tag.fetching && !tag.data.data.length">
            <slot>{{ $i18n.text.tag.empty || 'No Result Tags.' }}</slot>
          </empty-box> -->
          <p class="title">
            <i class="iconfont icon-hotfill"></i>
            <span>归档</span>
          </p>
          <ul class="aside-tag-list">
            <nuxt-link
              tag="li"
              class="item"
              :key="index"
              :to="`/tag/${item.tagName}`"
              v-for="(item, index) in tagList">
              <a class="title" :title="item.tagName">
                <!-- <i class="iconfont"
                  :class="[item.extends.find(t => Object.is(t.name, 'icon')).value]"
                  v-if="item.extends.find(t => Object.is(t.name, 'icon'))"></i> -->
                <span>{{ item.tagName }}</span>
                <!-- <span>({{ item.count || 0 }})</span> -->
              </a>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>

import articleView from '~/components/common/article'
import swiperView from '~/components/layouts/swiper'
// import scroll from '~/utils/scroll'

export default {

  scrollToTop: true,

  transition: 'fade',

  // fetch ({ store }) {
  //   return store.dispatch('getArtList',{'isAll': false})
  // },

  data () {
    return {
      fixedMode: {
        fixed: false,
        element: null,
        sidebarFixedOffsetTop: 0
      }
    }
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    list () {
      return this.$store.state.article.artList
    },
    hotList () {
      return this.$store.state.article.hotList.data
    },
    banners () {
      return this.list.slice(0, 9)
    },
    tagList () {
      return this.$store.state.tag.tagList
    },
    haveMoreArt () {
      return false
    },
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },
  },

  components: {
    articleView,
    swiperView
  },

  methods: {
    loadMore () {
      // this.$store.dispatch('getArtList', {
      //   current_page: this.$store.state.article.art.pagination.current_page + 1,
      //   type: 1
      // })
    },
    parseScroll() {
      const element = this.fixedMode.element
      const sidebarFixedOffsetTop = this.fixedMode.sidebarFixedOffsetTop
      const windowScrollTop = document.documentElement.scrollTop ||
                              window.pageYOffset ||
                              window.scrollY ||
                              document.body.scrollTop
      const newSidebarFixedOffsetTop = element.offsetTop
      this.fixedMode.sidebarFixedOffsetTop = (newSidebarFixedOffsetTop !== sidebarFixedOffsetTop && newSidebarFixedOffsetTop !== 77)
                                            ? newSidebarFixedOffsetTop
                                            : sidebarFixedOffsetTop
      const isFixed = windowScrollTop > sidebarFixedOffsetTop
      this.fixedMode.fixed = isFixed && element
    }
  },
  directives: {
    scrollTop: {
      inserted(element, b, VNode) {
        // context
        const context = VNode.context
        console.log(element)
        // element
        context.fixedMode.element = element
        // 检测此元素相对于文档Document原点的绝对位置，并且这个值是不变化的
        context.fixedMode.sidebarFixedOffsetTop = element.offsetTop
        // 初始化应用
        context.parseScroll()
        // 监听滚动事件
        window.addEventListener('scroll', context.parseScroll, { passive: true })
      },
      unbind(element, b, VNode) {
        window.removeEventListener('scroll', VNode.context.parseScroll)
      }
    }
  }
}
</script>


<style lang="scss">

.main {
  width: 55em;
  margin-right: 1em;
  padding: 0 20px;
  background: $bg_color;
  >.swiper-box {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
  }
  >.title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > .title-name {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;
    }

    > .line {
      top: 50%;
    }
  }

}
.left{
  float: left;
}
.aside-hot {
  overflow: hidden;
  background: $bg_color;
  margin-bottom: 1em;
  // margin-top: 20px;
  // > .title {
  //   height: 3em;
  //   line-height: 3em;
  //   margin: 0;
  //   padding: 0 .8em;
  //   border-bottom: 1px dashed #eee;
  //   text-transform: uppercase;
  //   .iconfont {
  //     margin-right: .5em;
  //   }
  // }
}
.aside-article-list{
  width: 21em;
  // margin-top: 20px;
  padding: 5px;
  // border: 1px solid;
}
.aside-article-list {
  list-style: none;
  padding: .5em 0;
  margin-bottom: 0;
  counter-reset: hot-article-list;
  .item {
    display: block;
    height: 1.9em;
    line-height: 1.9em;
    padding: 0 .8em;
    margin-bottom: .5em;
    color: $text-dark;
    @include text-overflow();
    &:nth-child(1) {
      .index {
        color: $white;
        background-color: $primary-opacity-5;
      }
    }
    &:nth-child(2) {
      .index {
        color: $white;
        background-color: rgba($accent, .6);
      }
    }
    &:nth-child(3) {
      .index {
        color: $white;
        background-color: rgba($red, .6);
      }
    }
    &:last-child {
      margin: 0;
    }
    .index {
      color: $secondary;
      counter-increment: hot-article-list;
      background-color: $module-hover-bg;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.5em;
      display: inline-block;
      text-align: center;
      margin-right: .5em;
      font-size: .8em;
      &::before {
        content: counter(hot-article-list);
      }
    }
    .title {
      font-size: .9em;
      &:hover {
        margin-left: .5em;
        text-decoration: underline;
        color: $link-hover;
      }
    }
  }
}
.aside-fixed-box {
  width: 21em;
  &.fixed {
    position: fixed;
    top: 4.5em;
    > .aside-tag {
      max-height: calc(100vh - 8em - 4.5em - 3em - 8em);
      overflow-y: auto;
    }
  }
  .title {
    height: 3em;
    line-height: 3em;
    margin: 0;
    padding: 0 .8em;
    border-bottom: 1px dashed #eee;
    text-transform: uppercase;
    .iconfont {
      margin-right: .5em;
    }
  }
  > .aside-tag {
    width: 21em;
    padding-left: 1rem;
    border-top: 1rem solid transparent;
    border-bottom: 1rem solid transparent;
    // margin-bottom: 1em;
    background: $bg_color;
    .empty-box {
      padding-right: .8em;
      padding-bottom: .8em;
    }
    .aside-tag-list {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      .item {
        display: inline-block;
        margin-right: 1rem;
        margin-bottom: 1rem;
        height: 2em;
        line-height: 2em;
        text-transform: capitalize;
        background-color: $module-hover-bg;
        &:hover {
          background-color: var(--module-hover-bg-darken-40);
        }
        &:last-child {
          margin: 0;
        }
        .title {
          display: block;
          padding: 0 .5em;
          font-family: $font;
        }
        .title:hover{
          margin-left: .5em;
          text-decoration: underline;
          color: $link-hover;
        }
      }
    }
  }
}
.mobile{
  width: 100%!important;
}

</style>
