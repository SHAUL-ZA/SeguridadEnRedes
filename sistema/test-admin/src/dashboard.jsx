// in src/Dashboard.tsx
import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Button, Container, Box } from "@mui/material";

export const Dashboard = () => (
  <div>
    <Card>
      <CardHeader title="Bienvenido a la CHAMBA" />
      <CardContent>Texto cool</CardContent>
    </Card>
    <div>
      <iframe style={{background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="640" height="480" src="https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=65286dbc-d2f6-4a72-833e-44503f504474&maxDataAge=300&theme=light&autoRefresh=true"></iframe>
      <iframe style={{background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="640" height="480" src="https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=652876ac-98b4-4b33-8084-0c1f4a27bdcb&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
      <iframe style={{background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="640" height="480" src="https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=65288899-576e-40d0-8f51-0bb2771a5ab3&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
      <iframe style={{background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="640" height="480" src="https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=65288cf2-1b7b-4136-8420-3fbf23d29239&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
      <iframe style={{background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="640" height="480" src="https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=6528d2e6-f256-4266-8b8f-b3bc6dce7f87&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
      
    </div>
  </div>
  
);



