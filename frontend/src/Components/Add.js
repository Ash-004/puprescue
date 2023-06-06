import React, { useEffect, useState, useRef,useContext, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import {Map, useMap} from 'react-leaflet'
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import search from "./Search";
import 'leaflet/dist/leaflet.css';

import {
    MapContainer,
    TileLayer,
    Popup,
    Marker,
} from 'react-leaflet'

// MUI
import {
    Grid,
    AppBar,
    Typography,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CircularProgress,
    TextField,
    Snackbar,
    Alert, FormControlLabel, Checkbox, IconButton, InputAdornment, Input,
} from "@mui/material";
import {Icon} from "leaflet";
import mapPng from "./Assets/placeholder.png"
import stateContext from "../Contexts/StateContext";
import StateContext from "../Contexts/StateContext";
import Search from "./Search";


const mapIcon = new Icon({
    iconUrl: mapPng,
    iconSize: [30,30],
});

const initialState = {
    titleValue: "",
    descriptionTypeValue:"",
    listingTypeValue: "",
    countTypeValue:"",
    latitudeValue:"",
    longitudeValue: "",
    picture1Value: "",
    picture2Value: "",
    picture3Value: "",
    picture4Value: "",
    picture5Value: "",
    injuredChecked: false, // Add new state variable for "injured" tick box
    healthyChecked: false,
    rabidChecked: false,
    markerPosition: {
        lat:'20',
        lng:'80',
    },
    uploadedPictures: [],
    sendRequest:0,
};


function ReducerFuction(draft, action) {
    switch (action.type) {
        case "catchUsernameChange":
            draft.titleValue = action.titleChosen;
            break;
        case "catchListingTypeChange":
            draft.listingTypeValue = action.ListingTypeChosen;
            break;

        case "catchDescriptionChange":
            draft.descriptionTypeValue = action.descriptionChosen;
            break;
        case "catchCountChange":
            draft.countTypeValue = action.countChosen;
            break;

        case "catchLatitudeChange":
            draft.latitudeValue = action.latitudeChosen;
            break;

        case "catchLongitudeChange":
            draft.longitudeValue = action.longitudeChosen;
            break;

        case "catchRabidChange": // Update case name to "catchRabidChange"
            draft.rabidChecked = action.rabidChosen;
            break;

        case "catchInjuredChange":
            draft.injuredChecked = action.injuredChosen;
            break;

        case "catchHealthyChange":
            draft.healthyChecked = action.healthyChosen;
            break;

        case "catchUploadedPictures":
            draft.uploadedPictures = action.picturesChosen;
            break;

        case "catchPicture1Change":
            draft.picture1Value = action.picture1Chosen;
            break;

        case "changeSendRequest":
            draft.sendRequest = draft.sendRequest + 1;
            break;

        default:
            break;
    }

    // Update listingTypeValue based on checked status of checkboxes
    if (draft.rabidChecked) {
        draft.listingTypeValue = "Rabid";
    } else if (draft.injuredChecked) {
        draft.listingTypeValue = "Injured";
    } else if (draft.healthyChecked) {
        draft.listingTypeValue = "Healthy";
    } else {
        draft.listingTypeValue = "";
    }
}



function Add(){

    const navigate = useNavigate()
    const globalState = useContext(StateContext)

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
    function FormSubmit(e) {
        e.preventDefault();
        console.log("submitted")
            dispatch({ type: "changeSendRequest" });
    }

    useEffect(() => {
        if (state.sendRequest) {
            async function AddListing() {
                const formData = new FormData()
                formData.append('title',state.titleValue)
                formData.append('description',state.descriptionTypeValue)
                formData.append('count',state.countTypeValue)
                formData.append('listing_type',state.listingTypeValue)
                formData.append('latitude',state.latitudeValue)
                formData.append('longitude',state.longitudeValue)
                formData.append('picture1',state.picture1Value)




                    try {
                    console.log(formData);
                        const response = await Axios.post(
                            "http://localhost:8000/api/listings/create/",
                            formData
                        );
                        navigate("/listings");
                    } catch (e) {
                        console.log(e);
                    }
            }
            AddListing();
        }
    }, [state.sendRequest]);

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                dispatch({type: 'catchLatitudeChange', latitudeChosen: marker.getLatLng().lat})
                dispatch({type: 'catchLongitudeChange', longitudeChosen: marker.getLatLng().lng})

            },
        }),
        [],
    )

    function SubmitButtonDisplay() {
        if (
            globalState.userIsLogged
        ) {
            return (
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                        backgroundColor: "green",
                        color: "white",
                        fontSize: "1.1rem",
                        marginLeft: "1rem",
                        "&:hover": {
                            backgroundColor: "blue",
                        },
                    }}
                    disabled={state.disabledBtn}
                >
                    SUBMIT
                </Button>
            );
        }
        else if (!globalState.userIsLogged) {
            return (
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/login")}
                    sx={{
                        backgroundColor: "green",
                        color: "white",
                        fontSize: "1.1rem",
                        marginLeft: "1rem",
                        "&:hover": {
                            backgroundColor: "blue",
                        },
                    }}
                >
                    SIGN IN TO ADD A PROPERTY
                </Button>
            );
        }
    }

