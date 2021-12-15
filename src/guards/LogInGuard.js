export const LogInGuard = () => {
  try {
    const user = localStorage.getItem("authedUser");
    return JSON.parse(user) ? true : false;
  } catch (err) {
    return false;
  }
};
