<template>
    <BaseContent>
        <div class="row">
            <div class="col-3">
                <DynamicsInfo />
            </div>
            <div class="col-9">
                帖子列表
            </div>
        </div>
    </BaseContent>
</template>

<script>
import BaseContent from '../components/BaseContent.vue';
import DynamicsInfo from '../components/DynamicsInfo.vue';

export default {
    name: "UserDynamics",
    components: {
        BaseContent: BaseContent,
        DynamicsInfo: DynamicsInfo,
    }
}
</script>
