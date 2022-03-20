import React from "react";
import { BiLogOut, BiLogOutCircle, BiSupport } from "react-icons/bi";
import { useAuth } from "~/hooks/authHook";
import Avatar from "../Avatar";
import {
  AvatarContainer,
  ChevronIcon,
  MenuPopover,
  PopoverContent,
  PopoverItem,
  PopoverItemIcon,
  PopoverItemList,
  PopoverItemTitle,
  PopoverTrigger,
} from "./styles";

interface IProps {
  onLogout: () => void;
}

const ProfileMenu: React.FC<IProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <MenuPopover>
      <PopoverTrigger asChild>
        {user && (
          <AvatarContainer as="button">
            <Avatar
              image="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              firstName={user.firstName}
              lastName={user.lastName}
            />
            <ChevronIcon />
          </AvatarContainer>
        )}
      </PopoverTrigger>

      <PopoverContent sideOffset={40}>
        <PopoverItemList>
          <PopoverItem>
            <PopoverItemTitle>Soporte</PopoverItemTitle>
            <PopoverItemIcon as={BiSupport} />
          </PopoverItem>

          <PopoverItem
            onClick={onLogout}
            css={{
              "&:hover": {
                color: "$red700",
                background: "$red100",
              },
            }}
          >
            <PopoverItemTitle>Cerrar Sesion</PopoverItemTitle>
            <PopoverItemIcon as={BiLogOutCircle} />
          </PopoverItem>
        </PopoverItemList>
      </PopoverContent>
    </MenuPopover>
  );
};

export default ProfileMenu;
