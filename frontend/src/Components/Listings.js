import React,{useState,useEffect} from "react";
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker,
} from 'react-leaflet'
import { useNavigate } from "react-router-dom";

import Axios from 'axios'
import {Icon} from 'leaflet';
import {
    Grid,
    AppBar,
    Typography,
    Button,
    responsiveFontSizes,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CircularProgress,
    css
} from '@mui/material'
import 'leaflet/dist/leaflet.css';
import pupPng from './Assets/pawprint.png'
import faPng from './Assets/fa.png'
import rPng from './Assets/poison.png'

import "./Listings.css"
import "bootstrap/dist/css/bootstrap.min.css";


function Listings(){

    // fetch('http://127.0.0.1:8000/api/listings').then(response =>response.json()).then(data=>console.log(data))
    const navigate = useNavigate();
    const pupIcon = new Icon({
        iconUrl: pupPng,
        iconSize: [30,30],
    });
    const rabIcon = new Icon({
        iconUrl: faPng,
        iconSize: [30,30],
    });
    const injIcon = new Icon({
        iconUrl: rPng,
        iconSize: [30,30],
    });



    const[latitude,setLatitude] = useState(51.505)
    const[longitude,setLongitude] = useState(-0.09)

    const [allListings,setAllListings] = useState([]);
    const[dataIsLoading, setDataIsLoading] = useState(true)

    useEffect(()=>{
        const source = Axios.CancelToken.source();
        async function GetAllListings(){
        try{
            const response = await Axios.get('http://localhost:8000/api/listings',{cancelToken: source.token})
            setAllListings(response.data)
            setDataIsLoading(false)
        }
        catch (error){
            console.log(error)
        }
    }

    if (dataIsLoading === false){
        console.log(allListings[0].location)
        }
        GetAllListings();
    return ()=>{
    source.cancel()
    }},[])

    if (dataIsLoading === true){
        return (
            <Grid container justifyContent="center" alignItems = "center" style = {{height:"100vh"}}>
                <CircularProgress/>
            </Grid>
        )
    }

    console.log(allListings[0])

    return (
        <Grid container>
            <Grid item xs={5}>
                {allListings.map((listing) => {
                    return (
                        <Card key={listing.id} className="card" style={{ backgroundColor: "#333333" }}>
                            <CardHeader
                                title={listing.title}
                                style={{ color: "white" }}
                            />
                            <CardMedia
                                component="img"
                                image={listing.picture1}
                                alt={listing.title}
                                className="card-image"/* Add custom class for image styling */
                                onClick = {()=>navigate(`/listings/${listing.id}`)}
                            />
                            <CardContent>
                                <Typography variant="body2" style={{ color: "white" }}>
                                    {listing.description.substring(0, 300)}...
                                </Typography>
                            </CardContent>
                            <Typography style={{ color: "white" }}>{new Date(listing.date_posted).toString()}</Typography>
                        </Card>
                    )
                })}
            </Grid>
            <Grid item xs={7} style={{ marginTop: "0.5rem" }}>
                <AppBar position='sticky'>
                    <div style={{ height: "100vh", zIndex: 1 }}>
                        <MapContainer center={[20, 80]} zoom={5} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {allListings.map((listing) => {
                                function IconDisplay() {
                                    if (listing.listing_type === "Healthy") {
                                        return pupIcon;
                                    } else if (listing.listing_type === "Rabid") {
                                        return injIcon;
                                    } else if (listing.listing_type === "Injured") {
                                        return rabIcon;
                                    }
                                }
                                return (
                                    <Marker
                                        key={listing.id}
                                        icon={IconDisplay()}
                                        position={[
                                            listing.latitude,
                                            listing.longitude,
                                        ]}
                                    >
                                        <Popup>
                                            <Typography variant="h5">{listing.title}</Typography>
                                            <img
                                                src={listing.picture1}
                                                style={{
                                                    height: "14rem",
                                                    width: "18rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => navigate(`/listings/${listing.id}`)}
                                            />
                                            <Typography variant="body1">
                                                {listing.description.substring(0, 150)}...
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={() => navigate(`/listings/${listing.id}`)}
                                            >
                                                Details
                                            </Button>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>
                </AppBar>
            </Grid>
        </Grid>

    )
}

export default Listings