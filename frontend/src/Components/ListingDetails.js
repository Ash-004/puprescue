import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ListingDetail = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const source = Axios.CancelToken.source();

        const fetchListing = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/api/listings',{cancelToken: source.token})
                setListing(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchListing();
    }, [id]);

    if (!listing) {
        return <div>Loading...</div>;
    }

    const { image, heading, description, addedDate, location } = listing;

    return (
        <div>
            <h2>{heading}</h2>
            <img src={image} alt="Listing" />

            <p>{description}</p>
            <p>Added Date: {addedDate}</p>

            <MapContainer center={location} zoom={10} style={{ height: "400px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={location}>
                    <Popup>{heading}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default ListingDetail;
