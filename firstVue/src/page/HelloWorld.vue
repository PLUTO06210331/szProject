<template>
  <div id="HelloWorld">
    {{ count }}
    <button @click="add">+1</button>
    <button @click="jianjian">-1</button>
    <button @click="actionjia"> +1 </button>
    <ul>
      <li><router-link to="/firstChild">firstChild</router-link></li>
    </ul>
    <div class="test">
      <p class="imp">Hello World</p>
      <span class="imspan">Hello World</span>
    </div>
    <div class="table">
      <Table border :columns="columns" :data="data"></Table>
    </div>
    <div class="form" style="margin-top: 20px;" v-bind="formItem">
      姓名: <input type="text" v-model="formItem.name" placeholder="姓名">
      年龄: <input type="text" v-model="formItem.age" placeholder="年龄">
      地址: <input type="text" v-model="formItem.address" placeholder="地址">
      <button @click="addShow">添加</button>
    </div>
    <div v-if="modalShow">
      <Modal v-model="modalShow"  :mask-closable="false" width="700">
        <p slot="header" style="color:#f60">
          <span>编辑信息</span>
        </p>
        <Form :model="formLeft" label-position="left" :label-width="100">
          <Form-item label="name">
            <Input v-model="formLeft.name"></Input>
          </Form-item>
          <Form-item label="age">
            <Input v-model="formLeft.age"></Input>
          </Form-item>
          <Form-item label="address">
            <Input v-model="formLeft.address"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button  type="error" @click="sure()">确定</Button>
        </div>
      </Modal>
    </div>

    <h1>{{ message }}</h1>
    
    <game>
      <h1 slot='header'></h1>
      <p>主要内容段落</p>
      <p slot="footer">这里是尾部</p>
    </game>

    <div> {{ fullName }} </div>


    <first-child newData="父组件中的值"></first-child>


  </div>
</template>

<script>
  import Game from '../components/game.vue'
  import FirstChild from './firstChild.vue'
  import Bus from '../components/bus.js'
  import { mapState,mapMutations } from 'vuex'

  export default{
    name:"HelloWorld",
    components: {Game,FirstChild},
    data () {
      return {
        kkk: 'Hellom wORLOD',
        message: 0,
        firstValue:'',
        firstName:'song',
        lastName:'zhen',
        secondValue:'',
        formItem:{
          name:"",
          age:"",
          address:"",
        },
        thisIndex:"",
        formLeft:{
          name:"",
          age:"",
          address:""
        },
        modalShow:false,
        columns:[
          {
            title: '姓名',
            key: 'name',
            width: '20%',
            align: 'center',
            render: (h,params) => {
                return h('div',[
                    h('Icon',{
                        props: {
                            type: 'person'
                        }
                    }),
                    h('strong',params.row.name)
                ]);
            }
          },
          {
            title: '年龄',
            key: 'age',
            width: '20%',
            align: 'center',
          },
          {
            title: '地址',
            key: 'address',
            width: '20%',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            width: '40%',
            align: 'center',
            render: (h,params) => {
              return h('div',[
                h('Button',{
                  props:{
                    type: 'primary',
                    size:'small'
                  },
                  style:{
                    marginRight:'5px',
                  },
                  on:{
                    click:() => {
                      this.show(params.index)
                    }
                  }
                },'编辑'),
                h('Button',{
                  props:{
                    type:'error',
                    size:'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },'删除')
              ])
            }
          }
        ],
        data:[
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      }
    },

    computed: {

        fullName: {
          // return this.firstName + this.lastName
          get: function(){
            return this.firstName + this.lastName
          },
          set: function(val){
            console.log(val)
          }
        },
      // count () {
      //     return this.$store.state.count;
      // },
      ...mapState({
        // count: state => state.count
        count: 'count'
      })
    },

    created () {
      Bus.$on('getNum',num => {
        console.log(num);
        this.message = num;
        console.log(this.message);
      })
    },

    methods: {
        show (index) {
            this.thisIndex = index;
            this.modalShow = true;
            this.formLeft.name = this.data[index].name;
            this.formLeft.age = this.data[index].age;
            this.formLeft.address = this.data[index].address;
        },
        sure () {
          this.data[this.thisIndex].name = this.formLeft.name;
          this.data[this.thisIndex].age = this.formLeft.age;
          this.data[this.thisIndex].address = this.formLeft.address;
          this.modalShow = false;
        },
        remove (index) {
          this.data.splice(index,1);
        },
        addShow () {
            if(this.formItem.name == "" || this.formItem.age == "" || this.formItem.address == ""){
              this.$Message.error('请填写数据');
            }else{
              this.data.push(this.formItem);
              this.formItem = "";
            }
        },

        ...mapMutations({
          add:'increment',
          jianjian:'decrease',
        }),

        // add () {
        //   this.$store.commit('increment');
        // },
        jianjian () {
          this.$store.commit('decrease');
        },
        actionjia () {
            this.$store.dispatch('increment');
        }
    }
  }
</script>
<style>
  .table Table{
    width:100% !important;
  }
  .table .ivu-table-wrapper .ivu-table-header{
    width:100%;
  }
</style>
