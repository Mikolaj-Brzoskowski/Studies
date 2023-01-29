import { ADD_ITEM } from "../actions/actions";

const initState = [
    {id: 1, name: 'jan',
    surname: 'kowalski',
    item: 'console',
    }, 
    {id: 2, name: 'stefan',
    surname: 'wyrzyński',
    item: 'bike',
    }, 
    {id: 3, name: 'mikołaj',
    surname: 'jagieło',
    item: 'glasses',
    },
    {id: 4, name: 'ewa',
    surname: 'wachowicz',
    item: 'knife',
    },
    {id:5, name: 'ola',
    surname: 'mickiewicz',
    item: 'book',
    }
]

export const Reducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            const copy = [...state]
            const index = copy.findIndex(el => el.id == action.id)
            copy[index] = {...copy[index], second_item: {...action.payload} }
            return [...copy]
        default:
            return state;
    }
}