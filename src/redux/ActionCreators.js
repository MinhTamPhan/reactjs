import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';

function handleErrorServer(respone){
  if(respone.ok) {
    return respone;
  }
  else {
    let error = new Error('Error code: ' + respone.status + ", message: " + respone.statusText);
    error.respone = respone;
    throw error;
  }
};

function handleError( error ){
  let errMsg = new Error(error.message);
  throw errMsg;
};

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment =  (dishId, rating, author, comment) =>(dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date = new Date().toISOString();
  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers:{
      'Content-Type': 'application-json'
    },
    credentials: 'same-origin'
  })
  .then(respone => { return handleErrorServer(respone)},
        error => { return handleError(error) })
  .then(respone => respone.json())
  .then(respone => dispatch(addComment(respone)))
  .catch(error => {
    console.log('Post comment fails: ', error.message);
    alert('your comment could not be posted\nerror: ' + error.message);
  })
 }

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
          .then( (respone) => {
            return handleErrorServer(respone);
          }, ( error ) => {
            return handleError(error);
          })
          .then( (respone) => respone.json())
          .then(dishes => dispatch(addDishes(dishes)) )
          .catch( error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
  // payload: {
    
  // }
});

export const dishesFailed = (errorMsg) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errorMsg
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchComments = () => (dispatch) => {    
  return fetch(baseUrl + 'comments')
  .then( (respone) => {
    return handleErrorServer(respone);
  }, ( error ) => {
    return handleError(error);
  })
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch( error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
  
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
  .then( (respone) => {
    return handleErrorServer(respone);
  }, ( error ) => {
    return handleError(error);
  })
  .then(response => response.json())
  .then(promos => dispatch(addPromos(promos)))
  .catch( error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});