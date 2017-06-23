<template>
  <main class="wrap">
    <my-header></my-header>
    <section class="article">
    
      <article class="block">
        <div class="title">{{article.title}}</div>
        <div class="ltitle"><span>阅读({{article.readNum}})</span></div>
        <div class="info">{{article.date |toDate}}</div>
        <div class="content" v-html="article.content"></div>
      </article>
    </section>    
    <div id='comment' class='comment'>
      <div>
        <input type='text' id='txtemail' v-model='email' class='txtemail' placeholder='邮箱地址'/>
      </div>
      <div>
        <textarea id='txtcontent' v-model='contents' placeholder='走过，看过，请留下您的评论哦！'></textarea>
         <p class="info">{{info}}</p>
      </div>
      <button class='subSaveComment' onclick='saveComments()'>Submit</button>
    </div>    
    <my-footer></my-footer>
  </main>
</template>
<script>
  import {mapState,mapActions}   from 'vuex'
  import marked       from '../../assets/js/marked.min'
  import hljs         from '../../assets/js/highlight.pack'
  import MyHeader     from './MyHeader.vue'
  import MyFooter     from './MyFooter.vue'

  export default{
    created(){      
      this.readNum()      
      this.fetchData()      
    },
    updated(){
      this.highlight()
    },
    methods: {
      fetchData(){
        this.$store.dispatch('getArticle', this.$route.query.id)        
      },
      highlight(){
        setTimeout(() => {
          hljs.initHighlighting.called = false
          hljs.initHighlighting()
        }, 0)
      },
      readNum(){
        this.$store.dispatch('readNum', this.$route.query.id)        
      },
    },
    computed: mapState({
      article: state => {
        state.article.content = marked(state.article.content || '')
        return state.article
      }
    }),
    components: {MyHeader, MyFooter},
    watch: {
      '$route': ['fetchData', 'highlight']
    }
  }



</script>

<style lang="sass" rel="stylesheet/scss">
  @import "../../style/variables";

  .wrap {
    min-height: 100%;
    position: relative;
  }

  section.article {
    line-height: 1.6;
    padding-bottom: 160px;
    article {
      .title {
        margin: 0.65em 0;
        font-size: 1.5em;
      }
      .info {
        color: #7f8c8d;
        margin: 1.2em 0;
        span {
          margin-left: 0.5rem;
        }
      }
      .content {
        h2, h3, h4, h5, h6 {
          position: relative;
          margin: 1em 0;
          &:before {
            content: "#";
            color: $green1;
            position: absolute;
            left: -0.7em;
            top: -4px;
            font-size: 1.2em;
            font-weight: bold;
          }
        }
        h4, h5, h6 {
          &:before {
            content: ""
          }
        }
        h2, h3 {
          font-size: 22px
        }
        h4, h5, h6 {
          font-size: 18px
        }
        a {
          color: $green1;
          word-break: break-all;
        }
        blockquote {
          margin: 2em 0;
          padding-left: 20px;
          border-left: 4px solid $green1;
        }
        img {
          display: block;
          max-width: 100%;
          margin: 1em auto
        }
        code,
        pre {
          font-size: 0.8em;
          background-color: #f8f8f8;
          font-family: 'Roboto Mono', Monaco, courier, monospace;
          color: #525252;
        }
      }
      .ltitle{
      text-align:right;
      padding-right:50px;
      }
    }    
  }
  div.comment{
    .subSaveComment {
      border: 1px solid #42b983;
      color: #42b983;
      background-color: #fff;
      transition: all .6s;
      border-radius: 4px;
      float: left;
      height: 30px;
      width: 80px;
      margin-left:5px;
    }
    .txtemail{
      border: 1px solid gray;
      width: 50%;
      margin-left: 5px;
      line-height: 30px;  
      padding:1px 6px;
    }
    #txtcontent{
      resize: none;
      width: 98%;
      height: 150px;
      margin: 5px;
      border: 1px solid gray;
      padding:1px 6px;
    }
    .subSaveComment:hover{
      color:white;
      background-color:#42b983;
    }
  }
 
</style>
