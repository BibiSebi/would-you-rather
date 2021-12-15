import { _getUsers } from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers()]).then(([users]) => ({
    users,
  }));
}
