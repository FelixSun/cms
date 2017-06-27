import Vue from 'vue'

const beginLoading = commit => {
  commit('LOADING_TOGGLE', true)
  return Date.now()
}

const stopLoading = (commit, start, timeAllowed = 400) => {
  const spareTime = timeAllowed - (Date.now() - start)
  setTimeout(commit, spareTime > 0 ? spareTime : 0, 'LOADING_TOGGLE', false)
}

const doToast = (state, commit, payload) => {
  commit('SET_TOAST', payload)
  commit('TOASTING_TOGGLE', true)
  return state.toast.promise
}

Promise.prototype.finally = function (callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => {
      throw reason
    })
  )
}

export default {
  getArticles: ({commit}) => {
    const start = beginLoading(commit)
    return Vue.http.get('/api/getArticles')
      .then(response => response.json())
      .then(articles => {
        stopLoading(commit, start)
        commit('SET_ARTICLES', articles)
      })
  },
  getArticle ({commit}, id) {
    const start = beginLoading(commit)
    return Vue.http.get('/api/getArticle', {params: {id}})
      .then(response => {
        stopLoading(commit, start)
        commit('SET_ARTICLE', response.data)
      })
  },
   readNum ({commit,dispatch},id)  {
     return Vue.http.post('/api/readNum',{id})
       .then()
       .catch((err)=>console.log(err))
  },
  saveArticle ({state, commit}) {
    return Vue.http.post('/api/saveArticle', state.article)
      .then(
        () => doToast(state, commit, {info: '保存成功,是否返回?', btnNum: 2}),
        () => doToast(state, commit, {info: '保存失败', btnNum: 1})
      )
      .finally(() => commit('TOASTING_TOGGLE', false))
  },
  deleteArticle ({state, commit, dispatch}, id) {
    return doToast(state, commit, {info: '确定要删除吗?', btnNum: 2})
      .then(() => Vue.http.post('/api/deleteArticle', {id}))
      .finally(() => commit('TOASTING_TOGGLE', false))
      .then(() => dispatch('getArticles'))
      .catch(() => {
      })
  },
  deleteUser({state, commit, dispatch}, id){
    //alert(id)
     return doToast(state, commit, {info: '确定要删除吗?', btnNum: 2})
      .then(() => Vue.http.post('/api/deleteUser', {id}))
      .finally(() => commit('TOASTING_TOGGLE', false))
      .then(() => dispatch('getUsers'))
      .catch(() => {
      })
  },
  getUsers:({commit})=>{
    const start = beginLoading(commit)
    return Vue.http.get('/api/getUsers')
      .then(response => response.json())
      .then(users => {
        stopLoading(commit, start)
        commit('SET_USERS', users)
      })
  },
  getUser:({commit},id)=>{
    const start = beginLoading(commit)
    return Vue.http.get('/api/getUser',{params:{id}})
      .then(response => response.json())
      .then(buser => {
        stopLoading(commit, start)
        commit('SET_BUSER', buser)
      })
  },
  saveUser({state,commit}){
     return Vue.http.post('/api/saveUser', state.buser)
      .then(
        () => doToast(state, commit, {info: '保存成功,是否返回?', btnNum: 2}),
        () => doToast(state, commit, {info: '保存失败', btnNum: 1})
      )
      .finally(() => commit('TOASTING_TOGGLE', false))
  },
  getLinks ({commit}) {
    return Vue.http.post('/api/getLinks')
      .then(response => {
        commit('SET_LINKS', response.data)
      })
  },
  saveLinks ({state, commit}) {
    return Vue.http.post('/api/saveLinks', state.links)
      .then(
        () => doToast(state, commit, {info: '保存成功', btnNum: 1}),
        () => doToast(state, commit, {info: '保存失败', btnNum: 1})
      )
      .finally(() => commit('TOASTING_TOGGLE', false))
  },
  savePwd ({state, commit}, pwd) {
    return Vue.http.post('/api/savePwd', {name: state.user.name, pwd})
      .then(
        () => doToast(state, commit, {info: '保存成功', btnNum: 1}),
        () => doToast(state, commit, {info: '保存失败', btnNum: 1})
      )
      .finally(() => commit('TOASTING_TOGGLE', false))
  },
  updatePwd ({state, commit}, pwd) {
    return Vue.http.post('/api/savePwd', {name: state.buser.name, pwd})
      .then(
        () => doToast(state, commit, {info: '保存成功', btnNum: 1}),
        () => doToast(state, commit, {info: '保存失败', btnNum: 1})
      )
      .finally(() => commit('TOASTING_TOGGLE', false))
  },

  login ({commit}, payload) {
    return Vue.http.post('/api/login', payload)
      .then(response => {
        if (response.data.state === 1) {
          commit('SET_USER', payload)
        } else {
          return Promise.reject(response.data.msg)
        }
      })
  },
  getComments({commit},id){
    
    return Vue.http.get('/api/getComments', {params: {id}})
      .then(response => response.json())
      .then(comments => {
        commit('SET_COMMENTS', comments)
      })
  },
  saveComment({state,commit,dispatch}){
    var data ={
      email: state.comment.email,
      nickName: state.comment.nickName,
      content: state.comment.content,
      articleID: state.comment.articleID
    }
    var id = state.comment.articleID
    return Vue.http.post('/api/saveComment', data)
      .then(() =>  dispatch('getComments',{params:{id}}))
      .then()
      .finally(() => commit('TOASTING_TOGGLE', false))
  }
}
