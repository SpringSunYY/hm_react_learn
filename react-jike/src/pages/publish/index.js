import {Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Space, Upload} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import 'react-quill/dist/quill.snow.css'
import {useEffect, useState} from 'react'
import {createArticleAPI, getArticleById, updateArticleAPI} from '@/apis/article'
import MyAiEditor from "@/components/MyAiEditor";
import {useChannel} from "@/hooks/useChannel";

const {Option} = Select

const Publish = () => {

    // 提交表单
    const onFinish = (formValue) => {
        console.log(formValue)
        // 校验封面类型imageType是否和实际的图片列表imageList数量是相等的
        if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
        const {title, content, channel_id} = formValue
        // 1. 按照接口文档的格式处理收集到的表单数据
        const reqData = {
            title,
            content,
            cover: {
                type: imageType, // 封面模式
                // 这里的url处理逻辑只是在新增时候的逻辑
                // 编辑的时候需要做处理
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                }) // 图片列表
            },
            channel_id
        }
        // 2. 调用接口提交
        // 处理调用不同的接口 新增 - 新增接口  编辑状态 - 更新接口  id
        if (articleId) {
            // 更新接口
            updateArticleAPI({...reqData, id: articleId})
            console.log('成功更新')
        } else {
            for (let i = 0; i < 1000; i++) {
                createArticleAPI(reqData)
            }
            console.log('成功新增')
        }
    }

    // 上传回调
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        console.log('正在上传中', value)
        setImageList(value.fileList)
    }

    // 切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        console.log('切换封面了', e.target.value)
        setImageType(e.target.value)
    }

    // 回填数据
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    // 获取实例
    const [form] = Form.useForm()
    useEffect(() => {
        // 1. 通过id获取数据
        async function getArticleDetail() {
            const res = await getArticleById(articleId)
            const data = res.data
            const {cover} = data
            form.setFieldsValue({
                ...data,
                type: cover.type
            })
            // 为什么现在的写法无法回填封面？
            // 数据结构的问题  set方法 -> { type: 3 }   { cover: { type: 3}}

            // 回填图片列表
            setImageType(cover.type)
            // 显示图片({url:url})
            setImageList(cover.images.map(url => {
                return {url}
            }))
        }

        // 只有有id的时候才能调用此函数回填
        if (articleId) {
            getArticleDetail()
        }
        // 2. 调用实例方法 完成回填
    }, [articleId, form])

    // const [channelList, setChannelList] = useState([]);
    // useEffect(() => {
    //     // 获取频道列表
    //     const getChannelList = async () => {
    //         const res = await getChannelAPI()
    //         setChannelList(res.data.channels);
    //     }
    //     getChannelList()
    // }, []);
    // 获取频道列表
    const {channelList} = useChannel()
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: `${articleId ? '编辑文章' : '发布文章'}`},
                    ]}
                    />
                }
            >
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 1}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>

                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        <Select placeholder="请选择文章频道" style={{width: 200}}>
                            {channelList.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/*
              listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */}
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            maxCount={imageType}
                            fileList={imageList}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        {/* 绑定 AiEditor 的内容 */}
                        {/*<AiEditor*/}
                        {/*    value={form.getFieldValue('content')}*/}
                        {/*    onChange={(newContent) => form.setFieldsValue({ content: newContent })}*/}
                        {/*/>*/}
                        {/*<ReactQuill*/}
                        {/*    className="publish-quill"*/}
                        {/*    theme="snow"*/}
                        {/*    placeholder="请输入文章内容"*/}
                        {/*/>*/}
                        <MyAiEditor value={form.getFieldValue('content')}
                                    onGetValue={(newContent) => form.setFieldsValue({content: newContent})}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Publish;
