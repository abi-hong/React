import { createStore } from 'redux';

const initState = {
    mode: 'WELCOME',
    welcome_content: {
        title: 'WEB',
        desc: 'Hello, WEB'
    },
    selected_content_id: 1,
    max_content_id: 3,
    contents: [
        { id: 1, title: 'HTML', desc: 'HTML is ...'},
        { id: 2, title: 'CSS', desc: 'CSS is ...'},
        { id: 3, title: 'JS', desc: 'JS is ...'},
    ]
}

function reducer(state=initState, action) {
    if (action.type === 'WELCOME') {
        return {...state, mode: 'WELCOME' };
    }
    if (action.type === 'READ') {
        return {...state, mode: 'READ', selected_content_id: action.id };
    }
    if (action.type === 'CREATE') {
        return {...state, mode: 'CREATE' };
    }
    if (action.type === 'CREATE_PROCESS') {
        let newId =  state.max_content_id + 1;
        let newContents = [
            ...state.contents,
            { 
                id: newId, 
                title: action.title,
                desc: action.desc
            }
        ];
        return {
            ...state,
            contents: newContents,
            max_content_id: newId
        }
    } 
    if (action.type === 'UPDATE') {
        return { ...state, mode: 'UPDATE' };
    }
    if (action.type === 'UPDATE_PROCESS') {
        let newContents = [
            ...state.contents
        ];
        for(let i=0; i<newContents.length; i++) {
            if(newContents[i].id === action.id) {
                newContents[i].title = action.title;
                newContents[i].desc = action.desc;
            }
        }
        return {
            ...state,
            contents: newContents,
            mode: 'READ',
            selected_content_id: action.id
        }
    }
    return state;
}

export default createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);