import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link}  from 'react-router-dom';

class DishDetail extends Component {
	
	// constructor(props) {
	// 	super(props);
	// }

	renderDish() {
		if (this.props.dish != null)
			return(
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to='/home'>Home </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to='/menu'>Menu </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {this.props.dish.name}
              </BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>Menu</h3>
              <hr/>
              
            </div>
          </div>
          <div className='col-12 col-md-5 m-1'>
            <Card>
              <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                <CardBody>
                  <CardTitle>{this.props.dish.name}</CardTitle>
                  <CardText>{this.props.dish.description}</CardText>
                </CardBody>
            </Card>
          </div>
        </div>
				);
		else
			return(
				<div></div>
			);
	}
	renderComments(comments) {
		return (
			<div className='col-12 col-md-5 m-1'>
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
			</div>
		)
	}
	render() {
		return (
			<div className='row'>
				{this.renderDish()}
				{this.props.dish != null ? this.renderComments(this.props.comments) : null}
			</div>
		);
	}
} 

export default DishDetail;