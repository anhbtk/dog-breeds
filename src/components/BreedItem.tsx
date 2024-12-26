import React from "react";
import { Breed } from "../types/actionTypes";
import "../style/BreedItem.css";

interface BreedItemProps {
  breed: Breed;
}

const BreedItem: React.FC<BreedItemProps> = ({ breed }) => {
  return (
    <li className="breed-item">
      <h3 className="breed-name">{breed.name}</h3>
      <p className="breed-description">{breed.description}</p>
      <p className="breed-info">
        Life expectancy: {breed.life.min} - {breed.life.max} years
      </p>
      <p className="breed-info">
        Male weight: {breed.male_weight.min} - {breed.male_weight.max} kg
      </p>
      <p className="breed-info">
        Female weight: {breed.female_weight.min} - {breed.female_weight.max} kg
      </p>
      <p className="hypoallergenic">
        Hypoallergenic: {breed.hypoallergenic ? "Yes" : "No"}
      </p>
    </li>
  );
};

export default BreedItem;
