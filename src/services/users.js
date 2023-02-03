import usersService from "../api/users"

export function getUserInfo() {
  return usersService
    .getUser()
    .then(
      (response) => response.data,
    )
}
