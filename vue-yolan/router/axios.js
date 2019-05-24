import axios from 'axios';
import iView from 'iview';
let base = ''
    //base = 'http://beta.rcmtm.com/';
    base = 'http://172.16.7.78:8800'; //测试
// base = 'http://172.16.17.231:8082'; //小春
console.log('BASE_URL : ' + process.env.BASE_URL);
let baseUrl = process.env.BASE_URL ? process.env.BASE_URL : base;
sessionStorage.setItem("baseUrl",baseUrl);
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
iView.Message.config({
    duration: 3
});
let spin = '';
axios.interceptors.request.use(function(config) {
    config.headers.Authorization = sessionStorage.getItem("token");
    clearTimeout(spin);
    spin = setTimeout(() => {
        iView.Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load',
                        props: {
                            type: 'load-c',
                            size: 18
                        }
                    }),
                    h('div', 'Loading')
                ])
            }
        })
    }, 1000)
    return config;
}, function(error) {
    console.log(error)
    iView.Spin.hide();
    clearTimeout(spin);
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    iView.Spin.hide();
    clearTimeout(spin);
    return response;
}, function(error) {
    iView.Message.destroy();
    if (error.response && error.response.data) {
        iView.Message.error(error.response.data)
    } else {
        iView.Message.error('系统故障、请联系管理员！')
    }

    iView.Spin.hide();
    clearTimeout(spin);
    return Promise.reject(error);
});




export default axios
