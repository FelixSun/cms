<template>
  <section class="account">
    <div class="title">修改密码</div>
    <div class="password">
      <i class="fa fa-key fa-fw"></i>
      <input type="input" style='display:none'
             v-model="name">
      <input type="password"
             placeholder="输入新密码"
             v-model="pwd">
      <br>
      <i class="fa fa-key fa-fw"></i>
      <input type="password"
             placeholder="再输入一次"
             v-model="pwdRepeat">
    </div>
    <div class="panel">
      <button @click="savePwd">保存</button>
       <button @click="saveTest">测试</button>
    </div>
  </section>
</template>
<script>
  export default{
    data(){
      return {
        pwd: '',
        pwdRepeat: ''
      }
    },
    created(){
      const id = this.$route.query.id
      if (id) return this.getUser(id)
      this.SET_BUSER()
    },
    methods: {
      savePwd(){
        if (this.pwd === this.pwdRepeat) {
          const id = this.$route.query.id
          if(id){
                this.$store.dispatch('updatePwd', this.pwd)
          }else{
                this.$store.dispatch('savePwd', this.pwd)
          }        
        }
      },
      saveTest(){
        console.log("1111"+this.pwd)
      }
    }
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../../style/mixins.scss";

  section.account {
    height: 100%;
    .title {
      @include title();
    }
    .password {
      width: 260px;
      margin: 100px auto 40px auto;
      input {
        height: 30px;
        padding: 6px;
        margin: 10px auto;
        border-bottom: 1px solid $green1;
      }
    }
    .panel {
      position: absolute;
      bottom: 40px;
      right: 100px;
      button {
        @include greenButton();
        height: 30px;
        width: 80px;
      }
    }
  }
</style>
