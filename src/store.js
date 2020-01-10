import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
})

export default new Vuex.Store({
  state: {
    answer_index: 1,
    isLogin: Vue.prototype.getCookie('isLogin') ? Vue.prototype.getCookie('isLogin') : false,
    currentUser: Vue.prototype.getCookie('currentUser') ? JSON.parse(Vue.prototype.getCookie('currentUser')).user_name : '',
    author_id: Vue.prototype.getCookie('author_id') ? Vue.prototype.getCookie('author_id') : '',
    integral: Vue.prototype.getCookie('integral') ? Vue.prototype.getCookie('integral') : '1000',
    sex: Vue.prototype.getCookie('sex') ? Vue.prototype.getCookie('sex') : '1',
    // department_id: Vue.prototype.getCookie('department_id') ? Vue.prototype.getCookie('department_id') : '',
    // department_name: Vue.prototype.getCookie('department_name') ? Vue.prototype.getCookie('department_name') : '',
    max_pages: 0, //设置最大页码
    _need_render: 0, //是否需要渲染 0 需要； 1不需要
    questionOriginData: [
      {
        quest_title: '服务公司所属行业',
        btns: [
          {id: 0, answer_t: '移动通讯', path: require('@/assets/answer/pic_1.png'), select: 1},
          {id: 1, answer_t: '家电零售', path: require('@/assets/answer/pic_1.png'), select: 0},
          {id: 2, answer_t: '美妆个护', path: require('@/assets/answer/pic_1.png'), select: 0},
        ],
        selectIndex: 0
      },
      {
        quest_title: '服务公司的品牌特征',
        btns: [
          {id: 0, answer_t: '新潮有趣', path: require('@/assets/answer/pic_1.png'), select: 1},
          {id: 1, answer_t: '活力张扬', path: require('@/assets/answer/pic_1.png'), select: 0},
          {id: 2, answer_t: '温馨随和', path: require('@/assets/answer/pic_1.png'), select: 0},
          {id: 3, answer_t: '专业可靠', path: require('@/assets/answer/pic_1.png'), select: 0},
          {id: 4, answer_t: '文化品位', path: require('@/assets/answer/pic_1.png'), select: 0},
        ],
        selectIndex: 0
      },
      {
        quest_title: '此次推广面向的目标人群',
        btns: [
          {id: 0, answer_t: 'Z世代', path: require('@/assets/answer/pic_1.png'), select: 1},
          {id: 1, answer_t: '时尚青年', path: require('@/assets/answer/pic_1.png'), select: 0},
          {id: 2, answer_t: '居家男女', path: require('@/assets/answer/pic_1.png'), select: 0},
          {id: 3, answer_t: '社会中坚', path: require('@/assets/answer/pic_1.png'), select: 0},
          {id: 4, answer_t: '泛人群', path: require('@/assets/answer/pic_1.png'), select: 0},
        ],
        selectIndex: 0
      },
      {
        quest_title: '此次推广的传播目的',
        btns: [
          {id: 0, answer_t: '品牌宣传',path: '//ht.idealead.hbindex.com/uploadFiles/images/bq/ppxc.jpg', select: 1},
          {id: 1, answer_t: '产品促销',path: '//ht.idealead.hbindex.com/uploadFiles/images/bq/cpcx.jpg', select: 0},
          {id: 2, answer_t: '新品发布',path: '//ht.idealead.hbindex.com/uploadFiles/images/bq/xpfb.jpg', select: 0},
        ],
        selectIndex: 0
      },
      {
        quest_title: '此次推广的投放渠道',
        btns: [
          {id: 0, answer_t: '开屏页',path: require('@/assets/answer/img_welcome.png'),sizeSrc: require('@/assets/answer/size1.png'), select: 1},
          // {id: 1, answer_t: '信息流',path: require('@/assets/answer/img_info.png'),sizeSrc: require('@/assets/answer/size_2.png'), select: 0},
          {id: 1, answer_t: '网站Banner',path: require('@/assets/answer/img_banner.png'),sizeSrc: require('@/assets/answer/size2.png'), select: 0},
          // {id: 3, answer_t: '电商平台',path: require('@/assets/answer/img_e.png'),sizeSrc: require('@/assets/answer/size_4.png'), select: false},
        ],
        selectIndex: 0
      }

    ],
    _renderTempateData: {},
    design_lists: [],
  },
  mutations: {
    setAnswerIndex(state, data) {
      // 设置answer_index
      if(data < 1){ data = 1}
        // else if(data > 5){data = 5}
        else if(data > 4){data = 4}
      state.answer_index = data
    },
    setQuestionOriginData(state, data) {
      /**
       * [data,a,b]
       * @type {Array} 
       * data {数据}
       * a {设置初始选项 0 1 ....}
       * b {设置数据更改的索引}
       */
      let changeIndex = 0;
      if(data[2] != undefined) {
        changeIndex= data[2];
      }else{
        changeIndex= state.answer_index-1
      }
      state.questionOriginData[changeIndex].btns = data[0];
      //同时更改选择的答案
        state.questionOriginData[changeIndex].selectIndex = data[1]
    },
    setUserStatus(state, data) {
      if(data) {
        state.isLogin = true;
        state.currentUser = data.user_name;
        state.author_id = data.id
        state.integral = data.integral
        state.sex = data.sex
        // state.department_name = data.dep_name
      }else {
        return false
      }
    },
    setUserIntegral(state, data) {
      state.integral = data
    },
    setDesignLists(state, data) {
      console.log('adasadsadsad')
      state.design_lists = data
    },
    setMaxPages(state, data) {
      state.max_pages = data
    },
    setNeedRender(state, data) {
      state._need_render = data
    },
    setRenderData(state, data) {
      state._renderTempateData = data
    }
  },
  // actions: {
  //   setQuesData (context, data) {
  //     console.log('揍我走走走走')
  //     context.commit('setQuestionOriginData', data)
  //   }
  // },
  plugins: [vuexLocal.plugin]
})
