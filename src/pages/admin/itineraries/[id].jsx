import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useEffect, useMemo, useState } from "react";
import { indexHotels } from "@/store/HotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/Admin/DashboardLayout";
import { useRouter } from "next/router";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Dropzone from "@/lib/Dropzone";
import countryList from "react-select-country-list";
import { index } from "@/store/RestaurantsSlice";
import DynamicModal from "@/components/Admin/DynamicModal";
import { Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CKEditor from "@/lib/CKEditor";
import { indexProperties } from "@/store/PropertiesSlice";
import { show, update } from "@/store/ItinerarySlice";
import { handleImageChange } from "@/lib/Base64EnCode";

const style = {
  marginBottom: "30px",
};

const types = [
  {
    label: "car_road",
    value: "Car Road Trip Itinerary",
  },
  {
    label: "rental_car",
    value: "Itinerary With A Rental Car",
  },
  {
    label: "hiking",
    value: "Hiking Itinerary",
  },
  {
    label: "campervans",
    value: "Campervans Itinerary",
  },
  {
    label: "christmas",
    value: "Christmas Itinerary",
  },
  {
    label: "honeymoon",
    value: "Honeymoon Itinerary",
  },
  {
    label: "kids",
    value: "Itinerary With Kids",
  },
  {
    label: "solo_couple",
    value: "Solo/Couple Travelers",
  },
];

const seasons = [
  {
    label: "all_seasons",
    value: "All Seasons",
  },
  {
    label: "spring",
    value: "Spring",
  },
  {
    label: "summer",
    value: "Summer",
  },
  {
    label: "fall",
    value: "Fall",
  },
  {
    label: "winter",
    value: "Winter",
  },
];

const TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={5}>{children}</Box>}
    </div>
  );
};

