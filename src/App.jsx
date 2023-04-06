import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Lists from "./components/Lists/Lists";
import Maps from "./components/Maps/Maps";
import { getPlacesapi } from "./api/api";

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coords, setCoords] = useState({});

  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    const filteredPlaces = places.filter(
      (place) => Number(place.rating) > rating
    );
    setFilteredPlaces(filteredPlaces);
  }, [rating]);


  useEffect(() => {
    setLoading(true);
    getPlacesapi(type, bounds?.sw, bounds?.ne).then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setLoading(false);
    });
    console.log(bounds);
  }, [coords, bounds, type]);
  // console.log(places);
  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords}/>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <Lists
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            Loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Maps
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
