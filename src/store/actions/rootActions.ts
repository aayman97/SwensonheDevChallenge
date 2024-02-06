import {ActionTypes} from '../constants';

export interface IncrementAction {
  type: ActionTypes.ADDORDELETEEVENTCATEGORY;
  payload: EventCategoryAndType;
}
