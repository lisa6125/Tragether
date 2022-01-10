<template>
    <div class="activity">
      <div class="title">
        <img src="../assets/icon/activity_title.png" alt="">
      </div>
      <div class="activity_list">
        <div class="card_activity" v-for="item in activityArr" :key="item.ActivityID
" @click="$router.push(`/detailPage/${item.ActivityID
}
`)">
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
</template>

<script>
import {
  getTravelInfo,
} from "../modules.js";
export default {
  data(){
    return {
      activityArr:[]
    }
  },
  props:["place","ranNum",],
  methods:{
    initGet(){
      let ranNum = Math.floor(Math.random()*30)+1;
      getTravelInfo("Activity",this.place,this.ranNum,5)
      .then((res)=>{
        this.activityArr = res
        this.activityArr.map((e)=>{
          e.StartTime = e.StartTime.slice(0,10)
          e.EndTime = e.EndTime.slice(0,10)
        })
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
.activity{
  margin: 50px 30px;
  margin-bottom: 100px;
  .title{
    width: 150px;
    margin-bottom: 20px;
    img{
      @extend %img-set;
    }
  }
  .activity_list{
    width: 100%;
    @extend %flex-wrap;
    position: relative;
    transition: 0.3s ease-in-out all;
    .card_activity{
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
</style>