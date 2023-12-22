<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div v-for="post in posts.posts" :key="post.id">
                    <div class="card single-post">
                        <div class="card-body">
                            {{post.content}} 
                            <button @click="delete_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm">delete</button>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>

</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
    name: "DynamicsPosts",
    props: {
        posts: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props, context){
        const store = useStore();
        const is_me = computed(() => store.state.user.id === props.user.id);

        const delete_post = (post_id) => {
            $.ajax({
            url:"https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "DELETE",
            data:{
                post_id: post_id,
            },
            headers:{
                "Authorization": "Bearer " + store.state.user.access,
            },
            success(resp){
                if(resp.result === "success"){
                    context.emit("delete_post", post_id);
                }
            }
        });
        }

        return {
            is_me,
            delete_post,
        }
    }   
}
</script>

<style scoped>
.single-post{
    margin: 5px 0 5px 0;
}

button {
    float: right;
}
</style>