import React, { Component, useState, StrictMode } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import * as ReactDOM from 'react-router-dom';
import ClickOutside from './ClickOutSide';
import { Link } from 'react-router-dom';

export default class AppSideBarComponent extends Component {
    state = {
        expanded: false
    }

    props: {
        location: any;
        history: any;
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
                            const to = '/' + selected;
                            if (this.props.location.pathname !== to) {
                                this.props.history.push(to)
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
                            <NavItem eventKey="faiss">
                                <NavIcon>
                                    <i className="fa fa-fw fa-compass" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Faiss
                                </NavText>
                                <NavItem eventKey="faiss/datasets">
                                    <NavText>
                                        Datasets
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="faiss/backends">
                                    <NavText>
                                        Backends
                                    </NavText>
                                </NavItem>
                            </NavItem>
                            <NavItem eventKey="svs">
                                <NavIcon>
                                    <i className="fa fa-fw fa-play" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Suggestion Engine
                                </NavText>
                                <NavItem eventKey="svs/suggestions">
                                    <NavText>
                                        Suggestions
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="svs/distribution">
                                    <NavText>
                                        Distribution
                                    </NavText>
                                </NavItem>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                </ClickOutside>
            </div>)
    }
}