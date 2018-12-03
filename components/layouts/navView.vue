<template>
  <div class="nav-wrap">
    <div class="nav-item" v-for="(item,inx) in linkArr" :key="inx">
      <nuxt-link :to="item.path" class="item">
        <span>{{item.name}}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navView',
    data () {
      return {
        linkArr: [
          {
            name: '主页',
            path: '/'
          },
          {
            name: '思考',
            path: '/think'
          },
          {
            name: '阅读',
            path: '/reader'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav-wrap {
    position: fixed;
    display: inline-block;
    // background: #ff5000;
    width: 8.5em;
    top: 5.5em;
    left: calc((100% - 90em) / 2 + 20px);
    .nav-item {
      padding: 0;
      margin: 0;
      > .item {
        border: none;
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 1px;
        color: $secondary;
        font-family: DINRegular;
        margin-bottom: .5em;
        position: relative;
        &:hover {
          color: #0088f5;
        }
        > .superscript {
          margin-left: 1rem;
          @keyframes superscript-icon-color {
            0%   { color: chartreuse }
            15%  { color: green }
            30%  { color: red }
            45%  { color: darkviolet }
            60% { color: pink }
            86% { color: blue }
            100% { color: black }
          }
          > .iconfont {
            color: $red;
            transition: color 0s;
            animation: superscript-icon-color 1s infinite;
          }
        }

        &.ad {
          height: 5rem;
          line-height: 5rem;
          margin: 0;
          border-bottom: 1px dashed $module-hover-bg;
        }
        &.taobao {
          color: #ff5000;
          border-top: 1px dashed $module-hover-bg;
          > .iconfont {
            color: #ff5000;
          }
        }
        &.aliyun {
          color: black;
          > .iconfont {
            color: black;
          }
        }
         &.app {
          color: #0088f5;
          > .iconfont {
            color: #0088f5;
          }
        }
        &:last-child {
          margin-top: 1rem;
          margin-bottom: 0;
        }
        &.link-active {
          font-weight: bold;
          color: #0088f5;
          background-color: $module-bg;
          &.guestbook {
            background: linear-gradient(to bottom, $module-bg, transparent);
          }
        }
        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
</style>
