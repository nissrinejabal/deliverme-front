export default {
  getData: () => {
    return fetch("/api/admin").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  updateOrderState: (data) => {
    const { _id, state } = data;
    return fetch("/api/admin/order", {
      method: "put",
      body: JSON.stringify({ _id, state }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { msgBody: "UnAuthorized" , msgError: true };
    });
  },

  getUsers: () => {
    return fetch("/api/admin/users").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  getOrders: () => {
    return fetch("/api/admin/orders").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  getProfile: (_id) => {
    return fetch("/api/admin/profile/" + _id).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  getOrder: (_id) => {
    return fetch("/api/admin/orders/" + _id).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
};
