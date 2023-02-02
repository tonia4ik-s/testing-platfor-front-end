import userTestsService from "../api/userTests"

export function getUserTests() {
    return userTestsService
        .getUserTest()
        .then(
            (response) => response.data,
        )
}
