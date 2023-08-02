import Article from '../components/Article';
import { connect } from 'react-redux';

export default connect(
    function(state) {
        let title, desc;
        if(state.mode === 'WELCOME') {
            title = state.welcome_content.title;
            desc = state.welcome_content.desc;
        } else {
            for (let i=0; i < state.contents.length; i++) {
                let d = state.contents[i];
                if (d.id === state.selected_content_id) {
                    title = d.title;
                    desc = d.desc;
                    break;
                }
            }
        }
        return {
            title: title,
            desc: desc
        }
    },
    null
)(Article);