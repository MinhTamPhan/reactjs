import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link }  from 'react-router-dom';
import Comment from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';
import { FadeTransform, Fade, Stager } from 'react-animation-components';

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
			<div className='col-12 col-md-5 m-1'>
				<FadeTransform
				in
				transformProps={{
						exitTransform: 'scale(0.5) translateY(-50%)'
				}}>
						<Card>
							<CardImg top src={ baseUrl + dish.image} alt={dish.name} />
								<CardBody>
									<CardTitle>{dish.name}</CardTitle>
									<CardText>{dish.description}</CardText>
								</CardBody>
						</Card>
					</FadeTransform>
				</div>
      );
  else
    return(
      <div></div>
    );
}

const RenderComments = ({comments, postComment, dishId}) => {
  return (
    <div className='col-12 col-md-5 m-1'>
      <h4> Comments </h4>
			<ul className='list-untyled'>
				<Stager in>
					{comments.map((item) => {
						return (
							<Fade in>
								<li key={item.id}>
									<p>{item.comment}</p>
									<p>{'-- ' + item.author + ', ' + 
									new Intl.DateTimeFormat('en-GB', { 
										year: 'numeric', 
										month: 'long', 
										day: '2-digit' 
									}).format(new Date(item.date))}</p>
								</li>
							</Fade>
						);
					})}
				</Stager>
			</ul>
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
				<RenderDish dish={this.props.dish} />	
				<RenderComments comments={this.props.comments} postComment={this.props.postComment} dishId={this.props.dish.id}/>

      </div>
      </div>
		);
	}
} 

export default DishDetail;