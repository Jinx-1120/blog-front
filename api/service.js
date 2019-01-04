import ajax from './axios'

export function getArtList (params) {
  return ajax.get('articleList', { params }).then(res => res.data)
}

export function getTagList() {
  return ajax.get('tagList').then(res => {
    return res.data
  }).catch(errr => {
    console.error('err ===' + errr)
  })
}

export function getArt(params) {
  return ajax.get(`article/${params.id}`).then(res => res.data)
}

export function likeArt(params) {
  return ajax.post(`/article/likeArticle/${params}`).then(res => res.data)
}

export function searchArt(params) {
  return ajax.get('/search', {params}).then(res => res.data)
}

// 获取评价
export function getComment(params) {
  return ajax.get('/comments', { params }).then(res => res.data)
}

// 提交评价
export function postComment(data) {
  return ajax.post('/comment', data).then(res => res.data)
}

// 获取归档

export function getRecords() {
  return ajax.get('/getrecords').then(res => res.data)
}


