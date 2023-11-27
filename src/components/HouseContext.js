import React, { useState, useEffect, createContext, useContext } from "react";

// import data
import { housesData } from "../data";

// create context
const HouseContext = createContext();

const HousesProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  // return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, [houses]);

  // return all Properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicates
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];

    // set Properties state
    setProperties(uniqueProperties);
  }, [houses]);

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

function useHouses() {
  const context = useContext(HouseContext);
  if (context === undefined) {
    throw new Error("HouseContext was used outside of the HousesProvider");
  }
  return context;
}

export { HousesProvider, useHouses };
