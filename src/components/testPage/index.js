import Grid from "@mui/material/Grid";
import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";
import {Button, Card, CardActions, CardContent, Checkbox, FormControlLabel} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {getUserInfo} from "../../services/users";
import {getUserTests} from "../../services/userTests";
import {getQuestionsByTestId} from "../../services/questions";

export default function TestPage() {
    const location = useLocation();
    const {test} = location.state.test;

    const [checked, setChecked] = useState(false);


    // useEffect( () => {
    //     async function fetchData() {
    //         try {
    //
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     fetchData().then();
    // }, []);

    // async function getQuestions(){
    //     setTestQuestions(await getQuestionsByTestId(test.id))
    //     console.log(3, testQuestions)
    // }

    return(
        <Grid container flexDirection>
            <Navbar />
            <Box
                sx={{
                    width: 700,
                    my: 15,
                    mx: 30,
                }}
            >
                <Card sx={{ minWidth: 900}}>
                    <CardContent>
                        <Typography component={Button} href='/' sx={{ fontSize: 14, mb: 3 }} color="text.primary" gutterBottom>
                            ← back to all tests
                        </Typography>
                        <Typography variant="h3" component="div">
                            {test.title}
                        </Typography>

                        <Typography variant="body1">
                            <br />
                            { test.description }
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 3 }}>
                            Max score: {test.maxResult}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div style={{ marginLeft: "auto", marginRight: 25, marginBottom: 20, display: "grid"}}>
                            <FormControlLabel
                                name="agree"
                                control={<Checkbox
                                    checked={checked}
                                    onChange={(e) => setChecked(e.currentTarget.checked)}
                                />}
                                label="I agree to start"
                            />
                            <Button
                                disabled={!checked}
                                component={Link}
                                to="/question"
                                state={{ test: {test} }}
                                variant="outlined"
                                size="large"
                                sx={{ mt: 1}}
                            >
                                Proceed
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    )
}
