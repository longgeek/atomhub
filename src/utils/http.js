/*
 * 导入封装好的 axios 实例
 */
import request from '@/utils/request';

const http = {
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     * @param data 请求参数
     * @param config 请求 headers 参数, 主要用到了文件上传时指定不同的 Content-Type
     */
    get(url, params={}) {
        return request({
            url: url,
            method: 'get',
            params: params,
        });
    },
    post(url, data={}, config={}) {
        return request({
            url: url,
            method: 'post',
            data: data,
            config: config,
        });
    },
    put(url, params={}) {
        return request({
            url: url,
            method: 'put',
            params: params,
        });
    },
    delete(url, params={}) {
        return request({
            url: url,
            method: 'delete',
            params: params,
        });
    }
}

export default http;
