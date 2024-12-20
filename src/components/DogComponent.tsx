// DogComponent.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "../actions/dogActions";
import { RootState, AppDispatch } from "../store/store";
import { Breed } from "../types/actionTypes";

const DogComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { breeds, loading, error } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {loading && <p>Loading breeds...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && breeds.length > 0 && (
        <ul>
          {breeds.map((breed: Breed) => (
            <li key={breed.id}>
              <h3>{breed.name}</h3>
              <p>{breed.description}</p>
              <p>
                Life expectancy: {breed.life.min} - {breed.life.max} years
              </p>
              <p>
                Male weight: {breed.male_weight.min} - {breed.male_weight.max}{" "}
                kg
              </p>
              <p>
                Female weight: {breed.female_weight.min} -{" "}
                {breed.female_weight.max} kg
              </p>
              <p>Hypoallergenic: {breed.hypoallergenic ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DogComponent;
