import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Box from "~/components/Box";
import {
  TabsContent,
  TabSelector,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "~/components/OperationsTabs";
import TransferRequestForm from "~/components/TranferRequestForm";
import TransferForm from "~/components/TransferForm";
import Typography from "~/components/Typography";

const Tabs = ["Transferencias", "Exchange", "Solicitud"];

const operaciones = () => {
  const [tabsValue, setTabsValue] = useState("Transferencias");

  return (
    <div>
      <Typography size="title" css={{ mb: 30 }}>
        Centro de operaciones
      </Typography>
      <TabsRoot value={tabsValue} onValueChange={setTabsValue}>
        <TabsList>
          {Tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} asChild>
              <div>
                <Box css={{ zIndex: 10000 }}>{tab}</Box>
                {tabsValue === tab && <TabSelector layoutId="tab" />}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        <AnimatePresence exitBeforeEnter>
          <TabsContent value="Transferencias" asChild>
            <TransferForm />
          </TabsContent>

          <TabsContent value="Solicitud" asChild>
            <TransferRequestForm />
          </TabsContent>
        </AnimatePresence>
      </TabsRoot>
    </div>
  );
};

export default operaciones;
