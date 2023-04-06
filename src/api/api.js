import axios from "axios";
  

export const getPlacesapi = async (type,sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": "fe6cad8b31msh4416652dc09440cp15e9b8jsnb67d3d38fe61",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};
