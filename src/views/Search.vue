<template>
<div class="searchPage">
  <Banner/>
  <div class="ScenicSpot" v-if="this.$route.params.mode === 'ScenicSpot' ">1</div>
  <div class="Restaurant" v-if="this.$route.params.mode === 'Restaurant' ">
    <div class="food_item" v-for="item in result" :key="item.ID">
      <router-link :to="`/detailPage/${item.ID}`">
        <div class="card_food">
          <img :src="item.Picture.PictureUrl1" :alt="item.PictuPictureDescription1">
          <div class="main_contain">
                  <div class="name">{{item.Name}}</div>
                  <div class="time">
                    <span><i class="fas fa-clock"></i></span>
                    <div>{{item.OpenTime}}</div>
                  </div>
                  <div class="tag">
                    <span>
                      <i class="fas fa-phone-alt"></i>
                    </span>
                    <span>{{item.Phone}}</span>
                  </div>
                  <div class="add">
                    <span>
                      <i class="fas fa-map-marker-alt"></i>
                    </span>
                    <div>{{item.Address}}</div>
                  </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div class="Activity" v-if="this.$route.params.mode === 'Activity' ">3</div>
  <div class="Hotel" v-if="this.$route.params.mode === 'Hotel' ">4</div>
  <div class="more">
    <div class="more_Btn" @click="getMore()">
    查詢更多
    </div>
  </div>
  <div class="notFind" v-if="result.length === 0">
    <h1>糟糕!找不到您要的資料</h1>
    <div class="animation-style" ref="animation"></div>
  </div>
</div>
</template>

<script>
import lottie from 'lottie-web';
import editor from '../assets/lf30_editor_vk0pvawn.json';
import {
  getTravelInfo,
} from "../modules.js";
import Banner from '@/components/Banner.vue';
import { cityLib } from "../lib.js";
export default {
  data(){
    return{
      result:[],
      moreNum:1,
    }
  },
  components: {
    Banner
  },
  methods:{
    initGet(){
      getTravelInfo(this.$route.params.mode,this.cityTurnEn(),1,18,this.$route.params.keyword)
      .then((res)=>{
        if(this.$route.params.district !== 'all'){
          let find = this.$route.params.district.slice(0,-1)
          this.result = res.filter((item)=>{
            return item.Address.indexOf(find) !== -1
          })
        }else{
          this.result = res
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getMore(){
      this.moreNum ++
      getTravelInfo(this.$route.params.mode,this.cityTurnEn(),this.moreNum,18,this.$route.params.keyword)
      .then((res)=>{
        // if(res.length === 0) {
        //   this.moreNum --
        //   return
        // };
        if(this.$route.params.district !== 'all'){
          let find = this.$route.params.district.slice(0,-1);
          console.log(93,res)
          let catchres = res.filter((item)=>{
            return item.Address.indexOf(find) !== -1
          });
          catchres.forEach(element => {
            this.result.push(element)
          });
        }else{
          res.forEach(element => {
            this.result.push(element)
          });
        }
        // console.log(95,res,this.result)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    cityTurnEn(){
      let cityItem = '';
      cityItem = Object.keys(cityLib).filter((item) => cityLib[item].name === this.$route.params.city);
      // console.log(cityItem[0])
      return cityItem[0]
    }
  },
  mounted(){
    this.initGet();
    lottie.loadAnimation({
        container: this.$refs.animation,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: editor,//动画json
      });
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.searchPage{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  width: calc(100% - 400px);
  padding: 0px;
}
.Restaurant{
  width: 100%;
  padding: 20px;
  @extend %flex-center;
  .food_item{
    width: 33%;
    padding: 5px;
    .card_food{
      width:100% ;
      height: 450px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      &::before{
        z-index: 2;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient((0deg,rgba(0, 0, 0, 0.7)) 0%, rgba(0, 0, 0, 0.3) 30%,rgba(0, 0, 0, 0) 70%);
      }
      img{
        @extend %img-cover;
        @extend %position-center;
        transition: 0.3s ease-in-out all;
      }
      &:hover{
        img{
          width: 110%;
          height: 110%;
          transition: 0.3s ease-in-out all;
        }
      }
      .main_contain{
        z-index: 3;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 38%;
        color: #fff;
        position: absolute;
        padding: 10px;
        div{
          margin-bottom: 8px;
        }
        .name{
          font-size: 24px;
          letter-spacing: 2px;
          font-weight: 600;
        }
        .time{
          display: flex;
          flex-wrap: wrap;
          div{
            margin-left: 5px;
            width: 90%;
            display: inline-block;
          }
        }
        .add{
          display: flex;
          flex-wrap: wrap;
          div{
            margin-left: 5px;
            width: 90%;
            display: inline-block;
          }
        }
        span{
          margin-left: 5px;
        }
      }
    }
  }
}
.more{
  padding: 50px;
  text-align: center;
  &_Btn{
    cursor: pointer;
    margin: 0 auto;
    width: 250px;
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    padding: 30px 40px;
    text-align: center;
    border-radius: 20px;
    background: $secondBgColor;
    transition: 0.3s ease-in-out all;
    &:hover{
      background: #a3ccfb;
      transition: 0.3s ease-in-out all;
    }
  }
}
.notFind{
  h1{
    text-align: center;
    font-size: 40px;
    color: $secondBgColor;
    padding: 30px;
  }
}
</style>