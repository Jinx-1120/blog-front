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
  return ajax.get('search', {params}).then(res => res.data)
}


