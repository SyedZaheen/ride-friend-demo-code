import { useRouter } from "next/router";
import graphqlClient from "../../utils/graphqlClient";
import { getRouteById } from "../../graphql/queries";
import { useEffect, useState } from "react";

const route = () => {
  // const fetchData = async (id) => {
  //   const { query, variables } = getRouteById(id);
  //   const routeData = await graphqlClient.request(query, variables);
  //   setRoute(routeData);
  // };
  // const router = useRouter();
  // const { rid } = router.query;
  // const [id, setId] = useState(rid);
  // const [route, setRoute] = useState({});
  // useEffect(() => {
  //   fetchData(rid);
  // }, [id]);
  // console.log("this is that state ", route);
  return <div>hello route</div>;
};

export default route;
