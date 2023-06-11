import { removeArticle } from "@/store/ArticleSlice";
import { removeDestination } from "@/store/DestinationSlice";
import { removeHotel } from "@/store/HotelSlice";
import { removeItinerary } from "@/store/ItinerarySlice";
import { removeProperty } from "@/store/PropertiesSlice";
import { removeRestaurant } from "@/store/RestaurantsSlice";

export const resources = {
  hotels: {
    headers: ["name", "location", "name_ar", "location_ar", "suitable_for"],
    fields: ["name", "location", "name_ar", "location_ar", "suitable_for"],
    remove: removeHotel,
  },
  articles: {
    headers: ["article_name", "article_name_ar", "country", "seo_title"],
    fields: ["title", "title_ar", "country", "seo_title"],
    remove: removeArticle,
  },
  properties: {
    headers: ["property_name", "city", "title_ar", "notes"],
    fields: ["title", "city", "title_ar", "notes_for_things_to_do"],
    remove: removeProperty,
  },
  restaurants: {
    headers: ["restaurant_name", "city", "halal", "country"],
    fields: ["title", "city", "halal", "country"],
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
};
