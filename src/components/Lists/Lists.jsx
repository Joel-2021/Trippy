import React, { useState,useEffect,createRef} from "react";
import {
  Typography,
  CircularProgress,
  InputLabel,
  MenuItem,
  FormControl,
  Grid,
  Select,
  makeStyles,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "75vh",
    overflow: "auto",
  },
}));

function Lists(props) {
  // console.log(props.childClicked);
// console.log(props.Loading)
  const [elRef, setelRef] = useState([]);
  const classes = useStyles();
  

useEffect(() => {
  const refs = Array(props.places)?.fill()?.map((_,i)=>elRef[i] ||createRef())
  setelRef(refs)
}, [props.places]);
 
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Hotels, Restaurants and Attractions near You!
      </Typography>
    {props?.Loading?<CircularProgress size='5rem'/>:
    <>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={props.type} onChange={(e) => props.setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="Attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={props.rating} onChange={(e) => props.setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3</MenuItem>
          <MenuItem value={4}>Above 4</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {props.places?.map((place, i) => (
          <Grid  ref={elRef[i]} item key={i} xs={12}>
          <PlaceDetails place={place} 
           selected={Number(props.childClicked)===i}
           refProp={elRef[i]}
            />
           
          </Grid>
        ))}
      </Grid>
        </>}
    </div>
  );
}

export default Lists;
