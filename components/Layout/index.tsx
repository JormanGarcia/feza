import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Topbar from "~/components/Tobbar";
import { usePrivateRoute } from "~/hooks/privateRoute";
import { styled } from "~/stitches.config";
import Logo from "../Logo";
import { TopbarContainer } from "../Tobbar/styles";
import { Main } from "./styles";

const LandingTopbar = styled(TopbarContainer, {
  justifyContent: "space-between",
  display: "flex",
});

const LandingNav = styled("nav", {
  display: "flex",
  gap: 24,
});

const LandingLink = styled("a", {
  textDecoration: "none",
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": {
    color: "$main500",
  },
});

const Layout: React.FC = ({ children }) => {
  const route = useRouter();

  if (route.pathname.startsWith("/dashboard")) {
    usePrivateRoute();

    return (
      <div>
        <Topbar />
        <Main>{children}</Main>
      </div>
    );
  }
  return (
    <div>
      <LandingTopbar>
        <Logo />
        <LandingNav>
          <Link href={"/login"}>
            <LandingLink>Ingresa</LandingLink>
          </Link>
          <Link href={"/signup"}>
            <LandingLink>Registrate</LandingLink>
          </Link>
        </LandingNav>
      </LandingTopbar>
      <Main>{children}</Main>;
    </div>
  );
};

export default Layout;
