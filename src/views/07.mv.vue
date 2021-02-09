<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="message.cover" alt="" />
          </div>
          <span class="name">{{ message.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ message.name }}</h2>
          <span class="date">发布：{{ message.publishTime }}</span>
          <span class="number">播放：{{ message.playCount }}</span>
          <p class="desc">{{message.desc}}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">({{ hotNumber }})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in hotComments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | formatDate }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">({{ number }})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in comments" :key="index" >
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | formatDate }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="number"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in mv" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"><svg t="1611386203501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8661" width="48" height="48"><path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#4D4D4D" p-id="8662"></path><path d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z" fill="#4D4D4D" p-id="8663"></path><path d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z" fill="#4D4D4D" p-id="8664"></path></svg></span>
              <div class="num-wrap">
                <div class="num">播放量:{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration |formatTime }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      url:'',
      mv:[],
      message:'',
      hotComments:[],
      comments:[],
      hotNumber:0,
      number:0
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
    }
  },
  created() {
    this.$axios({
      url:'/mv/url',
      method:'get',
      params:{
        id:this.$route.query.id
      }
    }).then(res=>{
     // console.log(res);
      this.url = res.data.data.url;

    })
    this.$axios({
      url:'/simi/mv',
      method:'get',
      params:{
        mvid:this.$route.query.id
      }
    }).then(res=>{
     // console.log(res);
      this.mv = res.data.mvs;
      for (let i = 0;i<this.mv.length;i++){
        if (this.mv[i].playCount >=10000){
          this.mv[i].playCount = parseInt(this.mv[i].playCount/10000) + '万';
        }
      }
    })
    this.$axios({
      url:'/mv/detail',
      method:'get',
      params:{
        mvid:this.$route.query.id
      }
    }).then(res=>{
      //console.log(res)
      this.message = res.data.data;
     // console.log(this.message)
    })
    this.$axios({
      url:'/comment/mv',
      method:'get',
      params:{
        id:this.$route.query.id,
        //limit:30,
        offset:''
      }
    }).then(res=>{
      this.hotComments = res.data.hotComments;
      this.hotNumber =res.data.hotComments.length;
    })
    this.$axios({
      url:'/comment/mv',
      method:'get',
      params:{
        id:this.$route.query.id,
        limit:10,
        offset:(this.page-1)*10
      }
    }).then(res=>{
      this.comments = res.data.comments;
      this.number = res.data.total;
    })
  },
  watch:{
    page(){
      this.$axios({
        url:'/comment/mv',
        method:'get',
        params:{
          id:this.$route.query.id,
          limit:10,
          offset:(this.page-1)*10
        }
      }).then(res=>{
        console.log(res)
        this.comments = res.data.comments;
        this.number = res.data.total;
      })
    }
  }
};
</script>

<style></style>
