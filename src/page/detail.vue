<template>
  <div>
    <Myheader></Myheader>
    <div class="wrap">
      <section>
        <div class="inner content-center">
          <div class="left flex">
            <div class="poem flex">
              <div class="tag">标签</div>
              <div class="poem-info">
                <h3>《望庐山瀑布》</h3>
                <span class="author">李白</span>
                <p class="info">独发到</p>
              </div>
              <div class="download-btn" style="margin-right: 50px;">
                <el-button type="primary" icon="el-icon-download" size="mini" circle></el-button>
              </div>
            </div>
            <div class="comment-list">
              <div class="comment-commit flex">
                <div class="commentator flex-column">
                  <img class="avatar" :src="avatar" style="width: 42px;height: 42px">
                  <span class="commentator-name">{{username}}</span>
                </div>
                <div class="comment">
                  <el-form
                    :model="formData"
                    :rules="formRuls"
                    ref="ruleForm"
                    class="demo-ruleForm"
                  >
                    <el-form-item prop="content">
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="formData.content"
                        maxlength="200"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                    <div class="btn">
                      <el-button type="primary" size="small" @click="addCommons">发表评论</el-button>
                    </div>
                  </el-form>
                </div>
              </div>
              <ul class="show-commons">
                <li v-for="item in msg" :key="item.id">
                  <div class="comment-info flex">
                    <img :src="avatar" style="width: 42px;height: 42px">
                    <div class="inner user-comment">
                      <span class="user-name">{{ item.name }}</span>
                      <p class="user-comment">{{ item.text }}</p>
                    </div>
                  </div>
                  <span class="publishing-time">{{ item.time }}发表</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="right">
            <div class="right-box">
              <div class="right-info">
                <h2>诗词排行榜</h2>
                <ul class="rankList">
                  <li v-for="(item, index) in rankingList" :key="index" @click="toDetail(item)">{{item.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import avatar from '../assets/img/avatar.png'
import header from '../components/header'
export default {
  components:{
    Myheader: header,
  },
  data(){
    return{
      avatar: avatar,
      username: '小明集团',
      msg:[
        {name:'王小明', text:'这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论', time:'2021-03-04 10:10:00'},
        {name:'ssss', text:'这里是评论', time:'2021-03-04 10:10:00'},
        {name:'ddfg', text:'这里是评论这里是评论f', time:'2021-03-04 10:10:00'},
        {name:'dsfsdferter', text:'这里是评论这里是评论这里是评论这里这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论', time:'2021-03-04 10:10:00'},
        {name:'yughjhhnfg', text:'这里是评论这里是评论这论', time:'2021-03-04 10:10:00'},
        {name:'fdgdfgv', text:'这里是评论这里是评论这里dfsd 是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论这里是评论', time:'2021-03-04 10:10:00'},
        {name:'王hyujytu', text:'这里是评论这里是评论这里sdfsdfsdf   是评论这里是评论这里是', time:'2021-03-04 10:10:00'},
      ],
      rankingList:[
        { name: "《蜀道难》"},
				{ name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'},
        { name: '《桃花源记》'}
      ],
      formData: {
        content: ''
      },
      formRuls: {
        content: [
          { required: true, message: '请输入评论信息', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea /deep/ .el-textarea__inner{
  font-family: MicrosoftYaHei;
  font-size: 14px;
}
.textarea /deep/ .el-input__count{
  background: none;
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
          box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15);
          display: flex;
          justify-content: space-between;
          padding: 20px 0;

          .tag{
            width: 42px;
            height: 25px;
            border: 1px solid #ff8282;
            border-radius: 19px;
            color: #ff8282;
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
            }
            .author{
              color: #ADADAD;
              font-size: 13px;
            }
            .info{
              font-size: 15px;
              color:#333333;
            }
          }

        }

        .comment-list{
          background: #FFF;
          box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15);

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
                  .user-name{
                    color: #66b1ff;
                    font-size: 14px;
                    display:block;
                  }
                  .user-comment{
                    color: #323232;
                    font-size: 13px;
                    padding: 0 0 0 30px;
                    text-indent: 0 !important;
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

        .right-info{
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
