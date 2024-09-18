import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Calendar from "./Calendar.tsx";
import Indigo from "./Indigo.tsx";
import { TimeItem } from "./dataTypes.ts";
import { Button, Modal, Box } from "@mui/material";

const queryClient = new QueryClient();

/* const tempData: TimeItem[] = [
   {
      content: {
         title: "Set up data",
      },
      timeframe: {
         duration: 120,
         init: {
            _seconds: 1723469400,
            _nanoseconds: 0,
         },
         term: {
            _seconds: 1723471800,
            _nanoseconds: 0,
         },
      },
      status: {},
   },
   {
      content: {
         title: "Set up Indigo",
      },
      timeframe: {
         duration: 120,
         init: {
            _seconds: 1723547000,
            _nanoseconds: 0,
         },
         term: {
            _seconds: 1723552000,
            _nanoseconds: 0,
         },
      },
      status: {},
   },
]; */

const App = () => (
   <QueryClientProvider client={queryClient}>
      <SimpleRender />
   </QueryClientProvider>
);

const SimpleRender = () => {
   const { isPending, error, data } = useQuery({
      queryKey: ["repoData"],
      queryFn: async () => {
         const response = await fetch("http://localhost:3000/getData?" + new URLSearchParams({ userId: "gLVb6TPACjNIy5KsT3mj" }).toString());
         return await response.json();
      },
   });

   const [addModalOpen, setAddModalOpen] = useState(false);

   if (isPending) return "Loading...";

   if (error) return "An error has occurred: " + error.message;

   console.log(data);

   return (
      <div
         style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
         }}>
         <div style={{ flex: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
               <h1>Your TimeSpace</h1>
               <img src="timespace.png" height="52px" />
            </div>
            <Button onClick={() => setAddModalOpen(true)}>New</Button>
            <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
               <Box
                  sx={{
                     position: "absolute" as "absolute",
                     top: "50%",
                     left: "50%",
                     transform: "translate(-50%, -50%)",
                     width: 400,
                     border: "2px solid #000",
                     boxShadow: 24,
                     p: 4,
                  }}>
                  New item
               </Box>
            </Modal>

            <Calendar data={data} />
         </div>
         <Indigo />
      </div>
   );
};

export default App;
