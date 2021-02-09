<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{active: tag == '0'}" @click="tag = '0'">全部</span>
      <span class="item" :class="{active: tag == '7'}" @click="tag = '7'">华语</span>
      <span class="item" :class="{active: tag == '96'}" @click="tag = '96'">欧美</span>
      <span class="item" :class="{active: tag == '8'}" @click="tag = '8'">日本</span>
      <span class="item" :class="{active: tag == '16'}" @click="tag = '16'">韩国</span>
    </div>
    <!-- 底部的table -->
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
      <tr class="el-table__row" v-for="(item,index) in lin" :key="index"  >
        <td>{{ index+1 }}</td>
        <td>
          <div class="img-wrap">
            <img :src="item.album.picUrl" alt="" />
            <span class="iconfont icon-play" @click="getUrl(item.id)"><svg t="1611386799469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9215" width="32" height="32"><path d="M511.951499 1023.999903A511.951499 511.951499 0 1 1 939.982877 793.074213a27.424243 27.424243 0 0 1-45.933184-30.137596 456.32777 456.32777 0 1 0-136.34597 134.601672 27.424243 27.424243 0 1 1 29.071635 46.2239 510.110295 510.110295 0 0 1-274.823859 80.237714z" p-id="9216" fill="#8a8a8a"></path><path d="M392.273267 733.283549a27.521148 27.521148 0 0 1-27.424243-27.521148v-387.621805a27.521148 27.521148 0 0 1 41.184817-23.741835l335.680483 193.810902a27.424243 27.424243 0 0 1 0 47.580577l-335.680483 193.810902a27.90877 27.90877 0 0 1-13.760574 3.682407z m27.521148-367.465471v292.363747l253.310849-146.230326z" p-id="9217" fill="#8a8a8a"></path></svg></span>
          </div>
        </td>
        <td>
          <div class="song-wrap">
            <div class="name-wrap">
              <span>{{item.name}}</span>
              <span class="iconfont icon-mv"></span>
            </div>
            <span></span>
          </div>
        </td>
        <td>{{ item.album.artists[0].name }}</td>
        <td>{{ item.album.name }}</td>
        <td>{{ item.duration | formatTime}}</td>
      </tr>
      </tbody>
    </table>
    <el-pagination
        @current-change = "handleCurrentChange"
        background
        :page-size="10"
        :pager-count="11"
        layout="prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "songs",
  data() {
    return {
      lists:[],
      tag:0,
      total:100,
      page:1,
      lin:[]
    };
  },
  watch:{
    tag(){
      this.getData();
    },
    page(){
      this.getData();
    }
  },
  methods:{
    getData(){
      this.$axios({
        url:"/top/song",
        method:'get',
        params:{
          id:0,
          type:this.tag
        }
      }).then(res=>{
        console.log(res)
        this.lists = res.data.data;
        this.total = res.data.data.length;
            this.lin = this.lists.slice((this.page-1)*10,(this.page)*10)

          console.log(this.lin)
       // console.log(this.lists)
      })
    },
    handleCurrentChange(val){
      this.page = val;
      console.log(this.page)
    },
    getUrl(id){
      this.$axios({
        url:"/song/url",
        method:"get",
        params:{
          id:id
        }
      }).then(res=>{
        //console.log(res)
        this.$parent.musicUrl = res.data.data[0].url;
      })
    },

  },
  created() {
      this.getData();
  }
}
</script>

<style scoped>

</style>
