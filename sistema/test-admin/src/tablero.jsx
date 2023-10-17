import React, { useState } from "react";
import { Card, CardContent, CardHeader, Box } from "@mui/material";
import { Typography, Tabs, Tab } from "@mui/material";

export const Tablero = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabs = [
    {
      label: "Clasificación de Tickets",
      url:
        "https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=65286dbc-d2f6-4a72-833e-44503f504474&maxDataAge=300&theme=light&autoRefresh=true",
    },
    {
      label: "Prioridad de Incidencias",
      url:
        "https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=652876ac-98b4-4b33-8084-0c1f4a27bdcb&maxDataAge=3600&theme=light&autoRefresh=true",
    },
    {
      label: "Reporte de Estado",
      url:
        "https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=65288899-576e-40d0-8f51-0bb2771a5ab3&maxDataAge=3600&theme=light&autoRefresh=true",
    },
    {
      label: "Categoría de Incidencias",
      url:
        "https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=65288cf2-1b7b-4136-8420-3fbf23d29239&maxDataAge=3600&theme=light&autoRefresh=true",
    },
    {
      label: "Tickets por Usuario",
      url:
        "https://charts.mongodb.com/charts-ticketsdb-topvn/embed/charts?id=6528d2e6-f256-4266-8b8f-b3bc6dce7f87&maxDataAge=3600&theme=light&autoRefresh=true",
    },
  ];

  return (
    <div>
      <Card>
        <CardHeader title="¡Bienvenid@ al Sistema de Por México Fundación!"/>
        <CardContent style={{fontSize: "20px"}}>
        <i>
          Aquí encontrarás gráficas informativas que representan datos importantes sobre nuestro sistema. 
          Cada pestaña corresponde a una gráfica distinta con título y subtítulo. 
          Explora estas visualizaciones para obtener información en tiempo real sobre el rendimiento del sistema y tomar decisiones fundamentadas.
        </i>

        </CardContent>
      </Card>
      <Box>
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab label={tab.label} key={index} />
          ))}
        </Tabs>
        {tabs.map((tab, index) => (
          <Box
            key={index}
            role="tabpanel"
            hidden={activeTab !== index}
          >
            {activeTab === index && (
              <iframe
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: "2px",
                  boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                }}
                width="100%"
                height="600"
                src={tab.url}
              ></iframe>
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
};


