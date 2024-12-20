import axios from "axios";
import { Dispatch } from "redux";

export const FETCH_BREEDS_REQUEST = "FETCH_BREEDS_REQUEST";
export const FETCH_BREEDS_SUCCESS = "FETCH_BREEDS_SUCCESS";
export const FETCH_BREEDS_FAILURE = "FETCH_BREEDS_FAILURE";

export interface FetchBreedsRequestAction {
  type: typeof FETCH_BREEDS_REQUEST;
}

export interface FetchBreedsSuccessAction {
  type: typeof FETCH_BREEDS_SUCCESS;
  payload: Breed[];
}

export interface FetchBreedsFailureAction {
  type: typeof FETCH_BREEDS_FAILURE;
  payload: string;
}

export type DogActionTypes =
  | FetchBreedsRequestAction
  | FetchBreedsSuccessAction
  | FetchBreedsFailureAction;

// Define Breed interface
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

interface ApiResponse {
  data: {
    id: string;
    attributes: {
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
    };
  }[];
}

export const fetchBreeds = () => {
  return async (dispatch: Dispatch<DogActionTypes>) => {
    dispatch({ type: FETCH_BREEDS_REQUEST });
    try {
      const response = await axios.get<ApiResponse>(
        "https://dogapi.dog/api/v2/breeds"
      );
      const breeds = response.data.data.map((breed) => ({
        id: breed.id,
        name: breed.attributes.name,
        description: breed.attributes.description,
        life: breed.attributes.life,
        male_weight: breed.attributes.male_weight,
        female_weight: breed.attributes.female_weight,
        hypoallergenic: breed.attributes.hypoallergenic,
      }));

      dispatch({
        type: FETCH_BREEDS_SUCCESS,
        payload: breeds,
      });
    } catch (error) {
      dispatch({
        type: FETCH_BREEDS_FAILURE,
        payload:
          error instanceof Error ? error.message : "Failed to fetch breeds.",
      });
    }
  };
};
