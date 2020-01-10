<template>
  <transition appear appear-active-class="animated fadeIn">
   <div class="kv_wrap">
      <div class="kv_box">
        <img src="../assets/icon_1.png" class="kv_main">
        <img src="../assets/ball_1.png" class="ball_1 ball">
        <img src="../assets/ball_2.png" class="ball_2 ball">
        <img src="../assets/ball_3.png" class="ball_3 ball">
      </div>
      <div class="slogan">
        <!-- <img src="../assets/slogan_1.png" class="slogan_1"> -->
        <div class="slogan_1">
          <img src="../assets/letter/letter_7.png" class="letter">
          <img src="../assets/letter/letter_8.png" class="letter">
          <img src="../assets/letter/letter_9.png" class="letter">
          <img src="../assets/letter/letter_10.png" class="letter">
          <img src="../assets/letter/letter_11.png" class="letter" style="margin: 0 -4%;">
          <img src="../assets/letter/letter_1.png" class="letter">
          <img src="../assets/letter/letter_2.png" class="letter">
          <img src="../assets/letter/letter_3.png" class="letter">
          <img src="../assets/letter/letter_4.png" class="letter">
          <img src="../assets/letter/letter_5.png" class="letter">
          <img src="../assets/letter/letter_6.png" class="letter">
          <!-- img icon -->
          <img src="../assets/letter/ico.png" class="inteIcon">
        </div>
        <!-- <img src="../assets/slogan_2.png" class="slogan_2"> -->
        <div class="slogan_2">
          鼠年春节主题体验版上线，一键AI设计
        </div>
      </div>
      <div class="begin_btn hoverable" @click="enter_choose();mtj_baidu('beginDesign','click','beginDesign')"><div class="anim"></div>开始体验</div>
   </div>
  </transition>
</template>
<style type="text/css" scoped>
  .kv_wrap{
    width: 100%;
    height: 100%;
    overflow: hidden!important;
  }
  .kv_box{
    width: 100%;
    height: 100%;
    background: url(../assets/kv_bg.png) no-repeat top center/100%;
    position: relative;
    overflow: hidden;
  }
  .kv_main{
    width: 10rem;
    position: absolute;
    left: -3%;
    right: 0;
    margin: 0 auto;
    top: 16%;
  }
  .ball{
    position: absolute;
    transform-origin: center;
    animation: paulse 5s ease-in-out alternate infinite
  }
  .ball_1{
    width: 7.52rem;
    top: 50%;
    left: -26%;
    margin-top: -3.7rem;
    animation-delay: .5s;
  }
  @keyframes paulse {
    0%{
      transform: scale(1);
      opacity: 1;
    }
    50%{
      transform: scale(.95);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.05);
      opacity: 1;
    }
  }
   @keyframes paulse_2 {
    0%{
      transform: scale(1);
      opacity: 1;
    }
    50%{
      transform: scale(.6);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.05);
      opacity: 1;
    }
  }
  .ball_2{
    width: 2.16rem;
    right: 20%;
    top: -6%;
    animation-name: paulse_2;
    animation-duration: 10s;
  }
  .ball_3{
    width: 4.39rem;
    right: -10%;
    bottom: -17%;
    animation-delay: 1s;
    animation-duration: 4s;
  }
  .slogan {
    width: 5.22rem;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 20%;
  }
  .slogan img {
    display: block;
    margin:0 auto;
  }
  .slogan_1{
    width: 3.29rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    opacity: 1
  }
  .slogan_1 img{
    width: .6rem;
    display: inline-block;
    margin: 0 -.03rem;
  }
  .slogan_2{
    margin-top: 3%;
    color: rgba(34,34,34,.8);
    font-weight: lighter;
    font-size: .24rem;
    opacity: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
  }
  .slogan_2:after, .slogan_2:before {
    content: '';
    width: .62rem;
    height: .15rem;
    /*position: absolute;*/
    background-size: 100% auto;
    background-position: top center;
    background-repeat: no-repeat;
  }
  .slogan_2:after {
    background-image: url(../assets/slogan_r.png);
       margin-left: 2%;
  }
  .slogan_2:before {
    background-image: url(../assets/slogan_l.png);
    margin-right: 2%;
  }
  .begin_btn{
    color: #fff;
    width: 2.08rem;
    height: .58rem;
    background: url(../assets/begin_kv.png) no-repeat top center/100%;
    line-height: .58rem;
    text-align: center;
    position: absolute;
    overflow: hidden;
    left: 0;
    right: 0;
    margin:0 auto;
    bottom: .7rem;
    font-size: .24rem;
    cursor: pointer;
    transition: all .2s ease
  }
  .begin_btn:active {
    transform: scale(.8)!important;
  }
  
  img.inteIcon{
    width: .43rem;
    position: absolute;
    right: -.8rem;
    top: 0;
  }

  @media screen and (max-height: 600px) {
    .kv_icon1{
      width: 8.5rem;
      left: 29%;
    }
    .kv_cover{
      top: -.5rem;
    }
  }


