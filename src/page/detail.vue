<template>
  <div>
    <Myheader :isfixed="false"></Myheader>
    <div class="wrap">
      <section>
        <div class="inner content-center">
          <div class="left flex">
            <div class="poem flex">
              <div class="tag">{{ poemInfo.type }}</div>
              <div class="poem-info">
                <h3>{{ poemInfo.name }}</h3>
                <!-- <span class="author">{{ '['+poemInfo.poet+']' }}</span> -->
                <div class="info" v-html="poemInfo.content"></div>
              </div>
              <div class="download-btn" style="margin-right: 50px;">
                <el-button type="primary" icon="el-icon-download" size="mini" circle @click="download"></el-button>
              </div>
            </div>
            <div class="comment-list">
              <div class="comment-commit flex">
                <div class="commentator flex-column">
                  <img v-if="userAvatar=='null'" class="avatar" :src="defaultUserImg"/>
                  <img v-else-if="userAvatar" class="avatar" :src="userAvatar"/>
                  <span class="commentator-name">{{username}}</span>
                </div>
                <div class="comment">
                  <el-form
                    :model="comment"
                    ref="comment"
                    class="commentForm"
                  >
                    <el-form-item 
                      prop="content" 
                      :rules="[
                        { required: true, message: '请输入评论信息'},
                        { min: 2, max: 200, message: '长度在 2 到 200 个字符'}
                      ]"
                    >
                      <el-input
                        type="textarea"
                        placeholder="请输入评论信息"
                        v-model="comment.content"
                        maxlength="200"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                    <div class="btn">
                      <el-button type="primary" size="small" @click="addComments">发表评论</el-button>
                    </div>
                  </el-form>
                </div>
              </div>
              <ul class="show-commons">
                <li v-for="item in msg" :key="item.id">
                  <div class="comment-info flex">
                    <img :src="item.headerImage" v-if="item.headerImage" style="width: 42px;height: 42px">
                    <img :src="avatar" v-else-if="!item.headerImage" style="width: 42px;height: 42px">
                    <div class="inner user-comment">
                      <span class="user-name">{{ item.userName }}</span>
                      <p class="user-comment">{{ item.content }}</p>
                    </div>
                  </div>
                  <span class="publishing-time">{{ item.createTime }}发表</span>
                </li>
              </ul>
              <div class="pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  layout="slot, prev, pager, next"
                  :current-page="this.commentForm.page"
                  :page-size="this.commentForm.limit"
                  :total="total"
                  v-if="total != 0">
                  <span class="page-total">共<span>{{ realTotal }}</span>条</span>
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="right-box">
              <div class="author-info">
                <div class="author-info-top">
                  <img :src="authorAvatar" class="authorAvatar" @click="toAuthorDetail">
                  <h3 @click="toAuthorDetail">{{poetInfo.name}}</h3>
                  <h5>{{'﹝'+poetInfo.dynasty+'﹞'}}</h5>
                </div>
                <p>{{poetInfo.description}}</p>
              </div>
              <RankingList :rankingList = 'rankingList'></RankingList>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import avatar from '../assets/img/avatar.png'
