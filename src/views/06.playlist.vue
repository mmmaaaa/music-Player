<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="lists.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ lists.name }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="lists.creator.avatarUrl" alt="" />
          <span class="name">{{ lists.creator.nickname }}</span>
          <span class="time">{{ lists.createTime | formatDate }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text" @click="playAll">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in lists.tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc"
            >{{
              lists.description
            }}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in songs" :key="index">
              <td>{{ index +1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play" @click="playMusic(item.id)"><svg t="1611386799469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9215" width="32" height="32"><path d="M511.951499 1023.999903A511.951499 511.951499 0 1 1 939.982877 793.074213a27.424243 27.424243 0 0 1-45.933184-30.137596 456.32777 456.32777 0 1 0-136.34597 134.601672 27.424243 27.424243 0 1 1 29.071635 46.2239 510.110295 510.110295 0 0 1-274.823859 80.237714z" p-id="9216" fill="#8a8a8a"></path><path d="M392.273267 733.283549a27.521148 27.521148 0 0 1-27.424243-27.521148v-387.621805a27.521148 27.521148 0 0 1 41.184817-23.741835l335.680483 193.810902a27.424243 27.424243 0 0 1 0 47.580577l-335.680483 193.810902a27.90877 27.90877 0 0 1-13.760574 3.682407z m27.521148-367.465471v292.363747l253.310849-146.230326z" p-id="9217" fill="#8a8a8a"></path></svg></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span v-if="item.al.tns.length !=0">{{ item.al.tns }}</span>
                </div>
              </td>
              <td>{{ item.ar[0].name}}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="2">
<!--        最新评论-->
        <div class="comment-wrap">
          <p class="title">热门评论<span class="number">({{ hotComments.length }})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in hotComments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content"  v-if="item.beReplied.length !=0">
                  <span class="name">{{ item.beReplied[0].user.nickname  }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time |formatDate }}</div>
              </div>
            </div>
          </div>
        </div>
         最新评论
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{ comments.length }})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length !=0">
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
          :total="total"
          :current-page="page"
          :page-size="5"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      lists:[],
      songs:[],
      comments:[],
      hotComments:[]
    };
  },
  watch:{
    activeIndex(){
      console.log(this.activeIndex)
      if (this.activeIndex == 1){
        this.getData();
      }else if (this.activeIndex == 2){
        this.$axios({
          url:'/comment/playlist',
          method:'get',
          params:{
            id:this.$route.query.id,
          }
        }).then(res=>{
          // console.log(res);
          this.comments = res.data.comments;
          this.hotComments = res.data.hotComments
          this.total = res.data.total;
            console.log(this.total,this.comments,this.hotComments)

        })
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getData(){
      this.$axios({
        url:'/playlist/detail',
        method:'get',
        params:{
          id:this.$route.query.id
        }
      }).then(res=>{
       // console.log();
        this.lists = res.data.playlist;
        //console.log(this.lists)
        this.songs = res.data.playlist.tracks;
      //  console.log(this.songs)

      })
    },
    playMusic(id){
      //console.log(id)
      this.$axios({
        url:'/song/url',
        method:'get',
        params:{
          id
        }
      }).then(res=>{
       // console.log(res);
        this.$parent.musicUrl = res.data.data[0].url;
      })
    },
    playAll(){

    },
  },
  created() {
    this.getData();
  }
};
</script>

<style >

</style>
