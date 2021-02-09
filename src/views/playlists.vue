<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="hightTop.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{hightTop.name}}
        </div>
        <div class="info">
          {{hightTop.description}}
        </div>
      </div>
      <img src="../assets/listCover.jpg" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" :class="{active:tag == '全部'}" @click="tag='全部'">全部</span>
        <span class="item" :class="{active:tag == '欧美'}" @click="tag='欧美'">欧美</span>
        <span class="item" :class="{active:tag == '华语'}" @click="tag='华语'">华语</span>
        <span class="item" :class="{active:tag == '流行'}" @click="tag='流行'">流行</span>
        <span class="item" :class="{active:tag == '说唱'}" @click="tag='说唱'">说唱</span>
        <span class="item" :class="{active:tag == '摇滚'}" @click="tag='摇滚'">摇滚</span>
        <span class="item" :class="{active:tag == '民谣'}" @click="tag='民谣'">民谣</span>
        <span class="item" :class="{active:tag == '电子'}" @click="tag='电子'">电子</span>
        <span class="item" :class="{active:tag == '轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
        <span class="item" :class="{active:tag == '影视原声'}" @click="tag='影视原声'">影视原声</span>
        <span class="item" :class="{active:tag == 'ACG'}" @click="tag='ACG'">ACG</span>
        <span class="item" :class="{active:tag == '怀旧'}" @click="tag='怀旧'">怀旧</span>
        <span class="item" :class="{active:tag == '治愈'}" @click="tag='治愈'">治愈</span>
        <span class="item" :class="{active:tag == '旅行'}" @click="tag='旅行'">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,index) in lists" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:{{ item.playCount }}
<!--                <span class="num">{{ item.playCount }}</span>-->
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play" @click="playList(item.id)"><svg t="1611385877146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5838" width="81" height="81"><path d="M725.632 827.904c-63.104 42.88-136.832 65.408-213.504 65.408-210.304 0-381.312-171.008-381.312-381.184 0-75.52 22.016-148.608 63.744-211.072 8.576-12.672 4.992-29.952-7.68-38.528-12.672-8.576-29.952-4.992-38.528 7.68-47.872 71.68-73.088 155.392-73.088 241.92 0 240.768 195.968 436.608 436.864 436.608 87.68 0 172.416-25.856 244.736-74.88 12.672-8.576 16-25.856 7.424-38.656-8.704-12.544-25.984-15.872-38.656-7.296zM512 75.136c-93.312 0-182.272 28.928-257.408 83.84-12.416 9.088-15.104 26.496-6.016 38.784 9.088 12.416 26.496 15.104 38.784 6.016 65.536-47.744 143.232-73.088 224.64-73.088 210.176 0 381.184 171.136 381.184 381.312 0 81.408-25.216 159.104-73.088 224.512-9.088 12.416-6.272 29.824 6.016 38.784 4.864 3.712 10.624 5.376 16.384 5.376 8.576 0 17.024-3.968 22.4-11.52 54.912-75.136 83.84-164.096 83.84-257.28C948.864 271.104 753.024 75.136 512 75.136z m-84.864 611.968c4.864 0 9.6-1.152 13.952-3.84l251.904-145.408c8.576-4.864 13.824-14.08 13.824-24.064 0-9.984-5.248-19.072-13.824-24.064L441.216 344.32c-8.704-4.864-19.2-4.864-27.904 0-8.576 4.864-13.824 14.08-13.824 24.064V659.2c0 9.984 5.248 19.072 13.824 24.064 4.224 2.56 9.088 3.84 13.824 3.84z m27.904-270.592l168.576 97.28-168.576 97.28v-194.56z" p-id="5839" fill="#8a8a8a"></path></svg></span>
            </div>
            <p class="name">{{item.name}}</p>
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
  </div>
</template>

<script>
export default {
  name: "playlists",
  data() {
    return {
      // 总条数
      total:0,
      // 页码
      page:1,
      lists:[],
      hightTop:[],
      tag:"全部",
    };
  },
  watch:{
    tag(){
      //console.log(this.tag)
      //顶部标题
      this.topData();
      //歌单
      this.listData();
      this.page = 1;
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.listData();
    },
    topData(){
      this.$axios({
        url:"/top/playlist/highquality",
        method:"get",
        params:{
          limit:1,
          cat:this.tag
        },
      }).then(res=>{
        this.hightTop = res.data.playlists[0]
        //console.log(res)
      })
    },
    playList(id){
      //console.log(id)
      this.$router.push('/playlist?id='+id)
    },
    listData(){
      this.$axios({
        url:"/top/playlist",
        method:"get",
        params:{
          limit:10,
          offset:(this.page-1)*10,
          cat:this.tag,
        }
      }).then(res=>{
        console.log(res)
        this.lists = res.data.playlists;
        this.total = res.data.total;
        for (let i = 0;i<this.lists.length;i++){
          if (this.lists[i].playCount >= 10000){
            this.lists[i].playCount = parseInt(this.lists[i].playCount/10000) + '万';
          }
        }
      })
    }

  },
  created() {
    //顶部标题
    this.topData();
    //歌单
    this.listData();
  }
}
</script>

<style scoped>

</style>
