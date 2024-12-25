import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "../actions/dogActions";
import { RootState, AppDispatch } from "../store/store";
import { Breed } from "../types/actionTypes";
import "../style/DogComponent.css";
const DogComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { breeds, loading, error } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="dog-container">
      {!loading && !error && breeds.length > 0 && (
        <ul className="breed-list">
          {breeds.map((breed: Breed) => (
            <li key={breed.id} className="breed-item">
              <h3 className="breed-name">{breed.name}</h3>
              <p className="breed-description">{breed.description}</p>
              <p className="breed-info">
                Life expectancy: {breed.life.min} - {breed.life.max} years
              </p>
              <p className="breed-info">
                Male weight: {breed.male_weight.min} - {breed.male_weight.max}{" "}
                kg
              </p>
              <p className="breed-info">
                Female weight: {breed.female_weight.min} -{" "}
                {breed.female_weight.max} kg
              </p>
              <p className="hypoallergenic">
                Hypoallergenic: {breed.hypoallergenic ? "Yes" : "No"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DogComponent;
