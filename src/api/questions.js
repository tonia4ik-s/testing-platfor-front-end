import instance from "./configurations/configurations";
import { QUESTION_URL } from "../constants/api/urls";

export default class questionsService {
    static getQuestionsByTestId(model) {
        return instance.get(QUESTION_URL + `?testId=${model}`);
    }
}
