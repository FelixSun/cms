<template>
  <section class="users">
    <router-link :to="{name:'user'}"
                 tag="button">新增用户
    </router-link>
    <table>
      <tbody>
      <tr>
        <th>用户名</th>
        <th>密码</th>
        <th>选项</th>
      </tr>
      <tr v-for="(user,index) in users">       
          {{user.name}}        
        <td>
          {{user.pwd }}
        </td>
        <td>
          <router-link class="fa fa-pencil-square-o"
                       :to="{name:'account',query:{id:user._id}}"
                       tag="i">
          </router-link>
          <i class="fa fa-trash"
             @click="deleteUser(user._id)">
          </i>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default{
    created(){
      this.getUsers()
    },
    computed: mapState(['users']),
    methods: mapActions(['getUsers', 'deleteUser'])
  }
</script>
<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../../style/mixins.scss";

  section.users {
    @include rightSide();
    button {
      @include center();
      position: relative;
      width: 200px;
      height: 60px;
      margin: 30px 0;
      font-size: 20px;
    }
    table {
      position: absolute;
      @include center();
      top: 150px;
      width: 60%;
      tr {
        height: 50px;
        th {
          font-weight: normal;
          cursor: pointer;
          &:first-of-type {
            width: 40%;
            min-width: 40px;
          }
          &:nth-of-type(2) {
            width: 30%;
            min-width: 200px;
          }
          &:last-of-type {
            width: 30%;
            min-width: 100px;
            cursor: default;
          }
        }
        td:first-of-type {
          color: $green1;
          cursor: pointer;
        }
        td:nth-of-type(2), td:nth-of-type(3) {
          text-align: center;
        }
        td i {
          color: $green2;
          cursor: pointer;
        }
        td i:after {
          display: inline-block;
          width: 10px;
          content: '';
        }
      }
    }
  }
</style>
