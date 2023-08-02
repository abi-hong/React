import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        return (
            <header>
                <h1><a href="#welcome" onClick={function() { 
                    // 이 컴포넌트의 props로 전달된 onClick을 호출시킴
                    this.props.onClick();
                }.bind(this)}>WEB</a></h1>
                World Wide WEB
            </header>
        )
    }
}

export default connect(
    null, 
    function(dispatch) {
        return {
            onClick: function () {
                dispatch({ type: 'CHANGE_MODE', mode: 'WELCOME' });
            }
        }
    }
)(Header);