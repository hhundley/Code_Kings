import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import { UploadOutlined } from '@ant-design/icons';
import { Card, Space, Layout, Button, Empty, message, Upload} from 'antd';
import Icon from '../components/ProfileIcon';

const { Sider, Content } = Layout;

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const App = () => {

  const { projectId } = useParams();
  const { data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId }
  });
  const project = data?.project || {};

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <Layout>
      <Content>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
            width: '100%',
            padding: '16px',
          }}
          >
          <div className='row-1'>
            <Card title={project.name} className='title-projCard'>
            {project.description}
            </Card>
          </div>
          <div className='row-2'>
            <Card title="Owner/Contact" className='owner-projCard'>
              <p>{project.owner}<br></br>{project.contact}</p>
            </Card>
            <Card title="Bounty" className='developers-projCard'>
              {/* {project.developers ? (
                <p>{project.developers.firstName} {project.developers.lastName}</p>
              ) : (
                <p>No one is currently pursuing this project</p>
              )} */}
              <p>${project.price}</p>
            </Card>
          </div>
          <div className='row-1'>
            <Card 
              title="Resources" 
              className='resources-projCard' 
              extra={
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              }>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Card>
          </div>
        </Space>
      </Content>
    </Layout>
  )
};

export default App