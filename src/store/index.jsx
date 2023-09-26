import { configureStore } from "@reduxjs/toolkit";
import RootSlice from "./RootSlice";
import HotelSlice from "./HotelSlice";
import ArticleSlice from "./ArticleSlice";
import PropertiesSlice from "./PropertiesSlice";
import RestaurantSlice from "./RestaurantSlice";
import DestinationSlice from "./DestinationSlice";
import ItinerarySlice from "./ItinerarySlice";
import AuthSlice from "./AuthSlice";
import CountrySlice from "./CountrySlice";
import UserSlice from "./UserSlice";
import CitySlice from "./CitySlice";
import SettingSlice from "./SettingSlice";

export const store = configureStore({
  reducer: {
    root: RootSlice,
    hotels: HotelSlice,
    articles: ArticleSlice,
    properties: PropertiesSlice,
    restaurants: RestaurantSlice,
    destinations: DestinationSlice,
    auth: AuthSlice,
    itineraries: ItinerarySlice,
    countries: CountrySlice,
    users: UserSlice,
    cities: CitySlice,
    settings: SettingSlice,
  },
});
