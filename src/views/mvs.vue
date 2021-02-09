<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{active:areaa=='全部'}" @click="areaa='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:areaa=='内地'}" @click="areaa='内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:areaa=='港台'}" @click="areaa='港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:areaa=='欧美'}" @click="areaa='欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:areaa=='日本'}" @click="areaa='日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:areaa=='韩国'}" @click="areaa='韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title " :class="{active:typee=='全部'}" @click="typee='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:typee=='官方版'}" @click="typee='官方版'">官方版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:typee=='原声'}"  @click="typee='原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:typee=='现场版'}" @click="typee='现场版'">现场版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:typee=='网易出品'}" @click="typee='网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{active:orderr=='上升最快'}" @click="orderr='上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:orderr=='最热'}" @click="orderr='最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title" :class="{active:orderr=='最新'}" @click="orderr='最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
     推荐MV
    <div class="mvs">
      <div class="items">
        <div class="item"  v-for="(item,index) in limits" :key="index">
          <div class="img-wrap">
            <div class="num-wrap">
              <div class="num">播放量:{{ item.playCount }}</div>
            </div>
            <img :src="item.cover" alt="" />
            <span class="iconfont icon-play" @click="toMv(item.id)"><svg t="1611386203501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8661" width="48" height="48"><path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#4D4D4D" p-id="8662"></path><path d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z" fill="#4D4D4D" p-id="8663"></path><path d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z" fill="#4D4D4D" p-id="8664"></path></svg></span>

          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{ item.artists[0].name }}</div>
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
          :page-size="8"
          :limit="limit"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
name: "mvs",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      limits:[],
      areaa:'全部',
      typee:'全部',
      orderr:'上升最快'
    };
  },
  watch:{
  areaa(){
    this.getData();
    this.page = 1;
    },
    typee(){
      this.getData();
      this.page = 1;
    },
    orderr(){
      this.getData();
      this.page = 1;
    },
  },
  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getData();
    },
    getData(){
      this.$axios({
        url:"/mv/all",
        method:"get",
        params:{
          limit:8,
          area:this.areaa,
          type:this.typee,
          order:this.orderr,
          offset:(this.page-1)*8
        }
      }).then(res=>{
        this.limits = res.data.data;
        //this.total = res.data.count
        for (let i=0;i<this.limits.length;i++){
          if (this.limits[i].playCount>=10000){
            let number = parseInt(this.limits[i].playCount/10000);
            this.limits[i].playCount = `${number}万`
          }
        }
        if (res.data.count){
          this.total = res.data.count;
        }
      })
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped>

</style>
