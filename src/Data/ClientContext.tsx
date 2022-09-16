import { useState, useEffect, createContext, useContext } from "react";
import { isPropertySignature } from "typescript";
import UserContext from "./UserContext";

const ClientContext = createContext({
  clientData: [] as any[],
});

export const ClientContextProvider = (props: any) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [clientData, setClientData] = useState([] as any[]);
  const { allUserData } = useContext(UserContext);
  const dataSentBack = {
    method: "POST",
    headers: {
      Authorization: `${allUserData}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "query my{getClients{clientCode clientName countryCode}}",
    }),
  };

  // console.log(allUserData);
  // console.log(dataSentBack);

  // useEffect(() => {
  //   Mihai();
  // }, []);

  // const Mihai = async () => {
  //   const url =
  //     "https://ozp4tuy4hbdoddehrwuitnhnmm.appsync-api.eu-west-1.amazonaws.com/graphql";
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `${allUserData}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: "query my { getClients{ ClientCode ClientCountry ClientName }}",
  //     }),
  //   });
  //   const dataManipulated = await response.json();

  //   console.log(dataManipulated);
  //   // setClientData(["dataManipulated"]);
  // };
  // // setClientData(["dataManipulated"]);
  // console.log(clientData);

  return (
    <ClientContext.Provider value={{ clientData }}>
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientContext;

// const Mihai = async () => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   const url =
//     "https://ogqyygcsrnfuhogp222u6btqtm.appsync-api.eu-west-1.amazonaws.com/graphql";
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "x-api-key": "da2-heauk73ukbbe3atd33tv22bd4y",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: "query my{getClients{clientCode clientName countryCode}}",
//     }),
//   });
//   const dataManipulated = await response.json();

//   return dataManipulated;
// };

// export default Mihai;
