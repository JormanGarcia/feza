import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleRequest } from "~/api/requests";
import { useAuth } from "~/hooks/authHook";
import { useToast } from "~/stores/toastStore";
import { Request } from "~/types/requests.type";
import { getIssuer } from "~/utils/getIssuer";
import { usdFormatter } from "~/utils/usdFormatter";
import Button from "../Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../Dialog";
import Flex from "../Flex";
import PaymentRequest from "../PaymentRequest";
import Typography from "../Typography";
import WithoutRequests from "../WithoutRequests";

interface IProps {
  requests: Request[];
  refetchRequests: () => void;
}

const DashboardRequests = ({ requests, refetchRequests }: IProps) => {
  const [request, setRequest] = useState<Request | null>(null);
  const { user } = useAuth();
  const toast = useToast();

  const { mutate } = useMutation(
    "handle-request",
    (props: { id: string; action: "pay" | "reject" }) =>
      handleRequest(props.id, props.action),
    {
      onError: (error: any) => {
        console.log(error.status, "error");

        toast.open({
          description: "Algo ha salido mal. por favor vuelve a intentar",
          title: "Operacion Incompleta",
          type: "error",
        });
      },
    }
  );

  const onHandleRequest = async (action: "pay" | "reject") => {
    if (request === null) return;

    await mutate({ id: request.id, action });

    setRequest(null);
    await refetchRequests();
  };

  function prepareRequests(requests: Request[]) {
    if (!user) return [];

    return requests.filter((item) => item.issuer !== user.email);
  }

  const data = prepareRequests(requests);

  return (
    <section>
      <Typography size="title" css={{ mb: 32 }}>
        Solicitudes de pago
      </Typography>

      {data.length === 0 && <WithoutRequests />}

      {data.length > 0 && (
        <Flex direction="column" css={{ gap: 20 }}>
          {data.map((item) => {
            const issuer = getIssuer(item);

            return (
              <PaymentRequest
                key={item.id}
                amount={item.amount}
                date={item.creationDate}
                firstName={issuer.firstName}
                lastName={issuer.lastName}
                onSelect={() => setRequest(item)}
              />
            );
          })}
        </Flex>
      )}

      <Dialog open={request !== null} onOpenChange={() => setRequest(null)}>
        {request && (
          <DialogContent css={{ maxWidth: 520 }}>
            <DialogTitle>Solicitud de pago</DialogTitle>
            <DialogDescription>
              <b>
                {getIssuer(request).firstName} {getIssuer(request).lastName}
              </b>{" "}
              te solicita un pago por el monto de{" "}
              <b>{usdFormatter.format(request.amount)}USD</b>. ¿Deseas aceptar
              su solicitud?. Ten en cuenta que una vez la solicitud sea aceptada
              tus fondos seran transferidos a su cuenta de manera inmediata
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="warning"
                onClick={() => onHandleRequest("reject")}
              >
                Rechazar
              </Button>
              <Button onClick={() => onHandleRequest("pay")}>Pagar</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default DashboardRequests;
