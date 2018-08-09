import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link }  from 'react-router-dom';
import Comment from './CommentForm';

const RenderDish = (props) =>{
  if (props.dish != null)
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
              {props.dish.name}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr/>
            
          </div>
          <Card>
            <CardImg top src={props.dish.image} alt={props.dish.name} />
              <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
              </CardBody>
          </Card>
        </div>
      );
  else
    return(
      <div></div>
    );
}

const RenderComments = ({comments, addComment, dishId}) => {
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
       <Comment dishId={dishId} addComment={addComment} />
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
              <RenderComments comments={this.props.comments} addComment={this.props.addComment} dishId={this.props.dish.id}/>
          </div>
      </div>
      </div>
		);
	}
} 

export default DishDetail;