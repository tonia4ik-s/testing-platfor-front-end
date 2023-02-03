import Grid from "@mui/material/Grid";
import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";
import {
    Button,
    Card, CardActions, CardContent, Link,
    List, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {getQuestionsByTestId} from "../../services/questions";
import {finishTest} from "../../services/userAnswers";
import {wait} from "@testing-library/user-event/dist/utils";

export default function QuestionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const {test} = location.state.test;
    const [testQuestions, setTestQuestions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [clickedAnswer, setClickedAnswer] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();
    const [score, setScore] = useState(0);
    const [result, setResult] = useState([]);

    const onAnswerSelected = (index) => {
        setSelectedIndex(index);
        setClickedAnswer(true)
    }

    useEffect(() => {
        async function fetchData(){
            const questions = await getQuestionsByTestId(test.testId);
            setTestQuestions(questions);
        }
        fetchData().then();
    }, []);

    function saveResults(){
        let question = testQuestions[currentQuestion];
        result.push({
            userTestId: test.id,
            questionId: question.id,
            chosenOptionId: question.options[selectedIndex].id,
            isRightAnswer: question.options[selectedIndex].isRightAnswer,
            mark: question.mark
        })
        setResult(result)
    }
    const nextQuestionHandler =() => {
        let question = testQuestions[currentQuestion];
        if (question.options[selectedIndex].isRightAnswer){
            setScore(score + testQuestions[currentQuestion].mark)
        }
        saveResults();
        if (currentQuestion < testQuestions.length - 1){
            setCurrentQuestion(currentQuestion+1);
            setClickedAnswer(false);
            setSelectedIndex(undefined);
        }
    }

    async function onFinish(){
        saveResults();
        await wait(1000)
        let answers = {
            score: score,
            userTestId: test.id,
            userAnswers: result
        }
        await finishTest(answers);
        navigate( "/result", {state: {test: location.state.test}});
    }

    return(
        <Grid container flexDirection>
            <Navbar />
            <Box
                sx={{
                    width: 700,
                    my: 20,
                    mx: "auto",
                }}
            >
                { testQuestions != null ?
                    <Card sx={ {minWidth: 900} }>
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {currentQuestion + 1}. { testQuestions[currentQuestion].questionText }
                                <br/>
                            </Typography>
                            <Typography sx={{ ml: 4, mb: 1.5 }} color="text.secondary">
                                Points: {testQuestions[currentQuestion].mark}
                            </Typography>
                            <List sx={{ mt: 2}}>
                                {testQuestions[currentQuestion].options.map((option, i) => (
                                    <ListItemButton
                                        selected={selectedIndex === i}
                                        onClick={() => onAnswerSelected(i, option.id)}
                                        key={i}
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
                                {currentQuestion < testQuestions.length - 1 ?
                                <Button
                                    disabled={!clickedAnswer}
                                    onClick={nextQuestionHandler}
                                    size="large"
                                    sx={ {mt: 1} }
                                >
                                   Next Question
                                </Button>
                                    :
                                <Button
                                    disabled={!clickedAnswer}
                                    onClick={onFinish}
                                    component={Link}
                                    to="/result"
                                    state={{ test: {test} }}
                                    size="large"
                                    variant="contained"
                                    sx={ {mt: 1} }
                                >
                                    Finish Test
                                </Button> }
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
