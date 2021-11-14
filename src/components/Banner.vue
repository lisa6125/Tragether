<template>
<div class="banner_wrap">
  <div id="banner">
    <swiper class="swiper" :options="swiperOptionbanner">
      <swiper-slide>
        <img src="../assets/img/banner.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/img/banner2.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/img/banner3.png" alt="">
      </swiper-slide>
    </swiper>
    <div id="main_text">
      <div class="line line1">
        <div class="group line1_text">
          WORLD 
        </div>
      </div>
      <div class="line line2">
        <div class="group line2_text">
          OF<span class="special">Formosa,</span> 
        </div>
      </div>
      <div class="line line3">
        <div class="group line3_text">
          TAIWAN
        </div>
      </div>
      <div class="web_script">
        Lorem i corporis distinctio ea, fuga doloremque fugit dolor quibusdam esse maiores voluptatem sed reiciendis id corrupti a deserunt quo eveniet praesentium porro perspiciatis nostrum, deleniti tenetur, at iure! At, commodi?
      </div>
    </div>
  </div>
</div>
</template>

<script>
import gsap from "gsap";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
data() {
  return {
      swiperOptionbanner: {
        slidesPerView: 1,
        spaceBetween: 20,
        slidesPerGroup: 1,
        loop: true,
        // loopFillGroupWithBlank: true,
        autoplay: {
          disableOnInteraction: true,
          delay:3000
        }
      },
      showActive:[]
    }
},
  mounted(){
    gsap.from('#main_text .group',{repeatDelay:2,duration:1,y:100,stagger:0.5,repeat:-1});
    gsap.from('#selection',{delay:1,duration:1,y:100,opacity:0});
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.banner_wrap{
  width: 100%;
  height: 400px;
  margin: 0 auto;
  position: relative;
  @extend %box-shadow2;
  #banner{
    box-sizing: border-box;
    width:calc(100% - 60px);
    height:400px;
    margin:10px 30px;
    border-radius: 30px;
    border: 2px solid #fff;
    overflow: hidden;
    .swiper-container {
      width: 100%;
      z-index: 1;
      .swiper-wrapper {
        height: 400px;
      }
      .swiper-slide {
        // padding: 30px;
        border-radius: 30px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    #main_text{
      height: 80%;
      color: $mainWhiteColor;
      z-index: 2;
      position: absolute;
      padding: 30px 50px;
      top: 0;
      left: 0;
      cursor: default;
      .line{
        font-size: 60px;
        font-weight: 700;
        overflow: hidden;
      }
      .special{
        -webkit-text-stroke: 2px $mainWhiteColor;
        color: rgba(255, 255, 255, 0);
        font-weight: 900;
        margin-left: 20px;
      }
      .web_script{
        margin-top: 40px;
        width: 600px;
        font-size: 20px;
        font-weight: 200;
        line-height: 24px;
        word-spacing: 3px;
      }
      .tag_script{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 50px;
        margin-right: 50px;
        padding-top: 30px;
        border-top: 1px solid $mainWhiteColor;
        .item{
          width: 33%;
          .title{
            font-size: 20px;
            font-weight: 200;
          }
          .tag{
            margin-top: 10px;
            font-size: 30px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>