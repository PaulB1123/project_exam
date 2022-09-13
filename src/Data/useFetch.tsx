import { useState, useEffect } from "react";

const Mihai = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const url =
    "https://ogqyygcsrnfuhogp222u6btqtm.appsync-api.eu-west-1.amazonaws.com/graphql";
  fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": "da2-heauk73ukbbe3atd33tv22bd4y",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: "query my{getClients{id name}}" }),
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export default Mihai;
