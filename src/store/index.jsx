import { configureStore } from "@reduxjs/toolkit";
import RootSlice from "./RootSlice";
import HotelSlice from "./HotelSlice";
import ArticleSlice from "./ArticleSlice";
import PropertiesSlice from "./PropertiesSlice";
import RestaurantsSlice from "./RestaurantsSlice";
import DestinationSlice from "./DestinationSlice";
import ItinerarySlice from "./ItinerarySlice";
import AuthSlice from "./AuthSlice";

export const store = configureStore({
  reducer: {
    root: RootSlice,
    hotels: HotelSlice,
    articles: ArticleSlice,
    properties: PropertiesSlice,
    restaurants: RestaurantsSlice,
    destinations: DestinationSlice,
    auth: AuthSlice,
    itineraries: ItinerarySlice,
  },
});
