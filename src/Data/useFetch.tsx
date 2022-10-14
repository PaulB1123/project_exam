import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";

// const Mihai = () => {
//   const [data, setData] = useState("");
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);
//   const { allUserData } = useContext(UserContext);

//   console.log(allUserData);

//   const url =
//     "https://ogqyygcsrnfuhogp222u6btqtm.appsync-api.eu-west-1.amazonaws.com/graphql";
//   fetch(url, {
//     method: "POST",
//     headers: {
//       // "Authorization":
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query: "query my{getClients{id name}}" }),
//   })
//     .then((resp) => resp.json())
//     .then(function (data) {
//       console.log(data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// export default Mihai;
