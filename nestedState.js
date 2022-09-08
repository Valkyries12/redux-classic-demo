const redux =  require("redux");
const produce = require("immer").produce;



const initialState = {
    name: "Vishmas",
    address: {
        street: "123 main st",
        city: "Boston",
        state: "MA",
    },
};

const STREET_UPDATED = "STREET_UPDATED";
const updatedStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
};


//si tengo un estado anidado debo hacer una copia con ese estado anidaado y es medio quilombo
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            //En vez de modificar estados anidados con spread operator, voy a utilizar la libreria immer
            // que me permite lograr exactamente lo mismo pero de una maner mas clara modificando directamente y no spreadeando cada anidacion
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     },
            // }  
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }
            
    }
}

const store = redux.createStore(reducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {
    console.log("Updated state", store.getState());
});
store.dispatch(updatedStreet("456 main st"));
unsubscribe();
