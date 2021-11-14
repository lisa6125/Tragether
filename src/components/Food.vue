<template>
    <div class="food">
      <div class="title">
        <img src="../assets/icon/food_title.png" alt="">
      </div>
      <div class="food_list">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="item in foodArr" :key="item.ID">
            <router-link :to="`/detailPage/${item.ID}`">
              <div class="card_food">
              <img :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1">
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
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
        </swiper>
        <div class="swiper-button-next" slot="button-next">
          <img src="../assets/icon/arrow_right_w.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import {
  getTravelInfo,
} from "../modules.js";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data(){
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
        loop: true,
        // loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      foodArr:[]
    }
  },
  props:["place","ranNum",],
  methods:{
    initGet(){
      if(!this.ranNum){
        this.ranNum = Math.floor(Math.random()*100)+1;
      }
      getTravelInfo("Restaurant",this.place,this.ranNum,12)
      .then((res)=>{
        this.foodArr = res
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.initGet();
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.food{
  margin: 50px 30px;
  .title{
    width: 150px;
    margin-bottom: 20px;
    img{
      @extend %img-set;
    }
  }
  .food_list{
    width: 100%;
    @extend %flex-wrap;
    position: relative;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
          width: 100%;
          height: 100%;
      }
      .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 100%;
          height: 100%;
          position: relative;
          cursor: pointer;
          &:hover{
            transition: all ease 0.3s;
          }
      }
      .swiper-pagination-bullet {
          width:0.833rem;
          height: 0.833rem;
          display: inline-block;
          background: #aed6e6 !important;
      }
    }
    .swiper-button-next{
      position: absolute;
      top: -45px;
      right: 30px;
      &::after{
        opacity: 0;
      }
      img{
        width: 60px;
      }
    }
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
</style>