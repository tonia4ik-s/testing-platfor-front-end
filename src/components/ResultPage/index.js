import Grid from "@mui/material/Grid";
import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    List, ListItem,
    ListItemIcon, ListItemText
} from "@mui/material";
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import {useLocation} from "react-router-dom";
import {getResults} from "../../services/userAnswers";

export default function ResultPage() {
    const location = useLocation();
    const {test} = location.state.test;

    const [results, setResults] = useState();

    useEffect( () => {
        async function fetchData() {
            try {
                setResults((await getResults(test.id)).data)
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
                    mx: 30,
                }}
            >
                <Typography component={Button} href='/' sx={{ fontSize: 14, mb: 3 }} color="text.primary" gutterBottom>
                    ← back to all tests
                </Typography>
                {results != null ?
                <Card sx={{ minWidth: 900}}>
                    <CardContent>
                        <Typography variant="h3" component="div">
                            {test.title}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "darkblue" }}>
                            Result: {results.result}/{test.maxResult}
                        </Typography>
                        <Box
                            sx={{
                                my: 5,
                                mx: 10,
                            }}
                        >
                            {results.questions.map((question, i) => (
                                <div>
                                    <Typography variant="h4" component="div">
                                        {i + 1}. { question.questionText }
                                        <br/>
                                    </Typography>
                                    <Typography sx={{ ml: 4, mb: 1.5 }} color="text.secondary">
                                        Points: {question.resultMark}/{question.mark}
                                    </Typography>
                                    <List sx={{ mt: 2}}>
                                        {question.options.map((option, i) => (
                                            <ListItem key={i} sx={{ color:option.isRightAnswer ? "green" :
                                                    (option.isUserAnswer ? "red" : "black")}}>
                                                <ListItemIcon>
                                                    <AdjustOutlinedIcon fontSize="small"/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={option.optionText}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            ))}
                        </Box>
                    </CardContent>
                    <CardActions>
                        <div style={{ marginLeft: "auto", marginRight: 25, marginBottom: 20, display: "grid"}}>
                            <Typography
                                component={Button}
                                href='/'
                                sx={{ fontSize: 14, mb: 3 }}
                                color="text.primary"
                                gutterBottom
                            >
                                back to all tests →
                            </Typography>
                        </div>
                    </CardActions>
                </Card> :
                    <div>Loading...</div>}
            </Box>
        </Grid>
    )
}