const Page = () => {
  const { all, loading } = useSelector(({ itineraries }) => itineraries);
  const { restaurants } = useSelector(({ restaurants }) => restaurants);
  const { hotels } = useSelector(({ hotels }) => hotels);
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [item, setItem] = useState(all.find((item) => item?.id == id));
  const [image, setImage] = useState({
    data: item?.featured_image,
    mime: "image/jpg",
  });
  const options = useMemo(() => countryList().getData(), []);
  const [value, setValue] = useState(0);
  const [model, setModel] = useState({});
  const [days, setDays] = useState(item?.days);

  const [openModal, setOpenModal] = useState(false);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [owners, setOwners] = useState(item?.datee);

  const handleDeleteDay = () => {
    if (days.length === 1) return;
    const newDays = [...days];
    newDays.splice(value, 1);
    setDays(newDays);
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleDeleteTransport = (propertyId, transportType, transportData) => {
    setDays((prevDays) => {
      const updatedDays = prevDays.map((day) => {
        const updatedProperties = day.properties.map((property) => {
          if (property.property.id === propertyId) {
            const updatedTransport = property.property.transport.filter(
              (transport) =>
                transport.type !== transportType ||
                JSON.stringify(transport) !== JSON.stringify(transportData)
            );

            return {
              ...property,
              property: {
                ...property.property,
                transport: updatedTransport,
              },
            };
          }

          return property;
        });

        return {
          ...day,
          properties: updatedProperties,
        };
      });

      return updatedDays;
    });
  };

  const handleOpenModal = (model, dayIndex, propertyId) => {
    setModel({ model, dayIndex, propertyId });
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(index());
    dispatch(indexHotels());
    dispatch(indexProperties());
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    console.log(item);
    setItem({ ...item, datee: owners, days: days });
  }, [owners, days]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "featured_image") {
      setImage({ data: URL.createObjectURL(files[0]) });
      setItem({ ...item, [name]: await handleImageChange(files[0]) });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handlePos = (propertyId) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const updatedDay = { ...updatedDays[value] };
      const updatedProperties = [...updatedDay.properties];
      const propertyIndex = updatedProperties.findIndex(
        (property) => property.property.id === propertyId
      );

      if (propertyIndex !== -1) {
        const updatedProperty = { ...updatedProperties[propertyIndex] };
        console.log("updatedProperty", updatedProperty);
        updatedProperty.property.selected = !updatedProperty.property.selected;
        updatedProperties[propertyIndex] = updatedProperty;
        updatedDay.properties = updatedProperties;
        updatedDays[value] = updatedDay;
      }

      return updatedDays;
    });
  };

  const handleDeleteProperty = (propertyId) => {
    const updatedDays = [...days];

    const dayIndex = updatedDays.findIndex((day) =>
      day.properties.some((property) => property.property.id === propertyId)
    );

    if (dayIndex !== -1) {
      updatedDays[dayIndex].properties = updatedDays[
        dayIndex
      ].properties.filter((property) => property.property.id !== propertyId);

      setDays(updatedDays);
    }
  };

  const FormSubmit = (e) => {
    e.preventDefault();
    dispatch(update(item));
  };

  const handleAutocompleteChange = (event, value) => {
    const selectedCountries = value.map((option) => option.label).join(",");
    setItem({ ...item, country: selectedCountries });
  };

  return (
    <>
      <Box sx={{ p: 8, backgroundColor: "#fff", borderRadius: "15px", my: 5 }}>
        <h1 style={style}>{t("itinerary_update")}</h1>

        <Typography variant="h6">{t("itinerary_title")}</Typography>

        <Box>
          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.title}
            name="title"
            fullWidth
          />

          <Typography variant="h6">{t("itinerary_title_ar")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.title_ar}
            name="title_ar"
            fullWidth
          />

          <Typography variant="h6">{t("countries")}</Typography>

          <Autocomplete
            multiple
            id="tags-outlined"
            options={options}
            getOptionLabel={(option) => option.label}
            onChange={handleAutocompleteChange}
            style={style}
            defaultValue={item?.country
              ?.split(",")
              .map((value) => ({ label: value.trim() }))}
            name="country"
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} name="country" />}
          />

          <Typography variant="h6">{t("city")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.city}
            name="city"
            fullWidth
          />

          <Typography variant="h6">{t("itinerary_types")}</Typography>

          <TextField
            onChange={handleChange}
            sx={style}
            id="outlined-select-currency"
            value={item?.itinerary_type}
            select
            fullWidth
            name="itinerary_type"
            autoComplete="types"
          >
            {types?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="h6">{t("seasons")}</Typography>

          <TextField
            onChange={handleChange}
            sx={style}
            id="outlined-select-currency"
            value={item?.season_for}
            select
            fullWidth
            name="season_for"
            autoComplete="seasons"
          >
            {seasons?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="h6">{t("description")}</Typography>

          <TextField
            onChange={handleChange}
            sx={style}
            id="outlined-multiline-flexible"
            name="description"
            multiline
            minRows={5}
            fullWidth
            value={item?.description}
          />

          <Box sx={style}>
            <Typography variant="h6" sx={{ my: 5 }}>
              {t("general_notes")}
            </Typography>

            <CKEditor
              editorLoaded={editorLoaded}
              onChange={(v) => setItem({ ...item, general_notes: v })}
              value={item?.general_notes}
            />
          </Box>

          <Box sx={style}>
            <Typography variant="h6" sx={{ my: 5 }}>
              {t("general_notes_ar")}
            </Typography>

            <CKEditor
              editorLoaded={editorLoaded}
              onChange={(v) => setItem({ ...item, general_notes_ar: v })}
              value={item?.general_notes_ar}
            />
          </Box>

          <Box sx={{ my: 10, mb: 5 }}>
            <Typography variant="h6">{t("gallery")}</Typography>

            <Dropzone setOwners={setOwners} owners={owners} />
          </Box>

          <Typography variant="h6">{t("restaurants")}</Typography>

          <Autocomplete
            multiple
            id="tags-outlined"
            options={restaurants}
            getOptionLabel={(option) =>
              option?.title + " - " + option?.geo_location
            }
            style={style}
            defaultValue={item?.restaurant_id}
            filterSelectedOptions
            name="restaurants"
            onChange={(e, v) => setItem({ ...item, restaurant_id: v })}
            renderInput={(params) => (
              <TextField {...params} name="restaurants" />
            )}
          />

          <Typography variant="h6">{t("hotels")}</Typography>

          <Autocomplete
            multiple
            id="tags-outlined"
            options={hotels}
            getOptionLabel={(option) => option?.name + " - " + option?.location}
            style={style}
            defaultValue={item?.hotel_id}
            filterSelectedOptions
            name="hotels"
            onChange={(e, v) => setItem({ ...item, hotel_id: v })}
            renderInput={(params) => <TextField {...params} name="hotels" />}
          />

          <Typography variant="h6">{t("featured_image")}</Typography>

          <input
            type="file"
            name="featured_image"
            style={style}
            onChange={handleChange}
            accept="image/*"
          />

          {image && (
            <Box sx={style}>
              <img
                src={image?.data}
                alt="Selected Image"
                style={{ width: "100px", height: "auto" }}
              />
            </Box>
          )}

          <Typography variant="h6">{t("owner")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.owner}
            name="owner"
            fullWidth
          />

          <Typography variant="h6">{t("source_link")}</Typography>

          <TextField
            sx={style}
            onChange={handleChange}
            value={item?.source_link}
            name="source_link"
            fullWidth
          />
        </Box>
        <Divider sx={style} />

        <Box sx={style}>
          <Tabs
            value={value}
            onChange={(e, val) => setValue(val)}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {days?.map((day, i) => (
              <Tab label={t(day.name) + " " + `${i + 1}`} key={i} />
            ))}
            <Button
              onClick={() =>
                setDays([...days, { name: "day", properties: [] }])
              }
            >
              {t("add_day")}
            </Button>
          </Tabs>

          {days?.map((day, i) => (
            <TabPanel value={value} index={i} key={i}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {t("day_title")}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#d3d3d3",
                  p: "20px",
                  borderRadius: "5px",
                  width: "45%",
                  mb: 5,
                }}
              >
                <Typography variant="h6">{t("day") + ` ${i + 1}`}</Typography>
              </Box>

              <Divider sx={style} />

              <Typography variant="h4" sx={{ mb: 5 }}>
                {t("today_stops")}
              </Typography>

              <DynamicModal
                model={model.model}
                propertyId={model.propertyId}
                setOpenModal={setOpenModal}
                setDays={setDays}
                open={openModal}
                dayIndex={model.dayIndex}
                days={days}
              />

              <Button
                color="primary"
                variant="outlined"
                sx={{ borderRadius: "3px" }}
                onClick={() => handleOpenModal("itenaries", value)}
              >
                {t("add_property")}
              </Button>
              {day?.properties?.map((property, i) => (
                <Box key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "15px",
                      justifyContent: "space-between",
                      border: "1px dashed #d3d3d3",
                      my: 5,
                      width: "50%",
                      height: "100px",
                      ml: property?.property?.selected ? 5 : 0,
                      backgroundColor: property?.property?.selected
                        ? "#ededed"
                        : "none",
                      position: "relative",
                    }}
                  >
                    <Button
                      sx={{
                        position: "absolute",
                        top: "-20px",
                        right: "-15px",
                        borderRadius: "50%",
                        zIndex: 1,
                        width: "40px",
                        minWidth: "unset",
                      }}
                      onClick={() =>
                        handleDeleteProperty(property?.property?.id)
                      }
                      color="error"
                      variant="contained"
                    >
                      <CloseIcon />
                    </Button>

                    <Box sx={{ display: "flex" }}>
                      <img
                        src={property?.property?.featured_image}
                        alt="test"
                        width={"100"}
                        height={"100"}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                          {property?.property?.title}
                          <Link
                            onClick={() => handleOpenModal("itenaries")}
                            sx={{ cursor: "pointer", textDecoration: "none" }}
                          >
                            ({t("edit")})
                          </Link>
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            mt: 1,
                          }}
                        >
                          <Typography variant="body1">
                            {property?.property?.city}
                          </Typography>
                          <Typography sx={{ ml: 5 }} variant="body1">
                            {t("visit")} :{" "}
                            {property?.time_min
                              ? property?.time_min
                              : property?.property?.duration_of_the_visit}{" "}
                            {t("mins")}
                          </Typography>
                        </Box>
                        <Typography sx={{ mt: 1 }} variant="body1">
                          {t("notes")} : {property?.note}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "2px",
                        minWidth: "unset",
                        width: "20px",
                      }}
                      onClick={() => handlePos(property?.property?.id)}
                    >
                      {property?.property?.selected ? (
                        <KeyboardDoubleArrowLeftIcon />
                      ) : (
                        <KeyboardDoubleArrowRightIcon />
                      )}
                    </Button>
                  </Box>

                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: "3px" }}
                    onClick={() =>
                      handleOpenModal(
                        "itenaries",
                        value,
                        property?.property?.id
                      )
                    }
                  >
                    {t("add_property")}
                  </Button>

                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: "3px", ml: 1 }}
                    onClick={() =>
                      handleOpenModal(
                        "transports",
                        value,
                        property?.property?.id
                      )
                    }
                  >
                    {t("add_transport")}
                  </Button>

                  {property?.property?.transport?.map((transport, i) => (
                    <>
                      <Box
                        sx={{
                          my: 2,
                          border: "1px dashed #d3d3d3",
                          p: 3,
                          width: "50%",
                          position: "relative",
                        }}
                      >
                        <Typography variant="h5">
                          {t("transport_method")}
                          <Link
                            onClick={() =>
                              handleOpenModal(
                                "transports",
                                property?.property?.id,
                                dayIndex
                              )
                            }
                            sx={{ cursor: "pointer", textDecoration: "none" }}
                          >
                            ({t("edit")})
                          </Link>
                        </Typography>

                        <Typography variant="body1">
                          {t(transport?.type)} :{" "}
                          {transport?.duration
                            ? transport?.duration
                            : property?.property?.duration_of_the_visit}{" "}
                          {t("mins")} : {transport?.distance} {t("meters")}
                        </Typography>
                        <Button
                          sx={{
                            position: "absolute",
                            top: "-20px",
                            right: "-15px",
                            borderRadius: "50%",
                            zIndex: 1,
                            width: "40px",
                            minWidth: "unset",
                          }}
                          onClick={() =>
                            handleDeleteTransport(
                              property?.property?.id,
                              property?.property?.transport[i]?.type,
                              property?.property?.transport[i]
                            )
                          }
                          color="error"
                          variant="contained"
                        >
                          <CloseIcon />
                        </Button>
                      </Box>

                      <Button
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: "3px" }}
                        onClick={() => handleOpenModal("itenaries")}
                      >
                        {t("add_itinerary")}
                      </Button>

                      <Button
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: "3px", ml: 1 }}
                        onClick={() => handleOpenModal("transports")}
                      >
                        {t("add_transport")}
                      </Button>
                    </>
                  ))}
                </Box>
              ))}

              <br />
              <Button
                color="error"
                onClick={handleDeleteDay}
                variant="contained"
                sx={{ mt: 3 }}
              >
                {t("delete_day")}
              </Button>
            </TabPanel>
          ))}
        </Box>
        <Button
          onClick={FormSubmit}
          variant="contained"
          sx={{ width: "200px", borderRadius: "3px" }}
        >
          {t("save")}
        </Button>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
