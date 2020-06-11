import React, { Component, useState, StrictMode } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import * as ReactDOM from 'react-router-dom';
import ClickOutside from './ClickOutSide';

export default class AppSideBarComponent extends Component {
    state = {
        expanded: false
    }

    render() {
        return (
            <div>
                <ClickOutside
                    onClickOutside={() => {
                        this.setState({ expanded: false })
                    }}
                >
                    <SideNav style={{ 'backgroundColor': '#1565c0' }}
                        expanded={this.state.expanded}
                        onToggle={(_expanded) => {
                            this.setState({ expanded: _expanded })
                        }}
                        onSelect={(selected) => {
                            // const to = '/' + selected;
                            // if (location.pathname !== to) {
                            //     history.push(to);
                            // }
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
}