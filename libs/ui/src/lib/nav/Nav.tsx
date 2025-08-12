import { NavButton } from "./NavButton";
import { navItems } from ".";
import styled from "styled-components";
import { NavButtonCollapsed } from "./NavButtonCollapsed";
import React from "react";
const StyledNav = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`
const Nav = React.memo(function Nav({ collapsed = false }: { collapsed?: boolean }) {
    return <StyledNav>
        {navItems.map(({ label, route, icon }, index) => collapsed ? <NavButtonCollapsed key={index} label={label} route={route} icon={icon} />
            : <NavButton key={index} label={label} route={route} icon={icon} />)}
    </StyledNav>
})
export default Nav;