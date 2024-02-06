import {checkIfArrayContainsObject} from '../../helper/checkIfArrayContainsObject';
import {IncrementAction} from '../actions/rootActions';
import {ActionTypes} from '../constants';

export interface State {
  events: EventCategoryAndType[];
}

let initialState: State = {
  events: [],
};

type Action = IncrementAction;

const rootReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ADDORDELETEEVENTCATEGORY:
      let eventsTemp: EventCategoryAndType[] = [...state.events];

      let objToCheck: EventCategoryAndType = action.payload;

      const containsObject = checkIfArrayContainsObject(eventsTemp, objToCheck);

      if (!containsObject) {
        eventsTemp.push(action.payload);
      } else {
        eventsTemp = eventsTemp.filter(
          obj =>
            obj.categoryID !== objToCheck.categoryID ||
            obj.type.id !== objToCheck.type.id,
        );
      }
      return {
        ...state,
        events: eventsTemp,
      };

    default:
      return state;
  }
};

export default rootReducer;
