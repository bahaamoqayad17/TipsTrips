import { removeArticle } from "@/store/ArticleSlice";
import { deleteCity } from "@/store/CitySlice";
import { deleteCountry } from "@/store/CountrySlice";
import { removeDestination } from "@/store/DestinationSlice";
import { removeHotel } from "@/store/HotelSlice";
import { removeItinerary } from "@/store/ItinerarySlice";
import { removeProperty } from "@/store/PropertiesSlice";
import { removeRestaurant } from "@/store/RestaurantSlice";

export const resources = {
  hotels: {
    headers: ["name", "country", "city", "status"],
    fields: ["name", "country.name", "city.name", "status"],
    remove: removeHotel,
  },
  articles: {
    headers: ["name", "country", "status"],
    fields: ["name", "country.name", "status"],
    remove: removeArticle,
  },
  properties: {
    headers: ["name", "country", "city", "status"],
    fields: ["name", "country.name", "city.name", "status"],
    remove: removeProperty,
  },
  restaurants: {
    headers: ["name", "country", "city", "status"],
    fields: ["name", "country.name", "city.name", "status"],
    remove: removeRestaurant,
  },
  destinations: {
    headers: ["destination_name", "name_ar", "city", "country"],
    fields: ["name", "name_ar", "city", "country"],
    remove: removeDestination,
  },
  itineraries: {
    headers: ["name", "country", "city", "status"],
    fields: ["name", "country.name", "city.name", "status"],
    remove: removeItinerary,
  },
  users: {
    headers: ["name", "email"],
    fields: ["name", "email"],
  },
  countries: {
    headers: ["name", "code"],
    fields: ["name", "code"],
    remove: deleteCountry,
  },
  cities: {
    headers: ["name"],
    fields: ["name"],
    remove: deleteCity,
  },
};
