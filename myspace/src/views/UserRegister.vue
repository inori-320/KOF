<template>
    <BaseContent>
        <div class="row justify-content-md-center">
            <div class="col-5">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">UserName</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="mb-3">
                        <label for="confirm_password" class="form-label">Confirm Password</label>
                        <input v-model="confirm_password" type="password" class="form-control" id="confirm_password">
                    </div>
                    <div class="error_message">
                        {{ error_message }}
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>                        
            </div>
        </div>

    </BaseContent>
</template>

<script>
import BaseContent from '../components/BaseContent.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import $ from 'jquery';

export default {
    name: "UserRegister",
    components: {
        BaseContent: BaseContent,
    },

    setup(){
        const store = useStore();
        let username = ref("");
        let password = ref("");
        let confirm_password = ref("");
        let error_message = ref("");

        let register = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/user/",
                type: "POST",
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: confirm_password.value,
                },
                success(resp){
                    if(resp.result === "success"){
                        store.dispatch("login",{
                            username: username.value,
                            password: password.value,
                            success(){
                                router.push({name: 'home'});
                            },
                            error(){
                                error_message.value = "something was wrong in username or password.";
                            }
                        });
                    } else if(resp.result === "用户名和密码不能为空") {
                        error_message.value = "username and password can not empty";
                    } else if(resp.result === "两个密码不一致") {
                        error_message.value = "password and confirm password is not same";
                    } else if(resp.result === "用户名已存在") {
                        error_message.value = "the username is already exist";
                    }
                }
            });
            error_message.value = "";
        };

        return {
            username,
            password,
            confirm_password,
            error_message,
            register,
        }
    }
}
</script>

<style scoped>
.error_message{
    color: red;
    margin: 20px 0 10px 0;
}
</style>
