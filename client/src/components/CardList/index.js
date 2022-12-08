import React from 'react';
import "./style.css";
import { Link} from 'react-router-dom';
import { PushpinFilled } from '@ant-design/icons';
import { Card} from 'antd';
const { Meta } = Card;

const CardList = ({
  projects
}) => {
  if (!projects.length) {
    return <h3>no open bounties</h3>;
  }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <Link to={`/projects/${project._id}`} key={project._id}>
          <div  className="cards">
          <Card hoverable="true" className="project-card">
            <PushpinFilled style={{color:'red',fontSize:'24px'}} />

            <Meta title={project.name}/>

              <div className="price" style={{color:'grey'}}>${project.price} Bounty </div>
          </Card>
            </div> </Link>
        ))}
    </div>
  );
};

export default CardList;
