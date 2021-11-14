<template>
  <div id="home">
    <Banner/>
    <HotSpot/>
    <Food :place="'Taiwan'"/>
    <Activity :place="'Taiwan'"/>
    <Footer/>
  </div>
</template>

<script>
// import Nav from '@/components/Nav.vue'
import Banner from '@/components/Banner.vue'
import HotSpot from '@/components/HotSpot.vue'
import Food from '@/components/Food.vue'
import Activity from '@/components/Activity.vue'
import Footer from '@/components/Footer.vue'
export default {
  name:'Home',
  components: {
    Banner,HotSpot,Food,Activity,Footer
  },
  data(){
    return{
    }
  },
  methods:{
  },
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
#home{
  font-family: 'Poppins', sans-serif;
  margin: 0;
  width: calc(100% - 400px);
  padding: 0px;
}

</style>