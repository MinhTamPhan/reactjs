import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Promotions } from './promotions';
import { Comments } from './comment';
import { Leaders } from './leader';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders
    })
  );

  return store;
}