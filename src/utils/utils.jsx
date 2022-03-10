import { setAlertDetails, setLoggedIn } from "redux/actions";
import axios from "axios";
import { store } from "redux/store";

export const authService = () => {
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        store.dispatch(setLoggedIn(false));
      }

      return Promise.reject(error);
    },
  );
};
