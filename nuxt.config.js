module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "靳海迪的个人日志 - 吾生也有涯而，知也无涯。",
    meta: [
      { charset: 'utf-8' },
      {
        name: 'google-site-verification',
        content: '9KqwpHpvyVi_-qVysL84xdbPb_bhjIGkFox5yCDWBvU'
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '靳海迪的个人日志 --- 吾生也有涯而，知也无涯。'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#17a2b8' },
  /*
   ** Global CSS
   */
  css: [
    'swiper/dist/css/swiper.css',
    'highlight.js/styles/ocean.css',
    {
      src: '@/assets/scss/index.scss',
      lang: 'sass'
    }
  ],
  styleResources: {
    scss: ['./assets/scss/variable.scss', './assets/scss/mixin.scss']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/clickOutside.js',
      ssr: false
    }, {
      src: './plugins/filters.js'
    }, {
      src: '~/plugins/swiper.js',
      ssr: false
    },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
