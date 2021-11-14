<template>
  <div id="app">
    <SideBar 
    :sideBarOpenCityStatus="appOpenCityStatus" @sideBarOpenCityhandler="appOpenCity"
    :sideBarOpenDistrictStatus="appOpenDistrictStatus"
    @sideBarOpenDistricthandler="appOpenDistrict"
    />
      <router-view/>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
// import {mapState} from "vuex";
export default {
  name: 'app',
  components:{
    SideBar
  },
  data(){
    return {
      appOpenCityStatus:false,
      appOpenDistrictStatus:false,
    }
  },
  methods:{
    appOpenCity(){
      this.appOpenCityStatus = !this.appOpenCityStatus
    },
    appOpenDistrict(){
      this.appOpenDistrictStatus = !this.appOpenDistrictStatus
    }
  }
  // computed:{
  //   ...mapState(["bgModel","modelShow"])
  // }
}
</script>

<style lang="scss">
@import "../src/assets/scss/_variables.scss";
*{
  box-sizing: border-box;
}
html,body{
  // overflow-x: hidden;
  background: $mainLightBgColor;
  width: 100%;
  &::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(79, 106, 122, 0);
    border-radius: 8px;
    background-color: #d5ecfb00;
  }
  &::-webkit-scrollbar
  {
    width: 8px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb
  {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(17, 17, 17, 0);
    background-color: rgba(44, 48, 49, 0.287);
  }
}
#app{
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  @include min-pc
{
    width: 100%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-in-out;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
