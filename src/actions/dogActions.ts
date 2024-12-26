import axios from "axios";
import { Dispatch } from "redux";
import {
  DogActionTypes,
  FETCH_BREEDS_REQUEST,
  FETCH_BREEDS_SUCCESS,
  FETCH_BREEDS_FAILURE,
} from "../types/actionTypes";

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
  // export const fetchBreeds = (page: number, limit: number) => {
  return async (dispatch: Dispatch<DogActionTypes>) => {
    dispatch({ type: FETCH_BREEDS_REQUEST });
    try {
      const response = await axios.get<ApiResponse>(
        "https://dogapi.dog/api/v2/breeds"

        // `https://dogapi.dog/api/v2/breeds?_page=${page}&_limit=${limit}`
      );

      if (response.status == 200) {
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
      } else {
        let errorMessage = "An unexpected error occurred.";
        if (response.status === 404) errorMessage = "Resource not found (404).";
        else if (response.status === 403) errorMessage = "Access denied (403).";
        else if (response.status === 500)
          errorMessage = "Server error occurred (500).";

        dispatch({
          type: FETCH_BREEDS_FAILURE,
          payload: errorMessage,
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        let errorMessage = "An unknown error occurred.";
        if (statusCode === 404) errorMessage = "Resource not found (404).";
        else if (statusCode === 403) {
          errorMessage = "Access denied (403).";
          window.location.href = "/403";
        } else if (statusCode === 500)
          errorMessage = "Server error occurred (500).";
        else if (!statusCode) errorMessage = "Network error or server is down.";

        dispatch({
          type: FETCH_BREEDS_FAILURE,
          payload: errorMessage,
        });
      } else {
        dispatch({
          type: FETCH_BREEDS_FAILURE,
          payload: "An unknown error occurred.",
        });
      }
    }
  };
};
