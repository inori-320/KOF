<template>
    <BaseContent>
        <div class="row justify-content-md-center">
            <div class="col-5">
                <form>
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
                        <input v-model="password" type="password" class="form-control" id="confirm_password">
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

export default {
    name: "UserList",
    components: {
        BaseContent: BaseContent,
    },

    setup(){
        let username = ref("");
        let password = ref("");
        let confirm_password = ref("");
        let error_message = ref("");
        
        return {
            username,
            password,
            confirm_password,
            error_message
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
