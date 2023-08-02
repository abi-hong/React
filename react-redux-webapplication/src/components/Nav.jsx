import React, { Component } from 'react';

export default class Nav extends Component {
    // connect()를 통해 data라는 이름의 props를 받게 되고 그 정보 이용
    render() {
        const tags = [];
        for (let i=0; i<this.props.data.length; i++) {
            let d = this.props.data[i];
            tags.push(
            <li key={d.id}>
                <a href="#" data-id={d.id} onClick={function(e){
                this.props.onClick(Number(e.target.dataset.id));
            }.bind(this)}>{d.title}</a></li>);
        }
        return (
            <nav>
                <ol>
                    {tags}
                </ol>
            </nav>
        )
    }
}