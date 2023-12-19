import ACTIONS from "./actions";

const evaluate = (state) => {
    let {lastOperand, operation, currentOperand} = state;
    let a = parseFloat(lastOperand);
    let b = parseFloat(currentOperand);
    let ope = operation;
    let ans = "";
    switch(ope){
        case "+":
            ans = a + b;
            break;
        case "-":
            ans = a - b;
            break;
        case "×":
            ans = a * b;
            break;
        case "÷":
            if (b === 0){
                ans = 0;
            }
            ans = parseFloat(a / b);
            break;
        default:
            break;
    }
    return ans.toString();
}

const reducer = (state = {
    currentOperand: "0",
    lastOperand: "",
    operation: "",
    overwrite: false
}, action) => {
    switch(action.type) {
        case (ACTIONS.ADD_DIGIT):
            if (state.overwrite && action.digit !== "."){
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false
                }
            }
            if(state.overwrite && action.digit === "."){
                return {
                    ...state,
                    currentOperand: "0" + action.digit,
                    overwrite: false
                }
            }
            if(state.currentOperand === "0" && action.digit !== "."){
                return {
                    ...state,
                    currentOperand: action.digit
                }
            }
            if(action.digit === '.' && state.currentOperand.includes('.')){
                return state;
            }
            if(action.digit === '.' && state.currentOperand === ""){
                return {
                    ...state,
                    currentOperand: "0" + action.digit
                }
            }
            return {
                ...state, 
                currentOperand: state.currentOperand + action.digit
            }
        case (ACTIONS.DELETE_DIGIT):
            if (state.overwrite){
                return {
                    ...state,
                    currentOperand: "0",
                    overwrite: false
                }
            }
            if(state.currentOperand === ""){
                return state;
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case (ACTIONS.CHOOSE_OPERATION):
            if(state.lastOperand === "" && state.currentOperand === ""){
                return state;
            }
            if(state.lastOperand === ""){
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.operation,
                    currentOperand: ""
                }
            }
            if(state.currentOperand === ""){
                return {
                    ...state,
                    operation: action.operation
                }
            }
            return {
                ...state,
                lastOperand: evaluate(state),
                operation: action.operation,
                currentOperand: ""
            }
        case(ACTIONS.CLEAR):
            return {
                ...state,
                lastOperand: "",
                operation: "",
                currentOperand: ""
            }
        case(ACTIONS.EVALUATE):
            if(state.currentOperand === "" || state.operation === "" || state.lastOperand === ""){
                return state;
            }
            return {
                ...state,
                lastOperand: "",
                operation: "",
                currentOperand: evaluate(state),
                overwrite: true
            }
        default:
            return state;
    }
};

export default reducer;