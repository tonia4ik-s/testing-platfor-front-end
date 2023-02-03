import instance from "./configurations/configurations";
import { USER_ANSWER_URL } from "../constants/api/urls";

export default class userAnswersService {
    static finishTest(model) {
        return instance.post(USER_ANSWER_URL, model);
    }

    static getResults(model) {
        return instance.get(USER_ANSWER_URL + `?userTestId=${model}`);
    }
}
