import http from '../api'

export const actions = {
  nuxtServerInit(store, { params, route, req }) {
    // console.log(isServer)
    const userAgent = req.headers['user-agent']
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    store.commit('options/setMobileLayout', isMobile)

    const initAppData = [
      store.dispatch('getTagList'),
      store.dispatch('getArtList', {'isAll': false}),
      store.dispatch('getHotList', {
        hot: true
      }),
    ]
    return Promise.all(initAppData)
  },
  async getArtList ({commit}, payload) {
    const res = await http.getArtList(payload).catch(err => console.error(err))
    commit('article/setArtList', res.data.data)
  },
  async getRecords ({commit}) {
    const recordsList = await http.getRecords().catch(err => console.error(err))
    commit('article/setArts', recordsList.data)
  },
  async getArt({commit}, payload) {
    const res = await http.getArt(payload).catch(err => console.error(err))
    commit('article/setDetails', res.data)
  },
  async getTagList ({commit}) {
    const res = await http.getTagList().catch(err => console.error(err))
    commit('tag/setTagList', res.data)
  },
  async likeArt({commit}, payload) {
    const res = await http.likeArt(payload).catch(err => console.log(err))
    return res
  },
  async searchArt({commit}, payload) {
    const res = await http.searchArt(payload).catch(err => console.log(err))
    commit('article/setArtList', res.data)
  },
  async getHotList({commit}, payload) {
    const res = await http.getArtList(payload).catch(err => console.log(err))
    commit('article/setHotList', res.data)
  },

  // 根据post-id获取评论列表
  async loadCommentsByPostId({
    commit,
    state
  }, data) {
    data.sort = data.sort || -1
    data.current_page = data.current_page || 1
    data.page_size = data.page_size || 20
    if (Object.is(data.current_page, 1)) {
      // commit('comment/CLEAR_LIST')
    }
    commit('comment/REQUEST_LIST', true)
    setTimeout(async () => {
      const res = await http.getComment(data)
        .catch(err => console.error(err))
      if (res && res.code === 200) {
        let list
        if (res.data.pagination.current_page === 1) list = res.data.data
        else list = [...state.comment.data.data, ...res.data.data]
        commit('comment/GET_LIST_SUCCESS', {
          data: list,
          pagination: res.data.pagination
        })
        commit('comment/REQUEST_LIST', false)

      } else commit('comment/GET_LIST_FAILURE')
      return res
    }, 500)
  },

  // 发布评论
  async postComment({ commit }, comment) {
    commit('comment/POST_ITEM')
    const res = await http.postComment(comment)
      .catch(err => console.error(err))
    console.log(res)
    if (res && res.code === 200) {
      commit('comment/POST_ITEM_SUCCESS', res)
      // if (comment.post_id !== 0) commit('article/ADD_COMMENT')
    } else commit('comment/POST_ITEM_FAILURE')
    return res
  },
}


