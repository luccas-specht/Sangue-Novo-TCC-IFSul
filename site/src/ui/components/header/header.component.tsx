import { useCallback, useState, useMemo } from "react";

import {
  BsCardChecklist,
  BiNews,
  BiBookReader,
  FiPower,
  RiCalendarEventLine,
  BiDonateBlood,
} from "react-icons/all";

import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { useAuthenticated } from "../../../hooks";

import logoImg from "../../assets/images/logo.png";
import imageDefaultProfile from "../../assets/images/default_user_image.png";

import * as S from "./header.style";

type Navegation = {
  icon: JSX.Element;
  to: string;
  title?: string;
};

export const Header = () => {
  const [isOpenBurguerMenu, setIsOpenBurguerMenu] = useState<boolean>(false);
  const { push } = useHistory();
  const { user, signOut } = useAuthenticated();

  const handleOpenBurgermenu = useCallback(
    () => setIsOpenBurguerMenu(!isOpenBurguerMenu ?? true),
    [isOpenBurguerMenu]
  );

  const handleSignOut = useCallback(() => {
    signOut();
    push("/login");
  }, [signOut, push]);

  const renderDivs = useCallback(
    (number: number) => [...Array(number)].map(() => <div />),
    []
  );

  const navegations = useMemo(
    (): Navegation[] => [
      user?.user.isDonator && {
        icon: <BiDonateBlood size={20} />,
        to: "minhas-doações",
        title: "Minhas Doações",
      },
      {
        icon: <BiBookReader size={20} />,
        to: "minhas-campanhas",
        title: "Minhas Campanhas",
      },
      {
        icon: <RiCalendarEventLine size={20} />,
        to: "meus-agendamentos",
        title: "Meus Agendamentos",
      },
      {
        icon: <BsCardChecklist size={20} />,
        to: "listar-campanhas",
        title: "Listar Campanhas",
      },
      {
        icon: <BiNews size={20} />,
        to: "criar-campanha",
        title: "Criar Campanha",
      },
      {
        icon: <FiPower size={20} onClick={handleSignOut} />,
        to: "/login",
      },
    ],
    [handleSignOut, user]
  );

  return (
    <S.Container>
      <S.LogoImg src={logoImg} alt="logo sangue novo" />
      <S.Profile to="editar-perfil">
        <img
          src={user?.user?.avatar ?? imageDefaultProfile}
          alt="imagem de perfil"
        />
        <div>
          <S.WellcomeUser>Bem vindo,</S.WellcomeUser>
          <S.UserName>{user?.user?.userName}</S.UserName>
        </div>
      </S.Profile>
      <S.Burguer open={isOpenBurguerMenu} onClick={handleOpenBurgermenu}>
        {renderDivs(3)}
      </S.Burguer>
      <S.Ul open={isOpenBurguerMenu}>
        {navegations.map(({ icon, title, to }) => (
          <li>
            <Link to={to}>
              {icon}
              {title}
            </Link>
          </li>
        ))}
        {/* <FabTheme /> */}
      </S.Ul>
    </S.Container>
  );
};
