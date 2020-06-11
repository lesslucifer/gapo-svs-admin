import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useHistory, useLocation } from 'react-router-dom';

export default function AppSideBarComponent() {
    let history = useHistory();
    let location = useLocation();

    return (
        <SideNav
            onSelect={(selected) => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                    history.push(to);
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Charts
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            Line Chart
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            Bar Chart
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>)
}