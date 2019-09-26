<template>
  <div id="app">
    <div class="hader_nav" v-if="!['/','/login'].includes(path)">
         <Header/>
    </div>
    <div class="content">
         <router-view/>
    </div>
  </div>
</template>
<script>
  import Header from './components/Header/Header'
  export default {
      components:{
          Header
      },
      data(){
          return{
              path:''
          }
      },
      created(){
        // this.path = this.$route.path
        //   console.log(this.path,444444444,this.$route.path)
      },
      watch: {
          '$route'(to) {

                  this.path = to.path      //监听路由显示导航头部


          }
      }

  }
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  /*min-width: 1440px;*/
  /*min-height: 900px;*/


}

</style>
