<template>
    <div id="header">
        <template  v-if="arr.length>0">
        <Menu mode="horizontal" :theme="theme1" :active-name="path" @on-select="menuVamue">
            <template v-for="(item) in arr">
                <MenuItem :name="item.name" class="a">
                    {{item.title}}
                </MenuItem>
            </template>

            <div class="nav_right">
                <div class="demo-avatar">
                    <Avatar icon="ios-person" size="large" src="/ava2.jpg"/>
                </div>
                <div class="user_name">
                   {{userName}}
                </div>
                <div class="login_out" @click="loginOut">
                    退出
                </div>
            </div>
        </Menu>
        </template>
        <template v-else>
            <div class="head_nav">
                <div style="font-size: 20px;color: #fff;font-weight: bold;letter-spacing:4px">&emsp;<Icon type="md-laptop" />&ensp;欢迎来到天府宠管理平台！</div>

                <div class="nav_right">
                    <div class="demo-avatar">
                        <Avatar icon="ios-person" size="large" src="/ava2.jpg"/>
                    </div>
                    <div class="user_name">
                        {{userName}}
                    </div>
                    <div class="login_out" @click="loginOut">
                        退出
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                path: '/index',
                theme1: 'dark',
                userName:'默认名',
                arr: [
                    // {title: "首页", name: '/index'},
                    // {title: "购物中心", name: '/shop'},
                    // {title: "论坛中心", name: '/talk'},
                    // {title: "个人中心", name: '/porsen'},
                ]
            }
        },
        methods: {
            getUserName(){

              this.userName =  this.ls.getItem('userName')? JSON.parse(this.ls.getItem('userName')):this.userName
            },
            menuVamue(name) {
                if (name == this.path)//如果路径一样不跳转
                    return
                this.$router.push(name)
            },
            loginOut(){
                this.ls.removeItem('userName')
                this.$router.push('/')
            }
        }
        ,
        created(){
            this.getUserName()
        },
        // watch: {
        //     '$route'(to) {
        //
        //         if (to.path.includes(this.path)) {//如果要去的页面路径包含当前路径 激活样式还是和原来一样
        //
        //             this.path = this.path
        //
        //         } else {
        //             this.path = to.path      //否则激活样式换新的路径
        //
        //         }
        //
        //     }
        // }
    }
</script>

<style lang="scss">
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
        // 修改激活样式颜色
        color: deepskyblue !important
    }
    #header{
        position: relative;
        .nav_right{
            position: absolute;
            top: 0px;
            right :30px;
            display: flex;
            color: #ccc;

            .user_name{
                box-sizing: border-box;
                padding: 0px 10px;
                text-align: center;

            }
            .login_out{
                width: 60px;
                height: 60px;
                text-align: center;
                cursor: pointer;

            }
        }
        .head_nav{
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            background: #42444d;
        }

    }

</style>