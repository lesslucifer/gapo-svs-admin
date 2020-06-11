import React, { Component, useState } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useHistory, useLocation } from 'react-router-dom';
import ClickOutside from 'react-click-outside';

export default function AppSideBarComponent() {
    let history = useHistory();
    let location = useLocation();
    let [expanded, setExpanded] = useState(false);

    return (
        <div>
            <ClickOutside
                onClickOutside={() => {
                    setExpanded(false)
                }}
            >
                <SideNav style={{ 'backgroundColor': '#1565c0' }}
                    expanded={expanded}
                    onToggle={(_expanded) => {
                        setExpanded(_expanded)
                    }}
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
                </SideNav>
            </ClickOutside>
        </div>)
}