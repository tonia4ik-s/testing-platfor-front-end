import Grid from "@mui/material/Grid";
import * as React from "react";
import {useEffect, useState} from "react";
import {getUserInfo} from "../../services/users";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";
import {getUserTests} from "../../services/userTests";
import {Button, Card, CardActions, CardContent} from "@mui/material";
import {createBrowserHistory} from "history";
import {Link} from "react-router-dom";

export default function MainPage() {
    const history = createBrowserHistory();
    const [userName, setUserName] = useState();
    const [userTests, setUserTests] = useState();

    useEffect( () => {
        async function fetchData() {
            try {
                const res = await getUserInfo();
                const test = await getUserTests();
                setUserName(res.userName);
                setUserTests(test);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData().then();
    }, []);

    return(
        <Grid container flexDirection>
            <Navbar />
            <Box
                sx={{
                    width: 700,
                    my: 15,
                    mx: 'auto'
                }}
            >
                <Typography fontFamily={'monospace'}  color="darkslateblue" variant='h2' gutterBottom>
                    Hi @{userName},
                </Typography>
                <Typography fontFamily={'monospace'} variant='h5' gutterBottom>
                    <p>here you'll find all tests assigned to you.</p>
                    <p>Good luck! 😉</p>
                </Typography>
                { userTests != null ?
                    <div>
                        { userTests.map((test, i) => {
                            console.log("Entered");
                            // Return the element. Also pass key
                            return (
                                <Card
                                    key={test}
                                    sx={{ my: 5, minWidth: 700 }}
                                >
                                    <CardContent>
                                        {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                                        {/*    Word of the Day*/}
                                        {/*</Typography>*/}
                                        <Typography variant="h3" component="div">
                                            {test.title}
                                        </Typography>
                                        {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                                        {/*    adjective*/}
                                        {/*</Typography>*/}
                                        <Typography variant="body1">
                                            { test.description }
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'right', mr: 3, mb: 2}}>
                                        <div>
                                            { test.isFinished ?
                                                <b style={{ color: 'darkblue'}}>
                                                    Your result: { test.result }/{test.maxResult}
                                                </b>
                                                :
                                                <Button
                                                    component={Link}
                                                    to="/test"
                                                    state={{ test: {test} }}
                                                    // onClick={() => moveToTest(test)}
                                                    variant="contained"
                                                    size="large"
                                                    sx={{ marginLeft: "auto"}}
                                                >
                                                    Start Test
                                                </Button>
                                            }
                                        </div>
                                    </CardActions>
                                </Card>
                            )
                        }) }
                    </div>
                    :
                    <></>
                }

            </Box>
        </Grid>
    )
}
