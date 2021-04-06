<template>
    <div>
        <ul class="poetryList">
            <li v-for="item in poetryList" :key="item.id" @click="toDetail(item)">
                <div class="poetry">
                    <div class="poetry-top flex">
                        <h3>{{ item.name }}
                            <span class="poet">{{ item.poet }}</span>
                        </h3>
                        <div class="tag">{{ item.type }}</div>
                    </div>
                    <div class="poetry-info" v-html="item.content"></div>
                </div>
            </li>
        </ul>
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
    .poetryList{
        background: #fff;
        padding: 20px 30px;
        text-align: left;
        list-style: none;
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
        
        li {
            margin: 20px 30px;
            border-bottom: 1px solid #dcdee4;

            .poetry{
                justify-items: center;
                padding: 20px 0;

                .poetry-top{
                    display: flex;
                    justify-content: space-between ;
                    margin-bottom: 10px;

                    h3{
                        font-weight: normal;
                        margin-right: 10px;

                        .poet{
                            font-size: 14px;
                            color: rgb(138, 138, 138);
                        }
                    }

                    .tag{
                        width: 42px;
                        min-width: 42px;
                        height: 25px;
                        border: 1px solid #66b1ff;
                        border-radius: 19px;
                        color: #66b1ff;
                        font-size: 13px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Normal;
                        line-height: 25px;
                        text-align:center;
                        // margin-left: 50px;
                    }
                }
                .poetry-info{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }
        }
    }
</style>