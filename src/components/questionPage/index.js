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
    Checkbox,
    FormControl,
    FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Radio,
    RadioGroup
} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {getQuestionsByTestId} from "../../services/questions";

export default function QuestionPage() {
    const location = useLocation();
    const {test} = location.state.test;
    const [testQuestions, setTestQuestions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [clickedAnswer, setClickedAnswer] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();
    const [score, setScore] = useState(0);
    const [end, setEnd] = useState(false);

    const onAnswerSelected = (index) => {
        setSelectedIndex(index);
        setSelectedAnswer(testQuestions[currentQuestion].options[index])
        setClickedAnswer(true)
        console.log(selectedIndex, selectedAnswer)
    }

    useEffect(() => {
        async function fetchData(){
            const questions = await getQuestionsByTestId(test.testId);
            setTestQuestions(questions);
            console.log(testQuestions);
        }
        fetchData().then();
    }, []);

    return(
        <Grid container flexDirection>
            <Box
                sx={{
                    width: 700,
                    my: 15,
                    mx: 30,
                }}
            >
                { testQuestions != null ?
                    <Card sx={ {minWidth: 900} }>
                        <CardContent>
                            {/*<Typography component={Button} href='/' sx={{ fontSize: 14, mb: 3 }} color="text.primary" gutterBottom>*/ }
                            {/*    ← back to all tests*/ }
                            {/*</Typography>*/ }
                            <Typography variant="h4" component="div">
                                {currentQuestion + 1}. { testQuestions[currentQuestion].questionText }
                            </Typography>
                            <List>
                                {testQuestions[currentQuestion].options.map((option, i) => (
                                    <ListItemButton
                                        selected={selectedIndex === i}
                                        onClick={() => onAnswerSelected(i, option.id)}
                                        key={option.id}
                                    >
                                        <ListItemIcon>
                                            <ListItemIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={option.optionText}
                                        />
                                    </ListItemButton>
                                    ))}
                            </List>
                        </CardContent>
                        <CardActions>
                            <div style={ {marginLeft: "auto", marginRight: 25, marginBottom: 20, display: "grid"} }>
                                <Button
                                    component={ Link }
                                    to="/question"
                                    // state={{ test: {test} }}
                                    size="large"
                                    sx={ {mt: 1} }
                                >
                                    Proceed
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                    :
                    <p>Sorry, something went wrong...</p>
                }
            </Box>
        </Grid>
    )
}