</style>
<script type="text/javascript">
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex' //引入state，getters，mutations
import anime from 'animejs/lib/anime.es.js';
import {requestFirstQuestion} from '@/api/service.js' 
export default {
  name: 'cover',
  props: {
    // msg: String //例子
  },
  data: function() {
    return {
    }
  },
  created: function() {
  },
  mounted: function() {
    this.cover_animate()  
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    ...mapMutations(['setAnswerIndex', 'setQuestionOriginData']),
    // ...mapActions(['setQuesData']),
    cover_animate: function() {
      anime.timeline()
    //  .add({
    //   targets: '.slogan_1',
    //   opacity: 1,
    //   duration: 3000,
    //   easing: "easeOutExpo",
    //   delay: 500
    // })
    //  .add({
    //   targets: '.slogan_1 .letter',
    //   translateY: [-180,0],
    //   easing: "easeOutExpo",
    //   duration: 2000,
    //   delay: (el, i) => 100 * i
    // },'-=3700')
    .add({
      targets: '.slogan_1 .letter',
      translateY: [-160,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1800,
      delay: (el, i) => 300 + 85 * i
    })
    .add({
      targets: '.inteIcon',
      opacity: [0,1],
      translateX: [-40,0],
      translateZ: 0,
      scaleX: [0.3, 1],
      easing: "easeOutExpo",
      duration: 800,
      offset: '-=600'
    }, '-=1200')
    .add({
      targets: '.slogan_2',
      translateY: [".5rem", 0],
      opacity: 1,
      duration: 2000,
      easing: "easeOutExpo",
      delay: 0
    },'-=700')
    //  .add({
    //   targets: '.slogan_2 .letters',
    //   translateY: ["1.2em", 0],
    //   translateX: ["0.55em", 0],
    //   translateZ: 0,
    //   opacity: [0,1],
    //   rotateZ: [180, 0],
    //   duration: 500,
    //   easing: "easeOutExpo",
    //   delay: (el, i) => 50 * i
    // },'-=1000')
    .add({
      targets: '.begin_btn',
      translateY: ["1rem", 0],
      opacity: [0,1],
      duration: 1000,
      delay: 500,
      easing: "easeOutExpo",
    },'-=2000')
   },
    enter_choose: function() {
      // 请求题目
      // this.requestFirstQues()

      if(this.isLogin) {
        this.$router.push('/inputMsg/q1');
        this.setAnswerIndex(1)
      }else {
        
        this.openLogin()
      }
     
    },
    requestFirstQues: function() {
      const me =this;
      requestFirstQuestion()
      .then(function(data) {
        console.log(data.data)
        me.setQuestionOriginData([data.data,0,0])
      })
      .catch(function(e) {
        console.log(e)
        me.$router.push('/');
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.requestFirstQues()
    })
  }
};

</script>
