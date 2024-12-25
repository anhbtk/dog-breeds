import {
  DogActionTypes,
  FETCH_BREEDS_REQUEST,
  FETCH_BREEDS_SUCCESS,
  FETCH_BREEDS_FAILURE,
} from "../types/actionTypes";
import { Breed } from "../types/actionTypes";

interface State {
  breeds: Breed[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  breeds: [],
  loading: false,
  error: null,
};

const dogReducer = (state = initialState, action: DogActionTypes): State => {
  switch (action.type) {
    case FETCH_BREEDS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BREEDS_SUCCESS:
      return { ...state, loading: false, breeds: action.payload };
    case FETCH_BREEDS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default dogReducer;
