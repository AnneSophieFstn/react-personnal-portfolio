import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import Logo from "@components/logo";
import MainMenu from "@components/main-menu";
import PopupMenu from "@components/popup-menu";
import BurgerButton from "@ui/burger-button";
import Button from "@ui/button";
import { useSticky, useOffcanvas } from "@hooks";
import { ImageType, ButtonType, MenuType, SocialType } from "@utils/types";
import Icon from "../../../components/ui/icon";

const Header = ({ className, data }) => {
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();

    /* TEST SWITCH THEME MODE */
    const [isLightTheme, setIsLightTheme] = useState(false); // Par défaut, sombre

    const handleThemeSwitch = () => {
        setIsLightTheme((prevTheme) => !prevTheme); // Inverse l'état
        const body = document.body;
        if (!isLightTheme) {
            body.classList.add("white-version"); // Ajoute la classe pour le thème clair
        } else {
            body.classList.remove("white-version"); // Retire la classe pour revenir au thème sombre
        }
    };

    return (
        <>
            <header
                className={cn(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="header-wrapper rn-popup-mobile-menu m--0">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-6">
                            <div className="header-left">
                                {data?.logo?.[0]?.src && (
                                    <Logo
                                        image={data.logo[0]}
                                        className="light-logo br-5"
                                    />
                                )}
                                {data?.logo?.[1]?.src && (
                                    <Logo
                                        image={data.logo[1]}
                                        className="dark-logo br-5"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="col-lg-10 col-6">
                            <div className="header-center">
                                {data?.menu && (
                                    <MainMenu
                                        className="d-none d-xl-block"
                                        menus={data.menu}
                                    />
                                )}
                                <div className="header-right">
                                    <a
                                        href="#"
                                        onClick={handleThemeSwitch}
                                        style={{
                                            height: "33px",
                                            paddingRight: "15px",
                                        }}
                                    >
                                        {isLightTheme ? (
                                            <Icon name="Sun" />
                                        ) : (
                                            <Icon name="Moon" />
                                        )}
                                    </a>

                                    <BurgerButton
                                        className="d-block d-xl-none"
                                        onClick={offcanvasHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <PopupMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menus={data?.menu}
                socials={data?.socials}
                slogan={data?.slogan}
                logo={data?.logo?.[1]}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        logo: PropTypes.arrayOf(PropTypes.shape(ImageType)),
        button: PropTypes.shape(ButtonType),
        menu: PropTypes.arrayOf(PropTypes.shape(MenuType)),
        socials: PropTypes.arrayOf(PropTypes.shape(SocialType)),
        slogan: PropTypes.string,
    }),
};

export default Header;
