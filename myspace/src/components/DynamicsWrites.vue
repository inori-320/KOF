<template>
    <div class="card edit_field">
        <div class="card-body" style="display: flex; flex-direction: column; align-items: center;">
            <label for="edit_post" class="form-label">edit a post</label>
            <textarea v-model="content" class="form-control" id="edit_post" rows="3"></textarea>
            <button @click="submit_post" class="btn btn-primary btn-sm">submit</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "DynamicWrites",
    setup(props, context){
        let content = ref('');

        const submit_post = () => {
            let is_post = false;
            for(let i = 0; i < content.value.length; i++){
                if (content.value[i] !== ' '){
                    is_post = true;
                }
            }
            if(is_post){
                context.emit("submit_post", content.value);              
            }
            content.value = "";
        }

        return {
            content,
            submit_post
        }
    }
}
</script>

<style scoped>
.edit_field{
    margin-top: 15px;
}

button{
    margin-top: 10px;
    width: 100%;
}
</style>