<template>
    <div class="card">
        <dic class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" src="../assets/inori.jpg" alt="head">
                </div>
                <div class="col-9">
                    <div id="username">lty</div>
                    <div id="fans">number of fans: 999</div>
                    <button type="button" class="btn btn-success btn-sm">subscribe</button>
                </div>
            </div>            
        </dic>
    </div>

</template>

<script>
export default {
    name: "DynamicsInfo",
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
</style>