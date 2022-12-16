import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

// import Auth from '../utils/auth';
import { Button, Form, Input, InputNumber } from 'antd';


const NewProject = () => { 
    const [addProject, {loading}] = useMutation(ADD_PROJECT, {errorPolicy: 'all'},{
      update(cache, { data: { addProject } }) {
       // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, createdProjects: [...me.createdProjects, addProject] } },
        });
      },
    });
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        try {
            const { data } = addProject({
                variables: {
                    ...values,
                    owner:Auth.getProfile().data.firstName,
                },
            })
            // Auth.addProject(data.login.token);
            setData(data);
        }
        catch (err) {
            setError(err);
        }
    }
if (loading) return <p>Loading...</p>;
if (error) return <p>Error :</p>;

const onFinish = values => {
    handleFormSubmit(values);
    navigate('/me');
};
  return (
    <Form name="nest-messages" onFinish={onFinish} layout='vertical' style={{marginLeft:'25px'}}>
      
      <Form.Item
        name='name'
        label="Project Title"
        rules={[
          {
            required: true,
            message: 'Please enter a title!',
          },
        ]}
      >
        <Input size="large" placeholder='Enter title'style={{ width: '80%'}}/>
      </Form.Item>
      
      <Form.Item name='description' 
      label="Description"
      rules={[
          {
              required: true,
              message: 'Please enter a description!',
          },
      ]}>
        <Input.TextArea placeholder='Describe your project' autoSize={{ minRows: 5, maxRows: 20}} style={{ width: '80%'}}/>
      </Form.Item>

      <Form.Item
        name='contact'
        label="Contact Info (Note: This will be visible to all users and allows others to contact you in regard to project related matters)"
        rules={[
          {
            required: true,
            message: 'Please enter contact info!',
          },
        ]}
      >
        <Input size="large" placeholder='Enter contact info'style={{ width: '80%'}}/>
      </Form.Item>

      <Form.Item
        name='price'
        label="Bounty"
        rules={[
          {
            required: true,
            message: 'Please set a bounty!',
          },
        ]}
      >
        <InputNumber prefix='$' />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Project
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewProject;

