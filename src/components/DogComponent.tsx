import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "../actions/dogActions";
import { RootState, AppDispatch } from "../store/store";
import BreedItem from "./BreedItem";
import { Breed } from "../types/actionTypes";
import "../style/DogComponent.css";

const DogComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { breeds, loading, error } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }

  return (
    <>
      <h1 className="title">Dog Breeds</h1>
      <div className="dog-container">
        {!loading && !error && breeds.length > 0 ? (
          <ul className="breed-list">
            {breeds.map((breed: Breed) => (
              <BreedItem key={breed.id} breed={breed} />
            ))}
          </ul>
        ) : (
          <p className="no-data-text">No breeds available</p>
        )}
      </div>
    </>
  );
};

export default DogComponent;