useEffect(()=>{
    if (state.uploadedPictures[0])
        dispatch({type:"catchPicture1Change", picture1Chosen: state.uploadedPictures[0],});
    },[state.uploadedPictures[0]]);


    const Search = (props) => {
        const map = useMap() // access to leaflet map
        const { provider } = props

        useEffect(() => {
            const searchControl = new GeoSearchControl({
                provider,
            })

            map.addControl(searchControl) // this is how you add a control in vanilla leaflet
            return () => map.removeControl(searchControl)
        }, [props])

        return null // don't want anything to show up from this comp
    }
    const searchContainerStyle = {
        position: "relative",
        align:"center",
        top: "20px",
        left: "10px",
        zIndex: "1000",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    };
  return (
        <div
            style={{
                width: "75%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "3rem",
                border: "5px solid black",
                padding: "3rem",
            }}
        >
            <form onSubmit={FormSubmit }>
                <Grid item container justifyContent="center">
                    <Typography variant="h4">Reporting Centre</Typography>
                </Grid>



                <Grid item container style={{ marginTop: "1rem" }}>
                    <TextField
                        label="Title"
                        fullWidth
                        required
                        value={state.titleValue} // Update value prop with current state value
                        onChange={(e) =>
                            dispatch({ type: "catchUsernameChange", titleChosen: e.target.value }) // Update titleValue state with entered value
                        }
                    />

                    <Grid item container style={{ marginTop: "1rem" }}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={state.descriptionTypeValue} // Update value prop with current state value
                            onChange={(e) =>
                                dispatch({ type: "catchDescriptionChange", descriptionChosen: e.target.value }) // Update descriptionTypeValue state with entered value
                            }
                        />


                </Grid>
                    <Grid item xs={2} container style={{ marginTop: "1rem" }}>
                        <Input
                            id="count"
                            label="Count"
                            type="number"
                            variant="standard"
                            fullWidth
                            value={state.countTypeValue}
                            onChange={(e) =>
                                dispatch({
                                    type: "catchCountChange",
                                    countChosen: e.target.value,
                                })
                            }
                            inputProps={{
                                min: 1,
                                max: 100,
                                step: 1,
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            dispatch({
                                                type: "catchCountChange",
                                                countChosen: parseInt(state.countTypeValue) + 1,
                                            })
                                        }
                                        edge="end"
                                    >
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            dispatch({
                                                type: "catchCountChange",
                                                countChosen: parseInt(state.countTypeValue) - 1,
                                            })
                                        }
                                        edge="end"
                                    >
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>

<Grid item container>
    <Grid item  style={{ marginTop: "1rem" }}>
    <FormControlLabel
        control={
            <Checkbox
                checked = {state.rabidChecked}
                onChange={(e) => dispatch({
                    type:"catchListingTypeChange",
                    rabidChosen: e.target.checked,
                })}
            />}
        label={"rabid"}/>
</Grid>

    <Grid item  style={{ marginTop: "1rem" }}>
        <FormControlLabel
            control={
                <Checkbox
                    checked={state.injuredChecked}
                    onChange={(e) =>
                        dispatch({
                            type: "catchInjuredChange",
                            injuredChosen: e.target.checked,
                        })
                    }
                    label="Injured"
                />
            }
            label={"injured"}/>
    </Grid>

    <Grid item  style={{ marginTop: "1rem" }}>
        <FormControlLabel
            control={
                <Checkbox
                    checked={state.healthyChecked}
                    onChange={(e) =>
                        dispatch({
                            type: "catchHealthyChange",
                            healthyChosen: e.target.checked,
                        })
                    }
                />
            }
            label={"healthy"}/>
    </Grid>
</Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={6}
                    style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
                >
                    <Button
                        variant="contained"
                        fullWidth
                        component="label"
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            fontSize: "1.1rem",
                            marginLeft: "1rem",
                            // "&:hover": {
                            // 	backgroundColor: "blue",
                            // },
                        }}
                        // disabled={state.disabledBtn}
                    >
                        Upload Pictures
                       <input type="file" multiple accept="image/png,image/gif,image/jpeg,image/jgp" hidden
                       onChange={(e)=>dispatch({type:"catchUploadedPictures",picturesChosen:e.target.files})}/>
                    </Button>
                </Grid>

<Grid item container style={{height:"35rem", marginTop: "1rem"}}>
                    <MapContainer center={[20, 80]} zoom={5} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
<Marker
    draggable
    icon={mapIcon}
    eventHandlers={eventHandlers}
    position={state.markerPosition}
    ref={markerRef}>


</Marker>
                        <div style={searchContainerStyle}><Search provider={new OpenStreetMapProvider()} /></div>

                    </MapContainer>
</Grid>
                <Grid item container>
                    <ul>
                        {state.picture1Value ? <li>{state.picture1Value.name}</li> : ""}
                        {state.picture2Value ? <li>{state.picture2Value.name}</li> : ""}
                        {state.picture3Value ? <li>{state.picture3Value.name}</li> : ""}
                        {state.picture4Value ? <li>{state.picture4Value.name}</li> : ""}
                        {state.picture5Value ? <li>{state.picture5Value.name}</li> : ""}
                    </ul>
                </Grid>

                <Grid
                    item
                    container
                    xs={8}
                    sx={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
                >
                    {SubmitButtonDisplay()}
                </Grid>
            </form>
<button onClick={()=>console.log(state.uploadedPictures)}> </button>
        </div>
    );
}


export default Add