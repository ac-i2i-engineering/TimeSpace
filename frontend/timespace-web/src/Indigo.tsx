import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";

const Indigo = () => {
   const { isLoading, data, error, refetch } = useQuery({
      queryKey: ["invokeIndigo"],
      queryFn: async () => {
         const response = await fetch(
            "http://localhost:3000/invokeIndigo?" + new URLSearchParams({ userId: "gLVb6TPACjNIy5KsT3mj", message: "Invoke." }).toString()
         );
         return await response.text();
      },
      staleTime: Infinity,
   });
   return (
      <div className="card indigo-card">
         <h1>Hi, I'm Indigo!</h1>
         {/* <img src="timespace.png" height="200px" style={{ margin: "2rem" }} /> */}
         <div style={{ textAlign: "left" }}>
            <ReactMarkdown>{isLoading ? "Loading..." : data}</ReactMarkdown>
         </div>
      </div>
   );
};

export default Indigo;
