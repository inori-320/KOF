<template>
    <BaseContent>
        <div class="row">
            <div class="col-3">
                <DynamicsInfo @follow="follow" @unfollow="unfollow" :user="user" />
                <DynamicsWrites @submit_post="submit_post" />
            </div>
            <div class="col-9">
                <DynamicsPosts :posts="posts"/>
            </div>
        </div>
    </BaseContent>
</template>

<script>
import { reactive } from 'vue';
import BaseContent from '../components/BaseContent.vue';
import DynamicsInfo from '../components/DynamicsInfo.vue';
import DynamicsPosts from '../components/DynamicsPosts.vue';
import DynamicsWrites from '../components/DynamicsWrites.vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: "UserDynamics",
    components: {
        BaseContent: BaseContent,
        DynamicsInfo: DynamicsInfo,
        DynamicsPosts: DynamicsPosts,
        DynamicsWrites: DynamicsWrites,
    },

    setup(){
        const route = useRoute();
        const userId = route.params.userId;
        const store = useStore();
        const user = reactive({});
        const posts = reactive({});

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            data: {
                user_id: userId,
            },
            headers:{
                "Authorization": "Bearer " + store.state.user.access,
            },
            success(resp){
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followers = resp.followerCount;
                user.is_followed = resp.is_followed;
            },
        });

        $.ajax({
            url:"https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "GET",
            data:{
                user_id: userId,
            },
            headers:{
                "Authorization": "Bearer " + store.state.user.access,
            },
            success(resp){
                posts.posts = resp;
            }
        });

        const follow = () => {
            if(user.is_followed) return;
            user.is_followed = true;
            user.followers ++;
        }

        const unfollow = () => {
            if(!user.is_followed) return;
            user.is_followed = false;
            user.followers --;
        }

        const submit_post = (content) => {
            posts.count ++;
            posts.posts.unshift({
                id: posts.count,
                userId: 1,
                content: content
            });
        }

        return {
            user: user,
            follow,
            unfollow,
            posts,
            submit_post,
        }
    }
}
</script>
