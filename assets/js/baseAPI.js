//每次调用$.get()或$.post()或$.ajax()时候，
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //统一为有权限的接口，设置headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        // console.log('执行了 comeplete回调')
        // console.log(res)
        //在comeplete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'

        }
    }

})