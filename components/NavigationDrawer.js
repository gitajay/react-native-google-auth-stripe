import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import DefaultDrawer from './Drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

export default class NavigationDrawer extends Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="displace"
                content={<DefaultDrawer />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                styles={drawerStyles}
                tweenHandler={(ratio) => {
                  return {
                    mainOverlay: { opacity: ratio === 0 ? 0 : 0.3, backgroundColor: '#000' }
                  }
                }}
                // tweenHandler={Drawer.tweenPresets.parallax}
                >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}

const drawerStyles = {
    drawer: {
        shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 1
    },
    main: { paddingLeft: 0 }
}