<template>
    <div id="login" :style="{height:Height}">
        <div class="login_box">
            <h2>登录</h2>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline class="form_css">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click.once="handleSubmit('formInline',formInline)">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {

            return {

                Height: '',
                formInline: {
                    user: 'admin',
                    password: '123123'
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ]
                }

            }
        },
        created() {


        },
        methods: {
            getHeight() { //获取浏览器屏幕可见高
                this.Height = window.innerHeight + 'px';
            },
            handleSubmit(name, info) {//name 表单非空验证标识     info 用户名密码参数

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (info.user ==='admin' && info.password ==='123123') {
                              this.ls.setItem('userName',info.user)
                            this.$Message.success('登录成功!');
                            setTimeout(()=>{
                                this.$router.push('/index')

                            },500)
                            return;


                        } else {
                            this.$Message.error('用户名或密码错误!');
                            this.formInline.user = '';
                            this.formInline.password = ''
                        }
                    } else {
                        this.$Message.error('登录失败!');
                    }
                })
            }

        },
        mounted() { //监听浏览器屏幕可见高的事件
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },
        destroyed() {//移除监听事件
            window.removeEventListener('resize', this.getHeight)
        }
    }
</script>

<style lang="scss">
    #login {
        width: 100%;
        height: 100%;
        background: url("../../assets/imgs/login_bj.jpg") no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        .login_box{
            position: absolute;
            width: 300px;
            box-sizing: border-box;
            padding: 20px 20px;
            background: rgba(244,255,222 ,.2);
            top: 30%;
            right:10%;

            h2{
                color: deepskyblue;
            }
            .form_css{
                display: flex;
                flex-direction: column;
                margin-top: 20px;

            }
            .ivu-btn-primary{
                width: 100% !important;
            }
        }

    }
</style>