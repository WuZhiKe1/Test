/*
利用
mockjs
来
mock
数据接口
*/
import Mock from 'mockjs'
// 图片/JSON格式是默认对外暴露
import banner from './banner.json'
import floor from './floor.json'

// 提供广告位轮播数据的接口
// Mock.mock('请求地址'，{请求数据})
Mock.mock(
    '/mock/banner',
    {
        code: 200,
        data: banner
    }
)
//提供所有楼层数据的接口

Mock.mock(
    '/mock/floor',
    {
        code: 200,
        data: floor
    }
)