import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  makeStyles,
  Chip,
  CardActions,
  Button,
} from "@material-ui/core";
import { LocationOnSharp, Phone } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  chip: {
    margin: "5px 5px 5px 0",
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
function PageDetails(props) {
  const classes = useStyles();

  // if (props.selected)
  //   props.refProp?.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // console.log(props.refProp?.current);

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          props.place.photo?.images.large.url
            ? props.place.photo?.images.large.url
            : "https://media.istockphoto.com/photos/modern-restaurant-interior-design-picture-id1211547141?k=20&m=1211547141&s=612x612&w=0&h=KiZX3NBZVCK4MlSh4BJ8hZNSJcTIMbNSSV2yusw2NmM="
        }
        title={props.place?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {props.place?.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(props.place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {props.place?.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {props.place?.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle2">
            {props.place?.ranking}
          </Typography>
        </Box>
        {props.place?.awards?.map((award, i) => (
          <Box my={1} display="flex" justifyContent="space-between" key={i}>
            {/* {console.log(i)} */}
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {props.place?.cuisine?.map((c) => (
          <Chip
            size="small"
            key={c.key}
            label={c.name}
            className={classes.chip}
          >
            {c.name}
          </Chip>
        ))}
        {props.place.address && (
          <Typography
            gutterBottom
            color="textSecondary"
            variant="subtitle2"
            className={classes.subtitle}
            style={{ textAlign: "right" }}
          >
            <LocationOnSharp /> {props.place.address}
          </Typography>
        )}
        {props.place.phone && (
          <Typography
            gutterBottom
            color="textSecondary"
            variant="subtitle2"
            className={classes.subtitle}
            style={{ textAlign: "right" }}
          >
            <Phone /> {props.place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {props.place?.web_url ? (
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(props.place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
        ) : null}
        {props.place?.web_url ? (
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(props.place.website, "_blank")}
          >
            Website
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default PageDetails;
