import { userInfo } from "os";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useMutation } from "react-query";
import { matchUserByEmail } from "~/api/user.api";
import { useAuth } from "~/hooks/authHook";
import { useDebounce } from "~/hooks/debounceHook";
import { User } from "~/types/user.type";
import Avatar from "../Avatar";
import Flex from "../Flex";
import InputRightIcon from "../InputRightIcon";
import Loader from "../Loader";
import {
  ContentContainer,
  ItemContainer,
  ItemEmail,
  ItemName,
  LoaderContainer,
  StyledContainer,
  StyledInput,
} from "./style";

export default function ({
  onValueChange,
  value,
  error,
  name,
  onBlur,
  setIsValidEmail,
}: {
  value: string;
  name?: string;
  error?: boolean;
  onValueChange: (a: string) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  setIsValidEmail: (a: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const { user } = useAuth();

  const { mutate, isLoading, isIdle } = useMutation(
    "match-email",
    matchUserByEmail,
    {
      onSuccess: (data) => {
        setData(data.data);
      },
    }
  );

  useDebounce(value, 500, () => {
    if (value === "") {
      return;
    }
    mutate(value);
  });

  function onChange(value: string) {
    onValueChange(value);
  }

  function onSelectItem(value: string) {
    onChange(value);
    setIsValidEmail(true);
  }

  const isContainerOpen = isOpen && value !== "" && !isIdle;

  const preparedData = data.filter((item) => item.email !== user!.email);

  return (
    <StyledContainer
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      css={{
        height: isContainerOpen
          ? 88.8 * preparedData.slice(0, 3).length + 43
          : 45,
      }}
      error={error}
    >
      <Flex align="center" css={{ width: "$full" }}>
        <StyledInput
          css={{ width: "$full" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          onBlur={(e) => {
            if (onBlur) {
              onBlur(e);
            }

            if (user && value === user.email) return setIsValidEmail(false);

            setIsValidEmail(
              preparedData.filter((item) => item.email === value).length === 1
            );
          }}
          name={name}
        />
        <InputRightIcon as={BiSearch} />
      </Flex>
      <ContentContainer>
        {isLoading && data.length === 0 && (
          <LoaderContainer
            css={{ scale: !isOpen ? 0.6 : 1, transition: "0.3s" }}
          >
            <Loader />
          </LoaderContainer>
        )}

        {preparedData.length !== 0 &&
          preparedData.slice(0, 3).map((item) => (
            <ItemContainer onClick={() => onSelectItem(item.email)}>
              <Avatar firstName={item.firstName} lastName={item.lastName} />
              <Flex direction={"column"}>
                <ItemName>
                  {item.firstName} {item.lastName}
                </ItemName>
                <ItemEmail>{item.email}</ItemEmail>
              </Flex>
            </ItemContainer>
          ))}
      </ContentContainer>
    </StyledContainer>
  );
}
