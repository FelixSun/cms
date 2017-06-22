import Vue          from 'vue'
import VueResource  from 'vue-resource'
import {mapState}   from 'vuex'

import Spinner      from './components/share/Spinner.vue'
import Toast        from './components/share/Toast.vue'
import MyCanvas     from './components/share/MyCanvas.vue'

import store        from './store'
import router       from './router'

import './style/index.scss'

Vue.use(VueResource)

Vue.filter('toDate', date => {
  const d = new Date(date)
  return d.getFullYear() + '年' +
    (d.getMonth() + 1) + '月' +
    d.getDate() + '日'
})

new Vue({
  router,
  store,
  components: {Spinner, Toast, MyCanvas},
  computed: mapState(['isLoading', 'isToasting'])
}).$mount('#CMS2')


function saveComments(){
    var data ={};
    data.id = getUrlParam('id');
    data.email = $("#txtemail").val();
    data.content = $("#txtcontent").val();
    console.log(data);
    alert(data.email+"  "+data.id);

}

function getUrlParam(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r!=null) return unescape(r[2]); return null; //返回参数值
} 