import defaultUserImg from '../assets/img/avatar.png'
import header from '../components/header'
import RankingList from '../components/rankingList.vue'
export default {
  components:{
    Myheader: header,
    RankingList: RankingList,
  },
  data(){
    return{
      total:0,
      realTotal: 0,
      avatar: avatar,
      defaultUserImg:defaultUserImg,
      userAvatar: localStorage.userImg,
      authorAvatar: '',
      username: localStorage.username,
      poemInfo: {},
      poetInfo: {},
      msg:[],
      rankingList:[],
      comment:{
        poetryId:'',
        userId: localStorage.userId,
        content:''
      },
      commentForm: {
        id: '',
        page: 1,
        limit:10,
      },
      path:'',
      poetId:{
        id:''
      },
      formRules: {
        content: [
          { required: true, message: '请输入评论信息', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.rankingList = this.getRankingList()
  },
  watch:{
    // 监听路由参数变化
    '$route.query': {
      handler() {
        this.commentForm.id = this.comment.poetryId = this.$route.query.poetryId
        this.poetId.id = this.$route.query.poetId
        this.loadInfo()
      },
      deep: true,
    }
  },
  mounted(){
    this.commentForm.id = this.comment.poetryId = this.$route.query.poetryId
    this.poetId.id = this.$route.query.poetId
    this.loadInfo()
  },
  methods:{
    loadInfo(){
      this.getPoetryInfo()
      this.getPoetInfo()
    },
    //获取诗人详情
    getPoetInfo(){
      this.$api.detail.poet(this.poetId).then(res => {
        this.poetInfo = res.data
        this.authorAvatar = res.data.headPortraitBase64
      })
    },
    //获取诗词详情
    getPoetryInfo(){
      this.$api.detail.poetry(this.commentForm).then(res => {
        this.poemInfo = res.data
        this.url = res.data.url
        this.total = res.data.comments.total
        this.realTotal = res.data.comments.total
        this.allIndex = Math.ceil(this.total / 10)
        this.msg = res.data.comments.records
        console.log(this.msg)
      })
    },
    //分页
    handleSizeChange(e){
      this.commentForm.page = e
      this.getPoetryInfo()
    },
    handleCurrentChange(e){
      this.commentForm.page = e
      this.getPoetryInfo()
    },
    // 获取排行榜
    getRankingList(){
      const params = {
        page: 1,
	      limit: 10
      }
      this.$api.rank.ranking(params).then(res => {
        this.rankingList = res.data.records
      })
    },
    // 添加评论
    addComments(){
      this.$refs.comment.validate(async (valid) => {
        if (valid) {
          this.$api.comment.addComment(this.comment).then(res => {
            if (res.msg === '操作成功') {
              this.$message({message: '评论成功！', type: 'success'})
              location.reload()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 下载
    download(){
      window.location.href = process.env.BASE_URL+this.poemInfo.url
    },
    // 去作者详情页
    toAuthorDetail(){
      this.$utils.toPage(`/authorDetail?id=${this.poetId.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-total{
  font-size: 11px;
  padding-right: 27px;
  color: #8e8f93;
  font-weight: normal;
  span{
    font-size: 13px;
    padding:0 5px;
    color: #4f5054;
    font-weight: normal;
    text-align: center;
  }
}
/deep/.el-pagination{
  float: right;
  padding: 25px 0;
  margin-right: 43px;
}

.el-form {
margin: 20px 20px 0 0;

}
.btn {
  display: flex;
  justify-content: flex-end;
  width: 600px;
}

.wrap{
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  margin-top: 70px;

  section{
    width: 100%;
    margin: 0 auto;

    .content-center{
      display: flex;
      justify-content: center;
      min-width: 1300px;

      .left{
        width: 800px;
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .poem{
          background: #FFF;
          margin-bottom: 28px;
          margin-top: 16px;
          box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
          display: flex;
          justify-content: space-between;
          padding: 20px 0;

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
            margin-left: 50px;
          }
          .poem-info{
            text-align:center;
            
            h3{
              color:#333333;
              margin-bottom: 10px;
              font-weight: normal;
              letter-spacing: 4px;
            }
            .author{
              color: #ADADAD;
              font-size: 14px;
              letter-spacing: 2px;
            }
            .info{
              margin-top: 10px;
              font-size: 15px;
              color:#333333;
              letter-spacing: 2px;
              line-height: 25px;
            }
          }

        }

        .comment-list{
          background: #FFF;
          box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
          
          .pagination{

          }
          .comment-commit{
            display: flex;
            justify-content: center;

            .commentator{
              display: flex;
              flex-direction: column;
              margin: 20px 0 0 30px;
              align-items: center;
              color: #66b1ff;
              line-height: 30px;
              font-size: 14px;

              .avatar{
                width: 42px;
                height: 42px;
                border-radius: 50%;
                overflow:hidden;
              }
            }

            .comment{
              margin: 0 30px;
            }
          }

          .show-commons {
            padding: 20px 30px;
            text-align: left;
            list-style: none;
            li {
              text-indent: 2em;
              margin: 20px 30px;
              border-top: 1px solid #dcdee4;

              .comment-info {
                display: flex;
                justify-items: center;
                padding: 20px 0;

                .user-comment {
                  width: 100%;
                  .user-name{
                    color: #66b1ff;
                    font-size: 14px;
                    display:block;
                  }
                  .user-comment{
                    color: #58595d;
                    font-size: 13px;
                    padding: 0 0 0 30px;
                    text-indent: 0 !important;
                    width: 100%;
                    word-break: break-word;
                  }
                }
              }
              .publishing-time{
                display: flex;
                justify-content: flex-end;
                color: #999999;
                font-size: 14px;
              }
            }
          }
        }
      }

      .right{
        width: 300px;
        height: 100%;
        padding: 16px 0px;

        .right-box{
          .author-info{
            align-items: center;
            background-color: #fff;
            margin-bottom: 28px;
            box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.10);
            padding: 10px 20px;
            color: #58595d;

            .author-info-top{
              display: flex;
              margin-bottom: 10px;
              align-items: center;
              
              h3{
                font-weight: normal;
                letter-spacing: 4px;
                cursor: pointer;
                
              }
              h5{
                font-weight: normal;
                letter-spacing: 1px;
              }

              .authorAvatar{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-right: 20px;
                object-fit: cover;
                cursor: pointer;
              }
            }
            p{
              font-size: 15px;
              text-indent:2em;
            }
          }
        }
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
      }
    }
  }
}
</style>
