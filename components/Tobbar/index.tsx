import React from "react";
import Logo from "../Logo";
import { BiHistory, BiHomeAlt, BiTransferAlt, BiWallet } from "react-icons/bi";
import {
  BellIcon,
  Navigation,
  NavigationDot,
  NavigationIcon,
  NavigationIconContainer,
  ProfileContainer,
  TopbarContainer,
} from "./styles";
import { useRouter } from "next/router";
import ProfileMenu from "../ProfileMenu";
import Link from "next/link";
import { useAuth } from "~/hooks/authHook";

const Routes = [
  {
    path: "/dashboard",
    name: "Resumen",
    icon: BiHomeAlt,
  },
  {
    path: "/dashboard/operaciones",
    name: "Centro de operaciones",
    icon: BiTransferAlt,
  },
  {
    path: "/dashboard/cuentas",
    name: "Cuentas",
    icon: BiWallet,
  },
  {
    path: "/dashboard/historial",
    name: "Historial",
    icon: BiHistory,
  },
];

const DotTransition = {
  type: "spring",
  stiffness: 300,
  damping: 15,
};

const Topbar = () => {
  const { pathname, push } = useRouter();
  const auth = useAuth();

  const NavigationIcons = Routes.map(({ icon, path, name }) => {
    const isActive = path === pathname;
    return (
      <Link href={path} key={name}>
        <NavigationIconContainer>
          <NavigationIcon key={name} active={isActive} as={icon} />
          {isActive && (
            <NavigationDot layoutId="dot" transition={DotTransition} />
          )}
        </NavigationIconContainer>
      </Link>
    );
  });

  return (
    <TopbarContainer>
      <Logo />

      <Navigation>{NavigationIcons}</Navigation>

      <ProfileContainer>
        <BellIcon />
        <ProfileMenu onLogout={auth.logout} />
      </ProfileContainer>
    </TopbarContainer>
  );
};

export default Topbar;
