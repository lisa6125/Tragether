<template>
<div class="searchPage">
  <Banner/>
  <div class="ScenicSpot" v-if="this.$route.params.mode === 'ScenicSpot' ">
    <div class="spot_item"  v-for="item in result" :key="item.ScenicSpotID">
      <router-link :to="`/detailPage/${item.ScenicSpotID}`">
      <div class="spot_card">
        <div class="spot_card_pic">
          <img :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1">
        </div>
        <div class="spot_card_content">
          <div class="name">
            {{item.Name}}
          </div>
          <div class="time"  v-if="item.OpenTime">
            <span class="time_icon"><i class="fas fa-clock"></i></span>
            
            <div>{{item.OpenTime}}</div>
          </div>
          <div class="tag" v-if="item.Class1">
            <span class="tag_icon">
              <i class="fas fa-tags"></i>
            </span>
            <span class="tag_name" v-if="item.Class">{{item.Class}}</span>
            <span class="tag_name" v-if="item.Class1">{{item.Class1}}</span>
            <span class="tag_name" v-if="item.Class2">{{item.Class2}}</span>
            <span class="tag_name" v-if="item.Class3">{{item.Class3}}</span>
          </div>
        </div>
      </div>
      </router-link>
    </div>
  </div>
  <div class="Restaurant" v-if="this.$route.params.mode === 'Restaurant' ">
    <div class="food_item" v-for="item in result" :key="item.RestaurantID">
      <router-link :to="`/detailPage/${item.RestaurantID}`">
        <div class="food_card">
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
  <div class="Activity" v-if="this.$route.params.mode === 'Activity' ">
    <div class="Activity_list">
      <div class="card_Activity" v-for="item in result" :key="item.ActivityID" @click="$router.push(`/detailPage/${item.ActivityID}`)">
        <div class="pic">
          <img :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1">
        </div>
        <div class="main_contain">
          <div class="name">{{item.Name}}</div>
          <div class="time">
            <span><i class="fas fa-clock"></i></span>
            <span>{{item.StartTime}} ~ {{item.EndTime}}</span>
            </div>
          <div class="add">
            <span><i class="fas fa-map-marker-alt"></i></span>
            <span>{{item.Address}}</span></div>
          <div class="tag">
            <span><i class="fas fa-tags"></i></span>
            <span class="tag_name" v-show="item.Class1">{{item.Class1}}</span>
            <span class="tag_name" v-show="item.Class2">{{item.Class2}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="Hotel" v-if="this.$route.params.mode === 'Hotel' ">
    <div class="Hotel_list">
      <div class="card_Hotel" v-for="item in result" :key="item.HotelID" @click="$router.push(`/detailPage/${item.HotelID}`)">
        <div class="main_contain">
          <div class="name">{{item.Name}}</div>
          <div class="add">
            <span><i class="fas fa-map-marker-alt"></i></span>
            <div>{{item.Address}}</div>
          </div>
          <div class="tag">
            <span><i class="fas fa-tags"></i></span>
            <span class="tag_name" v-show="item.Class">{{item.Class}}</span>
          </div>
        </div>
        <div class="pic">
          <img :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1">
        </div>
      </div>
    </div>
  </div>
  <div class="more">
    <div class="more_Btn" @click="getMore()" v-if="result.length !== 0">
    查詢更多
    </div>
  </div>
  <div class="notFind" v-if="result.length === 0">
    <h1>糟糕!找不到您要的資料</h1>
    <div class="animation-style" ref="animation"></div>
  </div>
  <Footer/>
</div>
</template>

<script>
import lottie from 'lottie-web';
import editor from '../assets/lf30_editor_vk0pvawn.json';
import {
  getTravelInfo,
} from "../modules.js";
import Banner from '@/components/Banner.vue';
import Footer from '@/components/Footer.vue'
import { cityLib } from "../lib.js";
export default {
  data(){
    return{
      result:[],
      moreNum:1,
    }
  },
  components: {
    Banner,Footer
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
      if(this.$route.params.city === 'Taiwan') return 'Taiwan';
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
.ScenicSpot{
  width: 100%;
  padding: 20px;
  @extend %flex-wrap;
  align-items: stretch;
  .spot{
    &_item{
      width: 33%;
      padding: 5px;
      a{
        text-decoration: none;
      }
    }
    &_card{
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      height: 100%;
      &_pic{
        width: 100%;
        height: 300px;
        img{
          @extend %img-cover;
        }
      }
      &_content{
        flex: 1;
        background: #fff;
        color: #000;
        text-decoration: none;
        padding:20px 10px;
        .name{
          font-size: 24px;
          letter-spacing: 2px;
          font-weight: 600;
          text-decoration: none;
          margin-bottom: 20px;
        }
        .time{
          display: flex;
          &_icon{
            margin-right: 5px;
            color: $secondBgColor;
          }
          div{
            width: 90%;
            display: -webkit-box;
            -webkit-line-clamp: 2; //行數
            -webkit-box-orient: vertical;
            white-space: normal;
            overflow: hidden;
            line-height: 1.2;
          }
        }
        .tag{
          &_icon{
            margin-right: 5px;
            color: $secondBgColor;
          }
          &_name{
            padding: 5px 10px;
            border: 1px solid $secondBgColor;
            margin-right: 5px;
            border-radius: 10px;
            background: $secondBgColor;
            color: #fff;
          }
        }
        div{
          margin-bottom: 10px;
        }
      }
    }
  }
}
.Restaurant{
  width: 100%;
  padding: 20px;
  @extend %flex-center;
  .food_item{
    width: 33%;
    padding: 5px;
    .food_card{
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
.Activity{
  padding: 0 30px;
  .Activity_list{
    width: 100%;
    @extend %flex-wrap;
    position: relative;
    transition: 0.3s ease-in-out all;
    .card_Activity{
      width:100% ;
      height: 250px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      margin-top: 20px;
      @extend %flex-wrap;
      &:before{
        content: '';
        position: absolute;
        width: 3px;
        height: 40px;
        background: $secondBgColor;
        right: 0px;
        top: 50%;
        transition: 0.3s ease-in-out all;
      }
      &:after{
        content: '';
        position: absolute;
        width: 3px;
        height: 40px;
        background: $secondBgColor;
        right: 0px;
        bottom: 50%;
        transition: 0.3s ease-in-out all;
      }
      &:hover{
        @extend %box-shadow2;
        transition: 0.3s ease-in-out all;
        &:before{
          right: 30px;
          top: 48%;
          transform: rotate(400deg);
          transition: 0.3s ease-in-out all;
        }
        &:after{
          right: 30px;
          bottom:48%;
          transform: rotate(-400deg);
          transition: 0.3s ease-in-out all;
        }
      }
      .main_contain{
        width: 60%;
        height: 100%;
        color: rgb(0, 0, 0);
        padding: 30px;
        background: #fff;
        div{
          margin-bottom: 8px;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .name{
          font-size: 24px;
          letter-spacing: 2px;
          font-weight: 600;
          margin-bottom: 30px;
        }
        .add{
          span:first-child{
            margin-right: 5px;
          }
        }
        .tag{
          margin-top: 30px;
          &_name{
            padding: 5px 10px;
            border: 1px solid $secondBgColor;
            margin-right: 5px;
            border-radius: 10px;
            background: $secondBgColor;
            color: #fff;
          }

        }
        span{
          margin-left: 5px;
            &:first-child{
            color: $secondBgColor;
          }
        }
      }
      .pic{
        width: 40%;
        height: 100%;
        position: relative;
        overflow: hidden;
        img{
          @extend %img-cover;
          @extend %position-center;
          transition: 0.3s ease-in-out all;
        }
      }
      &:hover{
        .pic{
          img{
            width: 110%;
            height: 110%;
            transition: 0.3s ease-in-out all;
          }
        }
      }
    }
  }
}
.Hotel{
  padding: 0 30px;
  .Hotel_list{
    width: 100%;
    @extend %flex-wrap;
    position: relative;
    transition: 0.3s ease-in-out all;
    .card_Hotel{
      width:calc(50% - 20px);
      margin: 0 10px;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      margin-top: 20px;
      @extend %flex-wrap;
      &:hover{
        @extend %box-shadow2;
        transition: 0.3s ease-in-out all;
        &:before{
          right: 30px;
          top: 48%;
          transform: rotate(400deg);
          transition: 0.3s ease-in-out all;
        }
        &:after{
          right: 30px;
          bottom:48%;
          transform: rotate(-400deg);
          transition: 0.3s ease-in-out all;
        }
      }
      .main_contain{
        width: 55%;
        height: 100%;
        color: rgb(0, 0, 0);
        padding: 30px;
        background: #fff;
        div{
          margin-bottom: 8px;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .name{
          font-size: 24px;
          letter-spacing: 2px;
          font-weight: 600;
          margin-bottom: 30px;
          display: -webkit-box;
          -webkit-line-clamp: 1; //行數
          -webkit-box-orient: vertical;
          white-space: normal;
          overflow: hidden;
        }
        .add{
          display: flex;
          flex-wrap: wrap;
          height: 40px;
          line-height: 1.2;
          span:first-child{
            margin-right: 5px;
            height: 40px;
          }
          div{
            max-height: 40px;
            overflow: hidden;
            width: 80%;
            margin: 0;
          }
        }
        .tag{
          margin-top: 30px;
          &_name{
            padding: 5px 10px;
            border: 1px solid $secondBgColor;
            margin-right: 5px;
            border-radius: 10px;
            background: $secondBgColor;
            color: #fff;
          }

        }
        span{
          margin-left: 5px;
            &:first-child{
            color: $secondBgColor;
          }
        }
      }
      .pic{
        width: 45%;
        height: 100%;
        position: relative;
        overflow: hidden;
        img{
          @extend %img-cover;
          @extend %position-center;
          transition: 0.3s ease-in-out all;
        }
      }
      &:hover{
        .pic{
          img{
            width: 110%;
            height: 110%;
            transition: 0.3s ease-in-out all;
          }
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
    font-weight: 600;
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