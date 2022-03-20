import React from "react";
import { styled } from "~/stitches.config";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const StyledAvatar = styled(AvatarPrimitive.Root, {
  height: 34,
  width: 34,
  borderRadius: 4,
  overflow: "hidden",
});

export const AvatarImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  background: "$main100",
  color: "$main700",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  fontWeight: 700,
  border: "1px solid $main200",
});

interface IProps {
  image?: string;
  firstName: string;
  lastName: string;
  css?: any;
}

const Avatar = ({ image, firstName, lastName, ...rest }: IProps) => {
  return (
    <StyledAvatar {...rest}>
      <AvatarImage src={image} />
      <AvatarFallback>
        {firstName.charAt(0)}
        {lastName.charAt(0)}
      </AvatarFallback>
    </StyledAvatar>
  );
};

export default Avatar;
