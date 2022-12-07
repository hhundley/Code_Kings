import React from "react";
import { Layout, Button } from "antd";
import Auth from '../utils/auth';
import ProjectCard from "../components/ProjectCard";
import { redirect } from "react-router-dom";

const { Content } = Layout;


function Home() {
  const handleProjectButton = () => {
    Auth.loggedIn() ? (
      window.location.assign('/newproject')
    ) : (
      window.location.assign('/login')
    )
  }
  return (
    <Layout className="mainLayout">
          <Button 
            className="create-new-proj" 
            type="primary" 
            onClick={handleProjectButton}
            style={{backgroundColor:'navy',color:'white',width:'60px', height:'60px', borderRadius:'50%',display:'block',marginLeft:'auto',marginRight:'auto'}}>
            +
          </Button>
      <Content>
        <div className="container-list">
          <ProjectCard />
        </div>
      </Content>
    </Layout>
  );
}

export default Home;
