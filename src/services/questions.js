import questionsService from "../api/questions";

export function getQuestionsByTestId(model) {
    return questionsService
        .getQuestionsByTestId(model)
        .then(
            (response) => response.data,
        )
}
