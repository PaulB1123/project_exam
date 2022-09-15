import { useState, useEffect, createContext } from "react";
import { isPropertySignature } from "typescript";

const ClientContext = createContext({
  clientData: [] as any[],
});

export const ClientContextProvider = (props: any) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [clientData, setClientData] = useState([] as any[]);

  useEffect(() => {
    Mihai();
  }, []);

  const Mihai = async () => {
    const url =
      "https://ogqyygcsrnfuhogp222u6btqtm.appsync-api.eu-west-1.amazonaws.com/graphql";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": "da2-heauk73ukbbe3atd33tv22bd4y",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "query my{getClients{clientCode clientName countryCode}}",
      }),
    });
    const dataManipulated = await response.json();

    setClientData(["dataManipulated"]);
  };
  //setClientData(["dataManipulated"]);
  console.log(clientData);

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
