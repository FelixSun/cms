<template>
  <main class="wrap">
    <my-header></my-header>
    <section class="article">
    <h2>关于我：</h2>
    <div class='me'>
        电话：15724735810<br/>
        邮箱：1074446724@qq.com<br/>
        程序猿一枚，12年毕业入行至今。热爱开发，对新技术有很强的兴趣。
    </div>
     <div class='skill'>
        <span>站点技术点：</span></br>
        vue模块化开发实现<br/>
        vue routing配置路由<br/>
        node+express+mongo开发API接口<br/>
        webpack+es6+sass+vuex 后台管理，前端站点主要技术点
     </div>
      </article>
    </section>    
    
    <my-footer></my-footer>
  </main>
</template>
<script>
  import {mapState}   from 'vuex'
  import marked       from '../../assets/js/marked.min'
  import hljs         from '../../assets/js/highlight.pack'
  import MyHeader     from './MyHeader.vue'
  import MyFooter     from './MyFooter.vue'

  export default{
    created(){
      
    },
    updated(){
      
    },
    methods: {
     
    },
    components: {MyHeader, MyFooter},
    watch: {
     
    }
  }



</script>

<style lang="sass" rel="stylesheet/scss">
  @import "../../style/variables";

  .wrap {
    min-height: 100%;
    position: relative;
  }

  section.me {
    line-height:30px;
    margin:15px 0 30px 0;

  }
  section.skill{
      span{
          font-size:22px;
          font-weight:bold;
      }
      line-height:30px;
  }
 
</style>
