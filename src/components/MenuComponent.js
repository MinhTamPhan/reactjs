import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../shared/baseURL';

import { Loading } from './LoadingComponent';

function RenderMenuItem ({dish}) {
  return (
    <Card>
      <Link to = {`/menu/${dish.id}`}>
        <CardImg width="100%" src={ baseUrl + dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Link>
    </Card>
  );
}

function MenuItem({dishes}){
  return(
    dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1"  key={dish.id}>
          <RenderMenuItem dish={dish}/>
        </div>
      );
    })
  )
} 

const Menu = ({dishes}) => {
  if(dishes.isLoading) {
    return (
      <div className='container'>
         <div className='row'>
          <Loading />
         </div>
      </div>
    )
  }
  else if(dishes.errMsg) {
    return (
      <div className='container'>
         <div className='row'>
          <h4>{dishes.errMsg}</h4>
         </div>
      </div>
    )
  }
  else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/Home'>Home </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Menu
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr/>              
          </div>
        </div>
        <div className="row">
          <MenuItem dishes={dishes.dishes}/>
        </div>
      </div>
    );
  }
}
export default Menu;