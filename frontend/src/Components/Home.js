import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import pup from './Assets/pup.webp';
import dog from './Assets/dog.webp'
import Header from "./header";

const Home = () => {
    return (
        <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh", paddingBottom: "2rem", position: "relative" }}>
            <img src={pup} alt="puppy" style={{ width: "100%", maxHeight: "50vh", objectFit: "cover" }} />
            <img src={dog} alt="puppy" style={{ width: "100%", maxHeight: "50vh", objectFit: "cover", position: "absolute", top: 0, zIndex: 1 }} />

            <div style={{ position: "relative", marginTop: "-25vh", padding: "1rem", zIndex: 2 }}>
                <Typography variant="h2" align="center" style={{ color: 'green', marginBottom: "1rem" }}>The rescue stray project</Typography>
                <Container align="center">
                    <Button
                        variant="contained"
                        component={Link}
                        to="/add"
                        className="btn btn-lg btn-primary"
                        style={{ borderRadius: '30px', backgroundColor: "green" }}
                    >
                        Save A Stray
                    </Button>
                </Container>
            </div>
            <Container style={{ marginTop: "3rem", position: "relative" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="bg-white h-100 border-0" style={{ borderRadius: '15px' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ color: 'green'}}>
                                    Raise Awareness
                                </Typography>
                                <Typography variant="body1" style={{ color: 'green'}}>
                                    Being aware of the plight of stray dogs and spreading awareness about their
                                    situation can help in garnering support and resources for their welfare.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="bg-white h-100 border-0" style={{ borderRadius: '15px' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ color: 'green'}}>
                                    Provide Shelter
                                </Typography>
                                <Typography variant="body1" style={{ color: 'green'}}>
                                    Helping stray dogs find shelter, whether through adoption, fostering, or supporting
                                    animal shelters, can provide them with a safe and caring environment.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="bg-white h-100 border-0" style={{ borderRadius: '15px' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ color: 'green'}}>
                                    Promote Adoption
                                </Typography>
                                <Typography variant="body1" style={{ color: 'green'}}>
                                    Encouraging the adoption of stray dogs can help them find loving forever homes and
                                    reduce the number of stray animals on the streets.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="bg-white h-100 border-0" style={{ borderRadius: '15px' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ color: 'green'}}>
                                    Support Neutering/Spaying
                                </Typography>
                                <Typography variant="body1" style={{ color: 'green'}}>
                                    Supporting neutering/spaying programs can help control the stray dog population and
                                    prevent further reproduction, reducing the number of stray dogs in the long run.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="bg-white h-100 border-0" style={{ borderRadius: '15px' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ color: 'green'}}>
                                    Provide Food and Water
                                </Typography>
                                <Typography variant="body1" style={{ color: 'green'}}>
                                    Providing food and water to stray dogs in need can help ensure their basic needs are
                                    met and prevent them from going hungry.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="bg-white h-100 border-0" style={{ borderRadius: '15px' }}>
                            <CardContent>
                                <Typography variant="h6" style={{ color: 'green'}}>
                                    Volunteer or Donate
                                </Typography>
                                <Typography variant="body1" style={{ color: 'green'}}>
                                    Volunteering or donating to local animal welfare organizations or shelters can
                                    provide support and resources for stray dogs in need.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Home;