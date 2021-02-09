<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toPlaylist(item.id)"><svg t="1611385877146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5838" width="81" height="81"><path d="M725.632 827.904c-63.104 42.88-136.832 65.408-213.504 65.408-210.304 0-381.312-171.008-381.312-381.184 0-75.52 22.016-148.608 63.744-211.072 8.576-12.672 4.992-29.952-7.68-38.528-12.672-8.576-29.952-4.992-38.528 7.68-47.872 71.68-73.088 155.392-73.088 241.92 0 240.768 195.968 436.608 436.864 436.608 87.68 0 172.416-25.856 244.736-74.88 12.672-8.576 16-25.856 7.424-38.656-8.704-12.544-25.984-15.872-38.656-7.296zM512 75.136c-93.312 0-182.272 28.928-257.408 83.84-12.416 9.088-15.104 26.496-6.016 38.784 9.088 12.416 26.496 15.104 38.784 6.016 65.536-47.744 143.232-73.088 224.64-73.088 210.176 0 381.184 171.136 381.184 381.312 0 81.408-25.216 159.104-73.088 224.512-9.088 12.416-6.272 29.824 6.016 38.784 4.864 3.712 10.624 5.376 16.384 5.376 8.576 0 17.024-3.968 22.4-11.52 54.912-75.136 83.84-164.096 83.84-257.28C948.864 271.104 753.024 75.136 512 75.136z m-84.864 611.968c4.864 0 9.6-1.152 13.952-3.84l251.904-145.408c8.576-4.864 13.824-14.08 13.824-24.064 0-9.984-5.248-19.072-13.824-24.064L441.216 344.32c-8.704-4.864-19.2-4.864-27.904 0-8.576 4.864-13.824 14.08-13.824 24.064V659.2c0 9.984 5.248 19.072 13.824 24.064 4.224 2.56 9.088 3.84 13.824 3.84z m27.904-270.592l168.576 97.28-168.576 97.28v-194.56z" p-id="5839" fill="#8a8a8a"></path></svg></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in music" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="plays(item.id)"><svg t="1611386799469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9215" width="32" height="32"><path d="M511.951499 1023.999903A511.951499 511.951499 0 1 1 939.982877 793.074213a27.424243 27.424243 0 0 1-45.933184-30.137596 456.32777 456.32777 0 1 0-136.34597 134.601672 27.424243 27.424243 0 1 1 29.071635 46.2239 510.110295 510.110295 0 0 1-274.823859 80.237714z" p-id="9216" fill="#8a8a8a"></path><path d="M392.273267 733.283549a27.521148 27.521148 0 0 1-27.424243-27.521148v-387.621805a27.521148 27.521148 0 0 1 41.184817-23.741835l335.680483 193.810902a27.424243 27.424243 0 0 1 0 47.580577l-335.680483 193.810902a27.90877 27.90877 0 0 1-13.760574 3.682407z m27.521148-367.465471v292.363747l253.310849-146.230326z" p-id="9217" fill="#8a8a8a"></path></svg></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="playMv(item.id)"><svg t="1611386203501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8661" width="48" height="48"><path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#4D4D4D" p-id="8662"></path><path d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z" fill="#4D4D4D" p-id="8663"></path><path d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z" fill="#4D4D4D" p-id="8664"></path></svg></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
name: "discovery",
  data(){
    return{
      banners:[],
      list:[],
      music:[],
      mvs:[]
    }
  },
  created() {
      // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
      // 由于 main.js 里定义了每个请求前缀，此处的 / 即为 /api/，
      // 经过 vue.config.js 配置文件的代理设置，会自动转为 https://www.baidu.com/，从而解决跨域问题
    //获取轮博图
      this.$axios.get('/banner').then(response => {
        if (response.data) {
          //console.log(response.data)
          this.banners = response.data.banners
        }
      }).catch(err => {
        alert('请求失败')
      })
    //获取推荐歌单
    this.$axios({
      url:"/personalized",
      method:"get",
      params:{
        limit:10
      }
    }).then(res=>{
      this.list = res.data.result
      //console.log(res)
    })
    //获取最新音乐
    this.$axios({
      url:"/personalized/newsong",
      method:"get",
      params:{
        limit:8
      }
    }).then(res=>{
      this.music = res.data.result
      //console.log(res)
    })
    //获取最新MV
    this.$axios({
      url:"/personalized/mv",
      method:"get",
    }).then(res=>{
      this.mvs = res.data.result
      //console.log(res)
    })
  },
  methods:{
  plays(id){
    this.$axios({
      url:"/song/url",
      method:"get",
      params:{
        id:id
      }
    }).then(res=>{
      let url = res.data.data[0].url;
      //console.log(res)
      this.$parent.musicUrl = url;
    })
  },
    playMv(id){
      console.log(id);
      this.$router.push('/mv?id='+id)
    },
    toPlaylist(id){
    //console.log(id)
      this.$router.push('/playlist?id='+id)
    }
  }
}
</script>

<style scoped>

</style>
