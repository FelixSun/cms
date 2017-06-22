<template>
  <header class="myHeader">   
  <script src=" http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <div class="circle">
 <router-link :to="{path:'/archive'}"
                 tag="button"
                 class="home">
                一个人
       <img src="../../assets/img/me.jpg" alt="ycwalker">的小站
    </router-link>

      
    </div>
    <ul class="menu">
      <li v-for="link in links">
        <a :href="link.href">
          {{link.name}}
        </a>
      </li>
      <li>
       <router-link :to="{name:'about'}" tag="li">
            <a :to="{name:'about'}" >
            About me
            </a>
          </router-link>     
      </li>
    </ul>
  </header>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    created(){
      this.$store.dispatch('getLinks')
    },
    computed: mapState(['links'])
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>

  header.myHeader {
    min-height: 60px;
    .circle {
      width: 149px;
      height: 75px;     
      overflow: hidden;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    ul {
      float: right;
      margin: 0;
      li {
        list-style: none;
        display: inline-block;
        padding: 18px 14px;
        a {
          color: #2c3e50;
          &:hover {
            text-decoration: none;
            border-bottom: 2px solid #42b983;
          }
        }
      }
    }
  }
</style>
