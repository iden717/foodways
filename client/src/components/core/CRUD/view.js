import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { API, setAuthToken } from "../../../config/api";
import { UserContext } from "../../../context/userContext";

export const Crud = (payload) => {
  const [state, dispatch] = useContext(UserContext);

  const create = useMutation(async (auth = false) => {
    const { url, type, form } = payload;

    const setContentType = (action) => {
      switch (action) {
        case "json":
          return {
            headers: {
              "Content-Type": "application/json",
            },
          };
        case "form-data":
          return {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        default:
          return {
            headers: {
              "Content-Type": "application/json",
            },
          };
      }
    };

    const setFormData = (formData, data) => {
      const { title, image, price } = data;

      formData.append("title", title);
      formData.append("image", image);
      formData.append("price", price);

      return formData;
    };
    const setBody = (action, setform) => {
      const body = new FormData();
      switch (action) {
        case "json":
          return JSON.stringify(setform);
        case "form-data":
          return setFormData(body, setform);
        default:
          return "error";
      }
    };
    const config = setContentType(type);
    const body = setBody(type, form);

    if (auth) {
      const response = await API.post(url, body, config);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: response?.data?.data?.user,
      });

      setAuthToken(response?.data?.data?.user?.token);
    } else {
      await API.post(url, body, config);
    }
  });
  //view
  const view = useQuery(payload.cache, async () => {
    const { url } = payload;
    const response = await API.get(url);
    return response;
  });

  const update = useMutation(async () => {
    try {
      const { url, type, form } = payload;
      const setFormData = (formData, data) => {
        const { fullname, image, email, phone, location } = data;
        console.log("ini update form", image);
        formData.append("fullname", fullname);
        formData.append("image", image);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("location", location);

        return formData;
      };
      const setContentType = (action) => {
        switch (action) {
          case "json":
            return {
              headers: {
                "Content-Type": "application/json",
              },
            };
          case "form-data":
            return {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
          default:
            return {
              headers: {
                "Content-Type": "application/json",
              },
            };
        }
      };
      const setBody = (action, setform) => {
        const body = new FormData();
        switch (action) {
          case "json":
            return JSON.stringify(setform);
          case "form-data":
            return setFormData(body, setform);
          default:
            return "error";
        }
      };
      const config = setContentType(type);
      const body = setBody(type, form);
      console.log("ini update form", form);
      return await API.patch(url, body, config);
    } catch (error) {
      console.log(error);
    }
  });

  switch (payload.mode) {
    case "CREATE":
      return create;
    case "VIEW":
      return view;
    case "UPDATE":
      return update;
    case "DELETE":
      return null;
    default:
      break;
  }
};
