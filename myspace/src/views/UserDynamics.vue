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

export default {
    name: "UserDynamics",
    components: {
        BaseContent: BaseContent,
        DynamicsInfo: DynamicsInfo,
        DynamicsPosts: DynamicsPosts,
        DynamicsWrites: DynamicsWrites,
    },

    setup(){
        const user = reactive({
            username: "yuzuriha inori",
            lastname: "inori",
            firstname: "yuzuriha",
            followers: 0,
            is_followed: false,
        });
        
        const posts = reactive({
            count: 0,
            posts:[
            ]
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
