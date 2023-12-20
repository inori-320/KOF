<template>
    <div class="card info">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img width="50px" src="../assets/inori.jpg" alt="head">
                </div>
                <div class="col-9">
                    <div id="username">{{fullName}}</div>
                    <div id="fans">number of fans: {{ user.followers }}</div>
                    <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm">unsubscribe</button>
                    <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-success btn-sm">+subscribe</button>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: "DynamicsInfo",
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    setup(props, context){
        let fullName = computed(() => props. user.firstname + ' ' + props.user.lastname);
        
        const follow = () => {
            context.emit("follow");
        }

        const unfollow = () => {
            context.emit("unfollow");
        }

        return {
            follow,
            unfollow,
            fullName,
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
</style>