<template>

   <div id='comment' class='comment'>
      <div v-for="(comment,index) in comments">
        <div>
          <span class="cname">{{comment.nickName}}</span>
          <span class="ctime">发表于 {{comment.createdate}}</span>
        </div>
        <div>
          <span class="ccontent">{{comment.content}}</span>
        </div>
      </div>
      <div>
        <input type='text' v-model.trim='nickName' class='txtemail' placeholder='大侠怎么称呼'/>
      </div>
      <div>
        <input type='text' v-model.trim='email' class='txtemail' placeholder='邮箱地址'/>
      </div>
      <div>
        <textarea class='txtcontent' v-model.trim='content' placeholder='走过，看过，请留下您的评论哦！'></textarea>
         <p class="info">{{info}}</p>
      </div>
      <button class='subSaveComment' @click='save'>Submit</button>
    </div>    
</template>
<script>
  import {mapState,mapActions,mapMutations}   from 'vuex'

  export default{
    data(){
        return {
            nickName: '',
            info: '',
            email: '',
            content: ''
        }
    },
    created(){           
         this.$store.dispatch('getComments', this.$route.query.id)     
    },
    methods: {    
      save(){        
        if (!this.nickName.length) return this.info = '大侠请留下名号！'
        if (!this.email.length) return this.info = '邮箱地址何在？'
        if (!this.content.length) return this.info = '大侠，请先留言再保存可好！'
        
        this.SET_COMMENT({nickName: this.nickName, email: this.email, content: this.content, articleID: this.$route.query.id, createdate: '2017-06-26 11:40:51'})
        this.saveComment()
          .then( 
              this.$store.dispatch('getComments', this.$route.query.id) , 
              this.nickName='',
              this.email='',
              this.content=''   
              )
          .catch(err => console.log(err))
      },
      ...mapActions(['saveComment']),
      ...mapMutations(['SET_COMMENT']),
      clearInfo(){
        this.info = ''
      },
    },
    computed:{
      ...mapState(['comment']),
      ...mapState(['comments'])
    },
    watch: {
      nickName: 'clearInfo',
      email: 'clearInfo',
      content:'clearInfo'
    }
  }

</script>

<style lang="sass" rel="stylesheet/scss">
  @import "../../style/variables";

  div.comment{
    padding-bottom: 160px;
    line-height: 40px;
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
    .txtcontent{
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
    .cname{
        margin-right:20px;
        color:dodgerblue !important;
    }
    .ctime{
        font-size:14px;
        color: black;
    }
    .ccontent{
        padding: 5px 30px;
        color: orangered;
    }
    .info{
        color: red;
        font-size: 16px;
        margin-bottom: 15px;
    }
  }
 
</style>