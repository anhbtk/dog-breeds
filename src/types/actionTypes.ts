export const SET_PAGE = "SET_PAGE";
export const FETCH_BREEDS_REQUEST = "FETCH_BREEDS_REQUEST";
export const FETCH_BREEDS_SUCCESS = "FETCH_BREEDS_SUCCESS";
export const FETCH_BREEDS_FAILURE = "FETCH_BREEDS_FAILURE";

export interface Breed {
  id: string;
  name: string;
  description: string;
  life: {
    min: number;
    max: number;
  };
  male_weight: {
    min: number;
    max: number;
  };
  female_weight: {
    min: number;
    max: number;
  };
  hypoallergenic: boolean;
}

export interface SetPageAction {
  type: typeof SET_PAGE;
  payload: string;
}

export interface FetchBreedsRequest {
  type: typeof FETCH_BREEDS_REQUEST;
}

export interface FetchBreedsSuccess {
  type: typeof FETCH_BREEDS_SUCCESS;
  payload: Breed[];
}

export interface FetchBreedsFailure {
  type: typeof FETCH_BREEDS_FAILURE;
  payload: string;
}

export type DogActionTypes =
  | SetPageAction
  | FetchBreedsRequest
  | FetchBreedsSuccess
  | FetchBreedsFailure;
