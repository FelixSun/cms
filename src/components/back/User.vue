<template>
<div id="setup">
  <div class="form">   
    <p>
      新增后台管理账号
    </p>
    <p class="input">
      <i class="fa fa-user fa-fw"></i>
      <input type="text"
             placeholder="输入用户名"
             v-model.trim="name">
    </p>
    <p class="input">
      <i class="fa fa-key fa-fw"></i>
      <input type="password"
             placeholder="输入密码"
             v-model.trim="pwd">
    </p>
    <p class="input">
      <i class="fa fa-key fa-fw"></i>
      <input type="password"
             placeholder="确认输入"
             v-model.trim="pwdRepeat">
    </p>
    <p class="info">{{info}}</p>
    <p>
      <button @click="save">提交</button>
    </p>
  </div>
</div>
</template>
<script>
  import {mapState, mapActions, mapMutations} from 'vuex'


  export default{
    data(){
        return {
            name: '',
            info: '',
            pwd: '',
            pwdRepeat: ''
        }
    },
    methods: {
      save(){
        if (!this.name.length) return this.info = '请输入合适的用户名'
        if (this.pwd.length < 5) return this.info = '密码长度太短'
        if (this.pwd !== this.pwdRepeat) return this.info = '两次输入的密码不一致'
        console.log(this.name+this.pwd)
        this.SET_BUSER({name: this.name, pwd: this.pwd})
        this.saveUser()
          .then(() => this.$router.push({name: 'users'}))
          .catch(err => console.log(err))
      },
      ...mapActions(['saveUser']),
      ...mapMutations(['SET_BUSER'])
    },
    computed: {
      ...mapState(['buser'])
    }
  }
</script>
 <style  lang="sass" rel="stylesheet/scss" scoped>
    .form {
      width: 500px;
      height: 400px;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .icon i {
      transition: all 4s;
    }

    .icon i:hover {
      transform: rotate(1440deg);
    }

    .info {
      margin: 10px;
      font-size: 12px;
      height: 20px;

    }

    .input:hover {
      color: #3aa373;
    }

    p {
      color: #7f8c8d;
      height: 50px;
      text-align: center;
      transition: all 0.4s;
    }

    p input {
      transition: all 0.4s;
      width: 200px;
      padding: 8px;
      border-bottom: 1px solid #42b983;
    }

    p input:focus {
      width: 210px;
    }

    button {
      transition: all 0.4s;
      color: #7f8c8d;
      border: 1px solid #3aa373;
      border-radius: 4px;
      width: 60px;
      height: 30px;
      cursor: pointer;
    }

    button:hover {
      background-color: #3aa373;
      color: #FFF;
    }
  </style>