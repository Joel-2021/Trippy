import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, useMediaQuery, Typography} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { LocationOnOutlined } from "@material-ui/icons";
import useStyles from "./style.js";

function Maps({ setBounds, setCoords, coords, places,setChildClicked }) {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");


  return (
    <div
      className={classes.mapContainer}
      style={{ width: "100%", height: "500" }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDfIDmQIAjg2-V7RtH3GuxwQ7Agfk5dtfw" }}
        center={coords}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        onChildClick={(child)=>(setChildClicked(child))}
        onChange={(e) => {
          // console.log(e);
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        options={""}
      >
        {places?.map((place,i) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
            >
            {/* {console.log(i)} */}
            {!isDesktop ? <LocationOnOutlined color='primary' fontSize='large'/>: (
              <Paper elevation={3} className={classes.paper}>
                <Typography gutterBottom variant="subtitle2" className={classes.typography}>
                  {place.name} 
                </Typography>
                <Rating value={Number(place.rating)} readOnly size='small'/>
                <img className={classes.pointer} src={place.photo?.images.large.url
            ? place.photo?.images.large.url
            : "https://media.istockphoto.com/photos/modern-restaurant-interior-design-picture-id1211547141?k=20&m=1211547141&s=612x612&w=0&h=KiZX3NBZVCK4MlSh4BJ8hZNSJcTIMbNSSV2yusw2NmM="} alt={place.name}/>
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
      <h1 className={classes.head}></h1>
    </div>
  );
}

export default Maps;
