<template>
    <BaseContent>
        <div class="row justify-content-md-center">
            <div class="col-5">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">UserName</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="error_message">
                        {{ error_message }}
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
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

export default {
    name: "UserLogin",
    components: {
        BaseContent: BaseContent,
    },

    setup(){
        const store = useStore();
        let username = ref("");
        let password = ref("");
        let error_message = ref("");

        let login = () => {
            error_message.value = "";
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
        };

        return {
            username,
            password,
            error_message,
            login
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
