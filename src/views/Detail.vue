<template>
  <div id="detail">
    <div class="top">
      <div class="goback" @click="$router.go(-1)">
        <i class="fas fa-chevron-left"></i>
      </div>
      <div class="title">
        {{datailContent.Name}}
      </div>
      <div class="print" onclick="window.print()">
        <i class="fas fa-print"></i>
      </div>
    </div>
    <div class="banner">
      <img :src="datailContent.Picture.PictureUrl1">
    </div>
    <div class="info">
      <div class="title">
        <i class="fas fa-info-circle"></i>
        {{ datailContent.modeName + '資訊' }}
      </div>
      <div class="content">
        <div class="date" v-if="datailContent.Date">
          <i class="fas fa-calendar"></i>
          <span> 活動日期：</span>
          <span>
            {{datailContent.Date}}
          </span>
        </div>
        <div class="time_range" v-if="!datailContent.Date && datailContent.StartTime">
        <i class="fas fa-calendar"></i>
        <span> 活動期間：</span>
          <span>{{datailContent.StartTime + ' ~ '+ datailContent.EndTime}}</span>
        </div>
        <div class="open_time" v-if="datailContent.OpenTime">
        <i class="fas fa-clock"></i>
        <span> 開放時段：</span>
          <span>{{datailContent.OpenTime}}</span>
        </div>
        <div class="ticket" v-if="datailContent.TicketInfo">
          <i class="fas fa-ticket-alt"></i>
          <span> 門票費用：</span>
          <span>{{datailContent.TicketInfo}}</span>
        </div>
        <div class="add" v-if="datailContent.Address">
          <i class="fas fa-map-marked-alt"></i>
          <span v-text="` ${datailContent.modeName}地點：`"></span>
          <span v-text="`${datailContent.Location} `" v-if="datailContent.Location"></span>
          <span>{{datailContent.Address}}</span>
        </div>
        <div v-if="datailContent.Phone">
          <i class="fas fa-phone"></i>
          <span> 聯絡電話：</span>
          <a :href="`tel:${datailContent.Phone}`" v-text="datailContent.Phone"></a>
        </div>
        <div v-if="datailContent.WebsiteUrl">
          <i class="fas fa-globe"></i>
          <span> 官方網站：</span>
          <a :href="datailContent.WebsiteUrl" target="_blank">點我前往</a>
        </div>
        <div v-if="datailContent.Organizer">
          <i class="fas fa-users"></i>
          <span> 主辦單位：</span>
          <span v-text="datailContent.Organizer"></span>
        </div>
        <div v-if="datailContent.Cycle">
          <i class="fas fa-comment-alt"></i>
          <span> 備註說明：</span>
          <span v-text="datailContent.Cycle"></span>
        </div>
        <div class="tag">
          <i class="fas fa-tags"></i>
          <span>{{datailContent.modeName + '標籤：'}}</span>
          <span class="tag_name" v-if="datailContent.Class">{{datailContent.Class}}</span>
          <span class="tag_name" v-if="datailContent.Class1">{{datailContent.Class1}}</span>
          <span class="tag_name" v-if="datailContent.Class2">{{datailContent.Class2}}</span>
          <span class="tag_name" v-if="datailContent.Class3">{{datailContent.Class3}}</span>
        </div>
      </div>
    </div>
    <div class="introduce">
      <div class="title">
        <i class="fas fa-comments"></i>
        <span>
          {{datailContent.modeName + '介紹'}}
        </span>
      </div>
      <div class="descript">
        {{datailContent.Description}}
      </div>
    </div>
    <div class="transition">
      <div class="title">
        <i class="fas fa-bus"></i>
        <span>交通方式</span>
      </div>
      <div class="map_view">
        <iframe
          width="100%"
          height="250"
          loading="lazy"
          v-if="datailContent.modeName === '活動'"
          :src="`https://maps.google.com/maps?q=${datailContent.Position.PositionLat},${datailContent.Position.PositionLon}&hl=zh-TW&z=16&amp;output=embed`"
        >
        </iframe>
        <iframe
          width="100%"
          height="250"
          loading="lazy"
          v-else
          :src="`https://maps.google.com/maps?q=${datailContent.Name.split('').join(
            '+'
          )}&hl=zh-TW&z=16&amp;output=embed`"
        >
        </iframe>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import {
  getDetail,
} from "../modules.js";
import Footer from '@/components/Footer.vue'
export default {
  name:'Detail',
  data(){
    return {
      datailContent:[]
    }
  },
  components:{
    Footer
  },
  methods:{
    initGet(){
      getDetail(this.$route.params.ID)
      .then((res)=>{
        this.datailContent = res
<<<<<<< HEAD
        if(this.datailContent.RestaurantName){
          this.datailContent.Name = this.datailContent.RestaurantName;
          this.datailContent.modeName = '餐廳'
        }
        if(this.datailContent.ActivityName){
          this.datailContent.Name = this.datailContent.ActivityName;
          this.datailContent.modeName = '活動'
        }
=======
>>>>>>> master
      })
      .catch((err)=>{
        console.log(err)
      })
    },
  },
  mounted(){
    this.initGet();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
#detail{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  width: calc(100% - 400px);
  padding: 0px;
  .top{
    align-items: center;
    font-size: 30px;
    line-height: 40px;
    color: $secondBgColor;
    cursor: pointer;
    margin: 20px;
    .goback,.print{
      padding: 2px 12px;
      border-radius: 10px;
      margin-right: 50px;
        border: 1px solid $mainLightBgColor;
      transition: 0.3s ease-in-out all;
      display: inline-block;
      &:hover{
        border: 1px solid $secondBgColor;
        background: $secondBgColor;
        color: #fff;
        transition: 0.3s ease-in-out all;
      }
    }
    .print
    {
      float: right;
      margin-right: 20px;
    }
    .title{
      color:#000 ;
      display: inline-block;
      font-weight: 600;
      font-size: 40px;
      cursor: default;
    }
  }
  .banner
  {
    width: 90%;
    height: 350px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    img{
      @extend %img-cover
    }
  }
  .info{
    margin-top: 70px;
    .title
    {
      width: 90%;
      margin: 20px auto;
      font-size: 20px;
      color:$secondBgColor;
      font-size: 24px;
      font-weight: 600;
    }
    .content
    {
      width: 90%;
      margin: 0 auto;
      padding:5px 10px;
      font-size: 20px;
      background-color: $secondBgColor;
      color: #fff;
      border-radius: 10px;
      div{
        margin: 15px;
      }
      a{
        color: #fff;
        text-decoration: none;
      }
    }
  }
  .introduce
  {
    margin-top: 70px;
    .title
    {
      width: 90%;
      margin: 20px auto;
      font-size: 20px;
      color:$secondBgColor;
      font-size: 24px;
      font-weight: 600;
    }
    .descript{
      width: 90%;
      margin: 0 auto;
      padding:5px 10px;
      font-size: 20px;
      color: rgb(0, 0, 0);
      line-height: 35px;
      letter-spacing: 1px;
    }
  }
  .transition
  {
    margin-top: 70px;
    margin-bottom: 70px;
    .title
    {
      width: 90%;
      margin: 20px auto;
      font-size: 20px;
      color:$secondBgColor;
      font-size: 24px;
      font-weight: 600;
    }
    .map_view
    {
      width: 90%;
      margin: 0 auto;
      padding:0px;
      border-radius: 20px;
      overflow: hidden;
    }
  }
}

</style>