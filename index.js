const redux =  require("redux");
const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDER = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDER = "ICECREAM_ORDERED";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCKED";

function orderCake() {
    return {
        type: CAKE_ORDER,
        payload: 1
    }
};

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDER,
        payload: qty
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty
    }
}

//se deja de usar un estado inicial con las dos propiedades para hacer un estado inicial por cada propiedad
// const initialState = {
//     numOfCakes: 10,
//     numOfIcecreams: 20,
// };
// (previousState, action) => newStaate

const initialCakeState = {
    numOfCakes: 10
};

const initialIcecreamState = {
    numOfIcecreams: 20
};

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case "CAKE_ORDERED":
            return {
                ...state,
                numOfCakes: state.numOfCakes -1
            };
        case "CAKE_RESTOCKED":
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
    
        default:
            return state;
    }
}

const IcecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
       
        case "ICECREAM_ORDERED":
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams -1
            };
        case "ICECREAM_RESTOCKED":
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams + action.payload
            }
    
        default:
            return state;
    }
}


// se deja de usar un reducer para manejar todos los estados para separar y tener un reducer por caada propiedd de estado
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "CAKE_ORDERED":
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes -1
//             };
//         case "CAKE_RESTOCKED":
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes + action.payload
//             }
//         case "ICECREAM_ORDER":
//             return {
//                 ...state,
//                 numOfIcecreams: state.numOfIcecreams -1
//             };
//         case "ICECREAM_RESTOCKED":
//             return {
//                 ...state,
//                 numOfIcecreams: state.numOfIcecreams + action.payload
//             }
    
//         default:
//             return state;
//     }
// }


//el store por defecto acepta solo 1 reducer. Al tener varios reducer se necesita combine reducers
// const store = createStore(reducer);

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: IcecreamReducer
});

//puedo poner un middleware (se usa par extender de forma personalizada algun nueva funcionalidad de redux)
//con applyMiddleware. Se pasa dentro del createStore y puede ser mas de uno
const store = createStore(rootReducer, applyMiddleware(logger));


console.log("initial state", store.getState());

// const unsubscribe = store.subscribe(() => console.log("update state", store.getState()));

//Logger es una biblioteca donde me logea cada cambio en el store, por eso borro el console.log con el store.getState()
//es como si fuera el redux dev tools
// action CAKE_ORDERED @ 14:22:19.321
// prev state { cake: { numOfCakes: 10 }, iceCream: { numOfIcecreams: 20 } }
// action     { type: 'CAKE_ORDERED', payload: 1 }
// next state { cake: { numOfCakes: 9 }, iceCream: { numOfIcecreams: 20 } }
const unsubscribe = store.subscribe(() => {});

// en ve de llamar asi se pueden bindear con bindActionCreator
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));
// store.dispatch(restockCake(4));
// store.dispatch(restockCake(5));

const actions = bindActionCreator({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch);
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3);
actions.restockCake(4);
actions.restockCake(5);
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(2);
actions.restockIcecream(2);
actions.restockIcecream(2);

unsubscribe();
