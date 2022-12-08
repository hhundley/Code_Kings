import React, { useState } from "react";
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../index.css";
import ProfileIcon from "../components/ProfileIcon";
import { Card} from 'antd';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import {
  ProjectOutlined,
  PushpinFilled
} from "@ant-design/icons";
import { Layout, Menu, Collapse } from "antd";
const { Meta } = Card;
const { Panel } = Collapse;

const { Sider, Content } = Layout;

const Profile = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const { _id: userParam } = useParams();
  const { data } = useQuery(QUERY_ME, {
    variables: { _id: userParam },
  });

  const me = data?.me || {}

  if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
    return <Navigate to="/me" />;
  }

  if (!me?._id) {
    return (
      <h4>
        Login or create an account first
      </h4>
    );
  }

  return (
    <div>
    <div style={{textAlign:"center",marginBottom:'25px',fontWeight:"bolder", fontSize:"24px",fontFamily:'Arial'}}>
                <ProfileIcon />
                {me.firstName} {me.lastName}
    </div>

    <Collapse defaultActiveKey={['1']} onChange={onChange} style={{margin:'25px'}}>
      <Panel header="Created Projects" key="1">
      {me.createdProjects.map((project) => (
                     <Link to={`/projects/${project._id}`} key={project._id}>
                     <div  className="cards">
                     <Card hoverable="true" className="project-card">
                       <PushpinFilled style={{color:'red',fontSize:'24px'}} />
           
                       <Meta title={project.name}/>
           
                         <div className="price" style={{color:'grey'}}>${project.price} Bounty </div>
                     </Card>
                       </div> </Link>
                  ))}
      </Panel>
      <Panel header="Developing Projects" key="2">
      {me.createdProjects.map((project) => (
                     <Link to={`/projects/${project._id}`} key={project._id}>
                     <div  className="cards">
                     <Card hoverable="true" className="project-card">
                       <PushpinFilled style={{color:'red',fontSize:'24px'}} />
           
                       <Meta title={project.name}/>
           
                         <div className="price" style={{color:'grey'}}>${project.price} Bounty </div>
                     </Card>
                       </div> </Link>
                  ))}
      </Panel>
    </Collapse>
    </div>

  );
};

export default Profile;
