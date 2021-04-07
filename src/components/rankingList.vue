<template>
  <div>
    <div class="ranking-info">
        <h2>诗词排行榜</h2>
        <ul class="rankList">
            <li v-for="(item, index) in rankingList" :key="index" @click="toDetail(item)">{{'《'+item.poetry+'》'}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        rankingList:{
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        // 跳转详情页
        toDetail(item){
            let {poetryId,poetId} =item
            this.$utils.toPage(`/detail?poetryId=${poetryId}&poetId=${poetId}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.ranking-info{
    background-color: #fff;

    h2{
        font-family: MicrosoftYaHei;
        font-size: 18px;
        letter-spacing: 1px;
        color: #343539;
        border-bottom: 1px solid #dbdcdf;
        padding: 0 18px;
        line-height: 40px;
        display: flex;
        font-weight: normal;
    }
    .rankList{
        width: 100%;
        background-color: #ffffff;
        text-align: center;

        li{
            width: 100%;
            display: flex;
            align-items: center;
            height: 48px;
            cursor: pointer;
            font-family: MicrosoftYaHeiLight;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #58595d;
            padding: 0 20px;

            &:hover{
            background-color: rgba(56,103,242,.08);
            }
        }
    }
}
</style>