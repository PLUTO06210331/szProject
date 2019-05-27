<template>
  <div class="hello">
    <!--<ul>
      <li><prop-message message="Hello!"></prop-message></li>
      <li><prop-game><div slot="k1">王者荣耀</div></prop-game></li>
      <li><prop-game><div slot="k2">英雄联盟</div></prop-game></li>
      <li><prop-game><div slot="k3">绝地求生</div></prop-game></li>
      <li><router-link to="/firstChild">This is firstChild</router-link></li>
      <input type="text" v-drag>
    </ul>-->
    <!-- <div id="danxuan" v-show="one">
      <p>请问您的性别是:</p>
      <input type="radio" name="sex" value="boy" v-model="picked">男
      <input type="radio" name="sex" value="girl" v-model="picked">女
      <input type="radio" name="sex" value="ather" v-model="picked">同性恋
      <p class="pass" v-show="toggle">请选择性别</p>
      <p> {{ picked }} </p>
      <p>
        <button @click="reset(1)">重置</button>
        <button @click="next">下一步</button>
      </p>
    </div>
    <div class="hello1" v-show="two">
      <p id="asd">请选择您的兴趣爱好:</p>
      <input type="checkbox" name="fab" v-model="checked" value="books">看书
    <input type="checkbox"  name="fab" v-model="checked" value="swim">游泳
    <input type="checkbox"  name="fab" v-model="checked" value="run">跑步
    <input type="checkbox"  name="fab" v-model="checked" value="bask">篮球
    <input type="checkbox"  name="fab" v-model="checked" value="foot">足球
    <p class="pass" v-show="toggle">请选择爱好</p>
      <p class="pass" v-show="toggle1">至少选择三种爱好</p>
      <p>
        <button @click="pev(1)">上一步</button>
        <button @click="reset(2)">重置</button>
        <button @click="next1">下一步</button>
      </p>
    </div>
    <div class="hello1" v-show="three">
      <p>请介绍一下自己:</p>
      <textarea name="pro" v-model="textarea"></textarea>
      <p class="pass" v-show="toggle2">请输入内容</p>
      <p class="pass" v-show="toggle3">最少100个汉字</p>
      <p>
        <button @click="pev(2)">上一步</button>
        <button @click="reset(3)">重置</button>
        <button @click="submit">提交</button>
      </p>
    </div> -->
    <button @click="handleAdd()">传值</button>
    <div><router-link to="/secondChild">SecondChild</router-link></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Bus from '../components/bus.js'
  export default {
    name: 'firstChild',
    props:['newData'],
    data () {
      return {
        // picked: '',
        // checked:[],
        // toggle: false,
        // toggle1: false,
        // toggle2:false,
        // toggle3:false,
        // one: true,
        // two:false,
        // three:false,
        // textarea:"",
        busMessage:'',
        newData1: this.newData,
        testData:'sssss'
      }
    },
        beforeCreate: function () {
                console.group('beforeCreate 创建前状态===============》');
               console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); //undefined 
               console.log("%c%s", "color:red","message: " + this.testData)  
        },
        created: function () {
            console.group('created 创建完毕状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //undefined
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); //已被初始化 
               console.log("%c%s", "color:red","message: " + this.testData); //已被初始化
        },
        beforeMount: function () {
            console.group('beforeMount 挂载前状态===============》');
            console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
            console.log(this.$el);
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); //已被初始化  
               console.log("%c%s", "color:red","message: " + this.testData); //已被初始化  
        },
        mounted: function () {
            console.group('mounted 挂载结束状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); //已被初始化
               console.log("%c%s", "color:red","message: " + this.testData); //已被初始化 
        },
        beforeUpdate: function () {
            console.group('beforeUpdate 更新前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);   
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); 
               console.log("%c%s", "color:red","message: " + this.testData); 
        },
        updated: function () {
            console.group('updated 更新完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el); 
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); 
               console.log("%c%s", "color:red","message: " + this.testData); 
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); 
               console.log("%c%s", "color:red","message: " + this.testData); 
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);  
               console.log("%c%s", "color:red","data   : " + JSON.stringify(this.$data)); 
               console.log("%c%s", "color:red","message: " + this.testData)
        },
    // beforeDestroy () {
    //   console.log(this.newData1);
    //   const num = Math.floor(Math.random()*100 + 1);
    //   Bus.$emit('getNum',num)
    // },
    methods: {
      handleAdd () {
        // const num = Math.floor(Math.random()*100 + 1);
        // Bus.$emit('getNum',num)
        this.$router.push('/')
      },
      reset (num) {
        if(num == 1){
          this.picked = "";
          this.toggle = false;
        }
        if(num == 2){
          this.checked = "";
          this.toggle1 = false;
          this.toggle = false;
        }else if(num == 3){
          this.textarea = "";
        }
      },
      next () {
        if(this.picked == ""){
          this.toggle = true;
        }else{
          this.one = false;
          this.toggle = false;
          this.two = true;
        }
      },
      pev (num) {
        if(num == 1) {
          this.one = true;
          this.two = false;
        }else if(num == 2){
          this.three = false;
          this.two = true;
        }
      },
      next1 () {
        if(this.checked == ""){
          this.toggle = true;
          this.toggle1 = false;
        }
        else if(this.checked.length < 3) {
          this.toggle1 = true;
          this.toggle = false;
        }else{
          this.toggle1 = false;
          this.toggle = false;
          this.two = false;
          this.three = true;
        }
      },
      submit () {
        if(this.textarea == ""){
          this.toggle3 = false;
          this.toggle2 = true;
        }else if(this.textarea.length < 100){
          console.log("ss");
          this.toggle2 = false;
          this.toggle3 = true;
        }else {
          console.log("性别"+ this.picked + "爱好" + this.checked + "描述" + this.textarea);
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

</style>
