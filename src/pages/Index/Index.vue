<template>
    <div class="index">
        <div class="left_nav">
            <LeftNav :menuData="menuData"/>
        </div>
        <div class="contairn">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import LeftNav from '../../components/LeftNav/LeftNav'

    export default {
        components: {
            LeftNav
        },
        name: "Index",
        data() {
            return {
                menuData: [
                    {
                        title: '账户管理',
                        iconName:'ios-paper',
                        sonMenu: [
                            {subtit: '用户管理', name: '/index'},
                            {subtit: '商家管理', name: '/index/businessmanger'},
                           {subtit: '供应商管理', name: '/index/suppliermanger'}
                       ]
                    }
                    , {
                        title: '动态管理',
                        iconName:'ios-paper',
                        sonMenu: [
                            {subtit: '动态管理', name: '/index/activemanger'},
                            {subtit: '举报管理', name: '/index/reportmanger'}
                            ]
                    },
                    {
                        title: '财务管理',
                        iconName:'ios-paper',
                        sonMenu: [
                            {subtit: '订单流水', name: '/index/first3'},
                            {subtit: '平台收入流水', name: '/index/first3'},
                            {subtit: '提现流水', name: '/index/first3'}]
                    },
                    {
                        title: '系统管理',
                        iconName:'ios-paper',
                        sonMenu: [
                            {subtit: '系统消息管理', name: '/index/first3'},
                            {subtit: '管理员管理', name: '/index/first3'},
                            {subtit: '销售员管理', name: '/index/first3'},
                            {subtit: '修改密码', name: '/index/first3'},
                            {subtit: '操作日志', name: '/index/first3'}
                            ]
                    }
                ]
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/comcon';

    .index {
        display: flex;
        .left_nav {
            height: 800px;
            background: #515A6E;
        }

    }
</style>