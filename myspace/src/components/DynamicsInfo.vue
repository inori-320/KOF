<template>
    <div class="card info">
        <div class="card-body">
            <div class="row">
                <div class="col-3 img_field">
                    <img class="img-fluid" :src="user.photo" alt="head">
                </div>
                <div class="col-9">
                    <div id="username">{{user.username}}</div>
                    <div id="fans">number of fans: {{ user.followers }}</div>
                    <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm">unsubscribe</button>
                    <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-success btn-sm">+subscribe</button>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
    name: "DynamicsInfo",
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    setup(props, context){
        const store = useStore();

        const follow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data: {
                    target_id: props.user.id,
                },
                headers:{
                    "Authorization": "Bearer " + store.state.user.access,
                },
                success(resp){
                    if(resp.result === "success"){
                        context.emit("follow");
                    }
                }
            });
        }

        const unfollow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data: {
                    target_id: props.user.id,
                },
                headers:{
                    "Authorization": "Bearer " + store.state.user.access,
                },
                success(resp){
                    if(resp.result === "success"){
                        context.emit("unfollow");
                    }
                }
            });
        }

        return {
            follow,
            unfollow,
        }
    }
}
</script>

<style scoped>
img{
    border-radius: 50%;
}

#username{
    font-weight: bold;
}

#fans{
    font-size: 12px;
    color: gray;
}

button{
    padding: 2px 4px;
    font-size: 13px;
}

.info{
    margin-bottom: 15px;
}

.img_field{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>