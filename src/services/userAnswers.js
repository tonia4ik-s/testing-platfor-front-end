import userAnswersService from "../api/userAnswers";

export function finishTest(model) {
    return userAnswersService
        .finishTest(model)
}

export function getResults(model) {
    return userAnswersService
        .getResults(model)
    .then(
        (response) => response,
    )
}
