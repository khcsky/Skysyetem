<template>
   <div id="leftNav">
       <Menu :theme="theme2" :active-name="path"  :open-names="pathArr" accordion  @on-select="menuVamue" >

               <Submenu  v-for="(item,index) in menuData" :key="index+1" :name="index"  @click.native='capital'>
                   <template slot="title">
                       <Icon :type="item.iconName"></Icon>
                     {{item.title}}
                   </template>
                   <Menu-item v-for="(it, i) in item.sonMenu"  :name="it.name"  >
                       &emsp; &emsp; {{it.subtit}}
                   </Menu-item>
               </Submenu>



       </Menu>
   </div>
</template>

<script>
    export default {
        name: "LeftNav",
        props: ['menuData'],
        data(){
           return{
               path:'/index',
               pathArr:[0],
               theme2:'dark',
           }
        },
        created(){

        if( this.ls.getItem('Path')){

            this.path =  JSON.parse(this.ls.getItem('Path'))
        }
            if( this.ls.getItem('aPath')){

                this.pathArr =  JSON.parse(this.ls.getItem('aPath'))
            }

        },
        mounted(){

        },
        methods:{

            menuVamue(name){
                if (name == this.path)//如果路径一样不跳转
                    return
              this.ls.setItem('Path',name)
                this.$router.push(name)//根据点击的菜单获取对应的router页面并跳转
            },

        },
        watch: {
            '$route'(to) {//监听路由展开对应的项和显示对应的路由

                if( ['/','/index','/index/suppliermanger','/index/businessmanger'].includes(to.path)) {
                    this.pathArr=[0]
                    JSON.stringify(this.ls.setItem('aPath',this.pathArr))

                }else if(['/index/activemanger','/index/reportmanger'].includes(to.path)){

                    this.pathArr=[1]
                    JSON.stringify(this.ls.setItem('aPath',this.pathArr))

                }else {
                    this.pathArr=[0]
                }
                this.path = to.path


            }
        }

    }
</script>

<style lang="scss" >
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active{
    color: dodgerblue !important;
    background-color: #414651 !important;
}
</style>