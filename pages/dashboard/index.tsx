import moment from "moment";
import React from "react";
import {
  BiDollar,
  BiRightArrowAlt,
  BiTrendingDown,
  BiTrendingUp,
} from "react-icons/bi";
import { useQuery } from "react-query";
import { getUserById } from "~/api/user.api";
import BalanceCard from "~/components/BalanceCard";
import BalanceGrid from "~/components/BalanceGrid";
import Box from "~/components/Box";
import DashboardRequests from "~/components/DashboardRequests";

import Flex from "~/components/Flex";
import Grid from "~/components/Grid";
import HistoryGroup from "~/components/HistoryGroup";
import IconButton from "~/components/IconButton";
import NoOperationsState from "~/components/NoOperationsState";
import QuickTransferForm from "~/components/QuickTransferForm";
import Typography from "~/components/Typography";
import { useAuth } from "~/hooks/authHook";
import { useBalanceCalculation } from "~/hooks/monthBalanceCalculation";
import { getOperationGroups } from "~/utils/getTransactionGroups";
import { usdFormatter } from "~/utils/usdFormatter";
import { TopDasboard } from "./styles";

const Dashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery("userdashboard", () =>
    getUserById(user!.id)
  );

  if (isLoading || user === undefined || data === undefined)
    return "Loading...";

  const result = data.data;

  const { income, spends } = useBalanceCalculation(
    result.operationHistory,
    user.email
  );

  const operations = getOperationGroups(result.operationHistory.slice(0, 10));

  const getGroupDate = (date: Date) => {
    const now = moment();
    const momentDate = moment(date);

    if (now.day() === momentDate.day() && now.month() === momentDate.month()) {
      return "Hoy";
    }

    if (
      now.day() - 1 === momentDate.day() &&
      now.month() === momentDate.month()
    ) {
      return "Ayer";
    }

    return `${momentDate.day()} de ${momentDate.month()}`;
  };

  return (
    <div>
      <TopDasboard>
        <Typography size="title" css={{ mb: 28 }}>
          Resumen
        </Typography>
        <BalanceGrid>
          <BalanceCard
            title="Saldo Actual"
            balance={usdFormatter.format(result!.balance)}
            icon={BiDollar}
          />
          <BalanceCard
            title="Ingreso Mensual"
            balance={usdFormatter.format(income)}
            icon={BiTrendingUp}
            color="green"
          />
          <BalanceCard
            title="Gasto Mensual"
            balance={usdFormatter.format(spends)}
            icon={BiTrendingDown}
            color="red"
          />
        </BalanceGrid>
      </TopDasboard>

      <Grid
        css={{
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          "@lg": { gridTemplateColumns: "1fr 1fr 1fr" },
        }}
      >
        <Grid css={{ "@lg": { gridColumnEnd: 3, gridColumnStart: 1 } }}>
          <Box css={{ width: "$full" }}>
            <Flex justify="between" align="center" css={{ mb: 54 }}>
              <Typography size="title">Historial de movimientos</Typography>
              <IconButton>
                <BiRightArrowAlt />
              </IconButton>
            </Flex>
            {result?.operationHistory.length === 0 && <NoOperationsState />}
            {result!.operationHistory.length > 0 &&
              operations.map((item) => (
                <HistoryGroup
                  date={getGroupDate(item.date)}
                  items={item.Operations}
                  key={Math.random() + ""}
                />
              ))}
          </Box>
        </Grid>

        <Flex as="aside" direction="column" css={{ gap: 48, mb: 14 }}>
          <QuickTransferForm refetchDashboard={refetch} />
          <DashboardRequests
            requests={result?.requests}
            refetchRequests={refetch}
          />
        </Flex>
      </Grid>
    </div>
  );
};

export default Dashboard;
