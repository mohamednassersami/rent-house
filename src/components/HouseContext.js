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

  const handleClick = () => {
    // set loading
    setLoading(true);
    // create a function that checks if the string includes '(any)'
    const isDefualt = (str) => {
      return str.split(" ").includes("(any)");
    };

    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);

    // get second value of price and parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // if all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      // if all values are default
      if (isDefualt(country) && isDefualt(property) && isDefualt(price)) {
        return house;
      }

      // if country is not default
      if (!isDefualt(country) && isDefualt(property) && isDefualt(price)) {
        return house.country === country;
      }

      // if property is not default
      if (!isDefualt(property) && isDefualt(country) && isDefualt(price)) {
        return house.type === property;
      }

      // if price is not default
      if (!isDefualt(price) && isDefualt(country) && isDefualt(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if country and property are not default
      if (isDefualt(price) && !isDefualt(country) && !isDefualt(property)) {
        return house.country === country && house.type === property;
      }

      // if country and price are not default
      if (!isDefualt(price) && !isDefualt(country) && isDefualt(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // if property and price are not default
      if (!isDefualt(price) && isDefualt(country) && !isDefualt(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

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
        handleClick,
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
