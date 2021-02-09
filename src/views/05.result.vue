<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ val }}</h2>
      <span class="sub-title">找到{{ num }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in lists" :key="index">
              <td>{{ index +1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap" @dblclick="playMusic(item.id)">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv" v-if="item.mvid !=0">1</span>
                  </div>
                  <span v-if="item.alias.length !=0">{{ item.alias[0]}}</span>
                </div>
              </td>
              <td>
                {{ artistsName[index] }}
              </td>
              <td >{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item,index) in songs" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mvs" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">02:43</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import songs from "@/views/songs";

export default {
  name: 'result',
  data() {
    return {
      activeIndex: 'songs',
      num:'',
      lists:[],
      art:[],
      val:this.$route.query.q,
      songs:[],
      mvs:[],
      artists:[],
      artistsName:[],
      name:'',
    };
  },
  watch:{
    activeIndex(){
      let type = 1;
      switch (this.activeIndex){
        case "songs":type = 1;break;
        case "lists":type = 1000;break;
        case "mv":type = 1004;break;
        default: break;
      }
      if (type == 1){
        this.$axios({
          url:'/search',
          method:'get',
          params:{
            keywords:this.$route.query.q,
            limit:10,
            offset:'',
            type
          }
        }).then(res=>{
          this.num = res.data.result.songCount;
          this.lists = res.data.result.songs;
          // console.log(this.lists[0].artists.length)
          for (let i=0;i<this.lists.length;i++){
            let min = parseInt(this.lists[i].duration/1000/60);
            let sec = parseInt(this.lists[i].duration/1000%60);
            if (min<10){
              min = `0${min}`
            };
            if (sec<10){
              sec = `0${sec}`
            };
            this.lists[i].duration = `${min}:${sec}`;
          }
        })
    }else if (type == 1000){
        this.$axios({
          url:'/search',
          method:'get',
          params:{
            keywords:this.$route.query.q,
            limit:10,
            offset:'',
            type
          }
          }).then(res=>{
            console.log(this.songs)
            this.num = res.data.result.playlistCount;
            this.songs = res.data.result.playlists;
            for (let i = 0;i<this.songs.length;i++){
            if (this.songs[i].playCount>=10000){
              this.songs[i].playCount = parseInt(this.songs[i].playCount/10000)+'万';
            }
          }
        })
      }else if (type == 1004){
        this.$axios({
          url:'/search',
          method:'get',
          params:{
            keywords:this.$route.query.q,
            limit:8,
            offset:'',
            type
          }
        }).then(res=>{
          console.log(res);
          this.num = res.data.result.mvCount;
          this.mvs = res.data.result.mvs;
          for (let i = 0;i<this.mvs.length;i++){
            if (this.mvs[i].playCount>10000){
              this.mvs[i].playCount = parseInt(this.mvs[i].playCount/10000)+'万';
            }
          }

        })
      }
      },
    $route: function (){
      this.getData();
      this.val = this.$route.query.q
    }

  },
  methods:{
    getData(){
      this.$axios({
        url:'/search',
        method:'get',
        params:{
          keywords:this.$route.query.q,
          limit:10,
          offset:'',
          type:1
        }
      }).then(res=>{
        this.num = res.data.result.songCount;
        this.lists = res.data.result.songs;
        for (let i=0;i<this.lists.length;i++){
          this.artists[i] = this.lists[i].artists;
        }
        for (let i = 0;i<this.artists.length;i++){
          for (let j = 0;j<this.artists[i].length;j++){
             this.name += this.artists[i][j].name +'.';
          }
          this.artistsName[i] = this.name;
          this.name = '';
        }
        for (let i=0;i<this.lists.length;i++){
          let min = parseInt(this.lists[i].duration/1000/60);
          let sec = parseInt(this.lists[i].duration/1000%60);
          if (min<10){
            min = `0${min}`
          };
          if (sec<10){
            sec = `0${sec}`
          };
          this.lists[i].duration = `${min}:${sec}`;
        }
      })
    },
    playMusic(id){
      this.$axios({
        url:'/song/url',
        method:'get',
        params:{
          id
        }
      }).then(res=>{
        //console.log( res)
        this.$parent.musicUrl = res.data.data[0].url;
      })
}
  },
  created() {
    this.getData();
  }
};
</script>

<style >

</style>
