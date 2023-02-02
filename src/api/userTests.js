import instance from "./configurations/configurations";
import { USER_TEST_URL } from "../constants/api/urls";

export default class userTestsService {
    static getUserTest() {
        return instance.get(USER_TEST_URL);
    }
}
