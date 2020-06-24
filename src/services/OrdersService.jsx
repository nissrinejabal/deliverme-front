export default {
  postOrder: (order) => {
    return fetch("/api/order", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { msgBody: "UnAuthorized" , msgError: true };
    });
  },
  getData: () => {
    return fetch("/api/order").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
};
