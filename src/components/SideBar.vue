<template>
  <div class="SideBar">
    <div class="logo" @click="$router.push('/')">
      <div class="animation-style" ref="animation"></div>
    </div>
    <div class="selction_city">
      <div class="select_city" @click="changeOpenCity()">
        <span>{{selectCity}}</span>
        <div class="icon" :class="{turnup:sideBarOpenCityStatus}">
          <i class="fas fa-chevron-circle-down"></i>
        </div>
      </div>
      <div class="show_city" :class="{openCity:sideBarOpenCityStatus}">
        <div class="north">
          <div class="title">北部地區</div>
          <div class="district_list">
            <div v-for="city in filterCity('North')" :key="city" @click="choseCity(city)" :class="{ active:selectCity===city}">{{city}}</div>
          </div>
        </div>
        <div class="central">
          <div class="title">中部地區</div>
          <div class="district_list">
            <div v-for="city in filterCity('Central')" :key="city" @click="choseCity(city)" :class="{ active:selectCity===city}">{{city}}</div>
          </div>
        </div>
        <div class="south">
          <div class="title">南部地區</div>
          <div class="district_list">
            <div v-for="city in filterCity('South')" :key="city" @click="choseCity(city)" :class="{ active:selectCity===city}">{{city}}</div>
          </div>
        </div>
        <div class="east">
          <div class="title">東部地區</div>
          <div class="district_list">
            <div v-for="city in filterCity('East')" :key="city" @click="choseCity(city)" :class="{ active:selectCity===city}">{{city}}</div>
          </div>
        </div>
        <div class="outer">
          <div class="title">離島地區</div>
          <div class="district_list">
            <div v-for="city in filterCity('Outer')" :key="city" @click="choseCity(city)" :class="{ active:selectCity===city}">{{city}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="selction_district">
      <div class="select_district" @click="changeOpenDistrict()">{{selectDistrict}}
        <div class="icon" :class="{turnup:sideBarOpenDistrictStatus}">
          <i class="fas fa-chevron-circle-down"></i>
        </div>
      </div>
      <div class="show_district" :class="{openDistrict:sideBarOpenDistrictStatus && selectCity !=='選擇城市'}">
        <div class="item" @click="choseDistrict('全部')" :class="{ active:selectDistrict==='全部'}">全部</div>
        <div class="item" v-for="district,idx in filterDistrict" :key="idx" @click="choseDistrict(district)" :class="{ active:selectDistrict===district}">{{district}}</div>
      </div>
    </div>
    <div class="keyword">
      <input type="text" placeholder="輸入關鍵字" v-model="searchKeyword">
    </div>
    <div class="data_mode">
      <div class="mode_item" @click="searchItemsHandler('ScenicSpot')" :class="{active: searchItem === 'ScenicSpot'}">
        <img src="../assets/icon/spot.png" alt="">
      </div>
      <div class="mode_item" @click="searchItemsHandler('Restaurant')" :class="{active: searchItem=== 'Restaurant'}">
        <img src="../assets/icon/food.png" alt="">
      </div>
      <div class="mode_item" @click="searchItemsHandler('Activity')" :class="{active: searchItem=== 'Activity'}">
        <img src="../assets/icon/active.png" alt="">
      </div>
      <div class="mode_item" @click="searchItemsHandler('Hotel')" :class="{active: searchItem=== 'Hotel'}">
        <img src="../assets/icon/hotel.png" alt="">
      </div>
    </div>
    <div class="goSearch" @click="sendSearch()">
      <span>搜索</span>
      <div class="btn">
        <img src="../assets/icon/loupe.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web';
import travel from '../assets/19080-travel-the-world.json';
import { cityLib } from "../lib.js";
export default {
  data() {
    return{
      districtName:[],
      selectCity:'選擇城市',
      selectDistrict:'選擇區域',
      animationSpeed: 1,
      searchItem:'',
      searchKeyword:''
    }
  },
  props:["sideBarOpenCityStatus","sideBarOpenDistrictStatus"],
  computed:{
    filterDistrict(){
      let arr = []
      let arrname = []
      arr = Object.keys(cityLib).filter((item) => cityLib[item].name === this.selectCity);
      arr.forEach((item)=>{
        arrname.push(cityLib[item].district)
      })
      return arrname[0]
    },
  },
  methods:{
    filterCity(region){
      let arr = []
      let arrname = []
      arr = Object.keys(cityLib).filter((item) => cityLib[item].region === region);
      arr.forEach((item)=>{
        arrname.push(cityLib[item].name)
      })
      return arrname
    },
    changeOpenCity(){
      this.$emit('sideBarOpenCityhandler')
    },
    changeOpenDistrict(){
      this.$emit('sideBarOpenDistricthandler')
    },
    choseCity(item){
      this.selectCity = item
      this.selectDistrict = '選擇區域'
    },
    choseDistrict(item){
      this.selectDistrict = item
    },
    searchItemsHandler(item){
      // if(this.searchItems.indexOf(item) != -1){
      //   this.searchItems.splice(this.searchItems.indexOf(item),1)
      // }else{
      //   this.searchItems.push(item)
      // }
      this.searchItem = item
    },
    sendSearch(){
      let district = this.selectDistrict;
      let Keyword = this.searchKeyword
      if(this.selectCity === '選擇城市'){
        return
      }
      if(this.searchItem === ' '){
        return
      }
      if(this.selectDistrict === '選擇區域' || this.selectDistrict === '全部'){
        district = 'all';
      }
      // else{
      //   district = district.slice(0,-1)
      //   Keyword = district +' '+ this.searchKeyword
      // }
      if(Keyword == ''){
        Keyword = 0
      }
      this.$router.push(`/searchPage/${this.searchItem}/${this.selectCity}/${district}/${Keyword}`)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  mounted () {
    lottie.loadAnimation({
        container: this.$refs.animation,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: travel,//动画json
      }
    );
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.animation-style{
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.SideBar{
  width: 400px;
  height: 100vh;
  position: sticky;
  margin: 0;
  top: 0;
  left: 0;
  background: $mainLightColor;
  overflow-y: auto;
  @extend %box-shadow;
  .logo{
    cursor: pointer;
  }
  .data_mode{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    margin-top: 100px;
    margin-bottom: 20px;
    @include min-pc { margin-top: 20px;}
    .mode_item{
      width:calc(25% - 10px) ;
      margin: 5px;
      padding: 10px;
      border-radius: 20px;
      cursor: pointer;
      border: 1px solid $mainLightColor;
      transition: 0.3s ease-in-out all;
      &:hover{
        transition: 0.3s ease-in-out all;
        border: 2px solid $mainBgColor;
      }
      &.active{
        transition: 0.3s ease-in-out all;
        border: 2px solid $mainBgColor;
      }
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .goSearch{
    height: 80px;
    width: 70%;
    margin: 0 auto;
    background: $secondBgColor;
    border-radius: 20px;
    position: relative;
    @extend %flex-center;
    &:hover{
      transition: 0.3s ease-in-out all;
      transform: scale(1.05);
    }
    &:active{
      transition: 0.3s ease-in-out all;
      transform: scale(0.95);
    }
    span{
      width: 100%;
      height: 100%;
      text-align: center;
      color: $mainWhiteColor;
      font-size: 24px;
      line-height: 80px;
      font-weight: 800;
      cursor: pointer;
    }
    .btn{
      width: 50px;
      height: 80%;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: 0.3s ease-in-out all;
      img{
        @extend %img-contain
      }
    }
  }
  .selction_city{
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    .select_city{
      margin: 0 auto;
      width: 80%;
      height: 40px;
      border: 1px solid $grayColor;
      border-radius: 20px;
      cursor: pointer;
      color: $grayColor;
      font-size: 20px;
      font-weight: 600;
      line-height: 40px;
      padding-left: 20px;
      letter-spacing: 2px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      .icon{
        margin-right: 10px;
        transition: 0.3s ease-in-out all;
        &.turnup{
          transition: 0.3s ease-in-out all;
          transform: rotate(180deg);
        }
      }
    }
    .show_city{
      z-index: 3;
      width: 90%;
      height: 500px;
      background: $mainWhiteColor;
      border-radius: 20px;
      padding: 10px;
      position:absolute;
      top:41px;
      left: 50%;
      overflow-y: scroll;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s ease-in-out all;
      transform: translate(-50%,-50px);
      @extend %list-shadow;
      @include min-pc { height: 350px;}
      &.openCity{
        visibility: visible;
        opacity: 1;
        transform: translate(-50%,0px);
        transition: 0.3s ease-in-out all;
      }
      .title{
        font-size: 20px;
        text-align: center;
        color: $darkGrayColor;
        border-bottom: 1px solid $mainBgColor;
        margin: 10px 20px;
        padding: 10px;
        font-weight: 600;
      }
      .district_list{
        div{
          display: inline-block;
          color: $darkGrayColor;
          border: 1px solid $mainBgColor;
          border-radius: 10px;
          cursor: pointer;
          padding: 10px;
          margin: 10px;
          transition: 0.3s ease-in-out all;
          &:hover{
            background: $secondBgColor;
            color: #fff;
            transition: 0.3s ease-in-out all;
          }
        }
        .active{
          background: $secondBgColor;
          color: #fff;
          transition: 0.3s ease-in-out all;
        }
      }
      &::-webkit-scrollbar-track
      {
        -webkit-box-shadow: inset 0 0 6px rgba(79, 106, 122, 0);
        border-radius: 8px;
        background-color: #d5ecfb00;
      }
      &::-webkit-scrollbar
      {
        width: 8px;
        background-color: #f5f5f500;
      }
      &::-webkit-scrollbar-thumb
      {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(111, 132, 145, 0);
        background-color: rgba(111, 143, 155, 0);
      }
        }
  }
  .selction_district{
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    .select_district{
      margin: 0 auto;
      width: 80%;
      height: 40px;
      border: 1px solid $grayColor;
      border-radius: 20px;
      cursor: pointer;
      color: $grayColor;
      font-size: 20px;
      font-weight: 600;
      line-height: 40px;
      padding-left: 20px;
      letter-spacing: 2px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      .icon{
        margin-right: 10px;
        transition: 0.3s ease-in-out all;
        &.turnup{
          transition: 0.3s ease-in-out all;
          transform: rotate(180deg);
        }
      }
    }
    .show_district{
      z-index: 2;
      width: 90%;
      max-height: 400px;
      background: $mainWhiteColor;
      border-radius: 20px;
      padding: 10px;
      position:absolute;
      top:41px;
      left: 50%;
      overflow-y: scroll;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s ease-in-out all;
      transform: translate(-50%,-50px);
      @include min-pc { max-height: 300px;}
      @extend %list-shadow;
      @extend %flex-center;
      &.openDistrict{
        visibility: visible;
        opacity: 1;
        transform: translate(-50%,0px);
        transition: 0.3s ease-in-out all;
      }
      .item{
          display: inline-block;
          color: $darkGrayColor;
          border: 1px solid $mainBgColor;
          border-radius: 10px;
          cursor: pointer;
          padding: 10px;
          margin: 10px;
          transition: 0.3s ease-in-out all;
          &:hover{
            background: $secondBgColor;
            color: #fff;
            transition: 0.3s ease-in-out all;
          }
        &.active{
          background: $secondBgColor;
          color: #fff;
          transition: 0.3s ease-in-out all;
        }
      }
      &::-webkit-scrollbar-track
      {
        -webkit-box-shadow: inset 0 0 6px rgba(79, 106, 122, 0);
        border-radius: 8px;
        background-color: #d5ecfb00;
      }
      &::-webkit-scrollbar
      {
        width: 8px;
        background-color: #f5f5f500;
      }
      &::-webkit-scrollbar-thumb
      {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 6px rgba(111, 132, 145, 0);
        background-color: rgba(111, 143, 155, 0);
      }
    }
  }
  .keyword{
      margin: 0 auto;
      width: 80%;
    input{
      height: 40px;
      width: 100%;
      color: $grayColor;
      font-size: 20px;
      font-weight: 600;
      line-height: 40px;
      padding-left: 20px;
      letter-spacing: 2px;
      border: 1px solid $grayColor;
      border-radius: 20px;
      background: $mainLightColor;
      cursor: pointer;
      &::placeholder{
        color:$grayColor;
      }
      &:focus{
        outline: none;
      }
    }
  }
}
</style>