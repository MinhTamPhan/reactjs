import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link }  from 'react-router-dom';
import Comment from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';

const RenderDish = ({dish}) =>{
  if(dish.isLoading) {
    return (
      <div className='container'>
         <div className='row'>
          <Loading />
         </div>
      </div>
    )
  }
  else if(dish.errMsg) {
    return (
      <div className='container'>
         <div className='row'>
          <h4>{dish.errMsg}</h4>
         </div>
      </div>
    )
  }
  else if (dish != null)
    return(
        <div >
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/home'>Home </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to='/menu'>Menu </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {dish.name}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr/>
            
          </div>
          <Card>
            <CardImg top src={ baseUrl + dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
          </Card>
        </div>
      );
  else
    return(
      <div></div>
    );
}

const RenderComments = ({comments, postComment, dishId}) => {
  return (
    <div>
      <h4> Comments </h4>
      {comments.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.comment}</p>
            <p>{'-- ' + item.author + ', ' + 
            new Intl.DateTimeFormat('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: '2-digit' 
            }).format(new Date(item.date))}</p>
          </div>
        );
      })}
       <Comment dishId={dishId} postComment={postComment} />
    </div>
  )
}
class DishDetail extends Component {
	
	// constructor(props) {
	// 	super(props);
	// }	
	render() {
		return (
      <div className="container">
      <div className="row">
				<Breadcrumb>
					<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
					<BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{this.props.dish.name}</h3>
					<hr />
				</div>                
      </div>
      <div className="row">
				<div className="col-12 col-md-5 m-1">
					<RenderDish dish={this.props.dish} />
				</div>
				<div className="col-12 col-md-5 m-1">
					<RenderComments comments={this.props.comments} postComment={this.props.postComment} dishId={this.props.dish.id}/>
				</div>
      </div>
      </div>
		);
	}
} 

export default DishDetail;