<template>
    <BaseContent style="margin-bottom: 20px;">
        <div class="card" v-for="user in users" :key="user.id">
            <dic class="card-body">
                <div class="row">
                    <div class="col-1 img_field">
                        <img class="img-fluid" :src="user.photo" alt="head" @click="open_user_profile(user.id)">
                    </div>
                    <div class="col-11">
                        <div class="username" @click="open_user_profile(user.id)">{{ user.username }}</div>
                        <div class="follow-count">number of fans: {{ user.followerCount }}</div>
                    </div>
                </div>
            </dic>
        </div>
    </BaseContent>
</template>

<script>
import BaseContent from '../components/BaseContent.vue';
import $ from 'jquery';
import { ref } from 'vue';
import router from '@/router/index';
import { useStore } from 'vuex';

export default {
    name: "UserList",
    components: {
        BaseContent: BaseContent,
    },
    setup(){
        let users = ref([]);
        const store = useStore();
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
            type: "get",
            success(resp){
                users.value = resp;
            }
        });

        const open_user_profile = (userId) => {
            if(store.state.user.is_login){
                router.push({
                    name: "dynamics",
                    params:{
                        userId: userId,
                    }
                })
            } else {
                router.push({
                    name: "login"
                })
            }
            
        };

        return {
            users,
            open_user_profile,
        }
    }
}
</script>

<style scoped>
img{
    cursor: pointer;
    border-radius: 50%;
}

.card{
    margin: 10px 0 10px 0;
    transition: 500ms;
}

.card:hover{
    box-shadow: 2px 2px 20px lightgray;
}

.username{
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    height: 50%;
}

.follow-count{
    height: 50%;
    font-size: 15px;
    color: gray;
}
.img_field{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
