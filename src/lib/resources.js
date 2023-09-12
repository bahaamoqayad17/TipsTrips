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
    headers: ["name"],
    fields: ["name"],
    remove: removeHotel,
  },
  articles: {
    headers: ["article_name", "article_name_ar", "country", "seo_title"],
    fields: ["title", "title_ar", "country", "seo_title"],
    remove: removeArticle,
  },
  properties: {
    headers: ["property_name", "city", "property_name_ar"],
    fields: ["title", "city", "title_ar"],
    remove: removeProperty,
  },
  restaurants: {
    headers: ["restaurant_name"],
    fields: ["name"],
    remove: removeRestaurant,
  },
  destinations: {
    headers: ["destination_name", "name_ar", "city", "country"],
    fields: ["name", "name_ar", "city", "country"],
    remove: removeDestination,
  },
  itineraries: {
    headers: ["itinerary_name", "itinerary_name_ar", "country"],
    fields: ["title", "title_ar", "country"],
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
