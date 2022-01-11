<template>
    <div class="hot_spot">
      <div class="title">
        <img src="../assets/icon/hot_spot.png" alt="">
      </div>
      <div class="box">
          <div class="col">
            <router-link :to="`/searchPage/ScenicSpot/Taiwan/all/九份`">
              <div class="pic">
                <img src="../assets/img/pic1.jpg" alt="九份">
                <div class="name">九份</div>
              </div>
            </router-link>
          </div>
        <div class="col half">
          <div class="pic_half">
            <router-link :to="`/searchPage/ScenicSpot/Taiwan/all/日月潭`">
              <img src="../assets/img/pic2.jpg" alt="日月潭">
              <div class="name">日月潭</div>
            </router-link>
          </div>
          <div class="pic_half">
            <router-link :to="`/searchPage/ScenicSpot/Taiwan/all/墾丁`">
              <img src="../assets/img/pic3.jpg" alt="墾丁">
              <div class="name">墾丁</div>
            </router-link>
          </div>
        </div>
        <div class="col">
            <router-link :to="`/searchPage/ScenicSpot/Taiwan/all/太魯閣`">
              <div class="pic">
                <img src="../assets/img/pic4.jpg" alt="太魯閣">
                <div class="name">太魯閣</div>
              </div>
            </router-link>
        </div>
        <div class="col half">
          <div class="pic_half">
            <router-link :to="`/searchPage/ScenicSpot/Taiwan/all/阿里山`">
              <img src="../assets/img/pic5.jpg" alt="阿里山">
              <div class="name">阿里山</div>
            </router-link>
          </div>
          <div class="pic_half">
            <router-link :to="`/searchPage/ScenicSpot/Taiwan/all/野柳`">
              <img src="../assets/img/pic6.jpg" alt="野柳">
              <div class="name">野柳</div>
            </router-link>
          </div>
        </div>
        <div class="col">
          <router-link :to="`/searchPage/ScenicSpot/Taiwan/all/平溪`">
            <div class="pic">
              <img src="../assets/img/pic7.jpg" alt="平溪">
              <div class="name">平溪</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
  .hot_spot{
    margin: 50px 30px;
    .title{
      width: 150px;
      margin-bottom: 20px;
      img{
        @extend %img-set;
      }
    }
    .box{
      width: 100%;
      height: 300px;
      @extend %flex-wrap;
      .col{
        width: 20%;
        height: 100%;
        .pic{
          width:calc(100% - 10px);
          height: calc(100% - 10px);
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          margin: 5px;
          position: relative;
          cursor: pointer;
          img{
            @extend %img-cover;
            @extend %position-center;
            transition: 0.3s ease-in-out all;
          }
          &:hover{
            img{
              width: 120%;
              height: 120%;
              filter: brightness(0.7);
              transition: 0.3s ease-in-out all;
            }
          }
        }
        .pic_half{
          width:calc(100% - 5px);
          height: calc(50% - 5px);
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          img{
            @extend %img-cover;
            @extend %position-center;
            transition: 0.3s ease-in-out all;
          }
            &:hover{
              img{
                width: 120%;
                height: 120%;
                filter: brightness(0.7);
                transition: 0.3s ease-in-out all;
              }
            }
        }
        .name{
          color: white;
          font-size: 20px;
          letter-spacing: 2px;
          font-weight: 600;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .half{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0px;
      }
    }
  }
</style>