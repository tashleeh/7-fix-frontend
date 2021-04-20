import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

export class Avatar extends React.Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    const { image } = this.props
    if (image) {
      this.props.getImage(image)
    }
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      console.log('file', info)
      this.props && this.props.getImage(info)
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      )
    }
  }

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  render() {
    const { loading, imageUrl } = this.state
    const { image } = this.props
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={this.dummyRequest}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl || image ? (
          <img
            src={imageUrl ? imageUrl : image}
            alt="avatar"
            style={{ width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }
}
