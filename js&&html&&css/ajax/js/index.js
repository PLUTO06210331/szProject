$(function(){
	layui.define(['layer','form'],function(exports){
		layer.open({
			title:'在线测试',
			shade:0,
			anim:1,
			icon:1,
			skin: 'demo-class',
			content:'可以填写任意的拉伊代码'
		});
		exports('index',{});       //模块输出核心,模块命必须和use时的模块名一致
	}); 
});
