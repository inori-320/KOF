import React, { Component } from 'react';
import Base from './base';
import { connect } from 'react-redux';
import Digitbtn from './calculator/digitbtn';
import ACTIONS from '../redux/actions';
import OperationBtn from './calculator/operationbtn';

class Calculator extends Component {
    state = {
        formater: Intl.NumberFormat('en-us')
    };

    format = (number) => {
        if (number === "") return "";
        const [integer, decimal] = number.split(".");
        if(decimal === undefined){
            return this.state.formater.format(integer);
        }
        return `${this.state.formater.format(integer)}.${decimal}`;
    };

    render() { 
        return (
            <React.Fragment>
                <Base>
                    <div className='calculator'>
                        <div className="output">
                            <div className="last-output">
                                {this.format(this.props.lastOperand)} {this.props.operation}
                            </div>
                            <div className="current-output">
                                {this.format(this.props.currentOperand)}
                            </div>
                        </div>
                        <div className="input">
                            <button onClick={this.props.clear} className='deep_color'>AC</button>
                            <button className='deep_color'>x^2</button>
                            <button onClick={this.props.delete_digit} className='deep_color'>Del</button>
                            <OperationBtn operation={"÷"} />
                            <Digitbtn digit={"7"} />
                            <Digitbtn digit={"8"} />
                            <Digitbtn digit={"9"} />
                            <OperationBtn operation={"×"} />
                            <Digitbtn digit={"4"} />
                            <Digitbtn digit={"5"} />
                            <Digitbtn digit={"6"} />
                            <OperationBtn operation={"-"} />
                            <Digitbtn digit={"1"} />
                            <Digitbtn digit={"2"} />
                            <Digitbtn digit={"3"} />
                            <OperationBtn operation={"+"} />
                            <button className='common'>+/-</button>
                            <Digitbtn digit={"0"} />
                            <Digitbtn digit={"."} />
                            <button onClick={this.props.evaluate} id='equal'>=</button>
                        </div>
                    </div>
                </Base>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentOperand: state.currentOperand,
        lastOperand: state.lastOperand,
        operation: state.operation
    }
};

const mapDispatchToProps = {
    delete_digit: () => {
        return {
            type: ACTIONS.DELETE_DIGIT
        }
    },
    clear: () => {
        return {
            type:ACTIONS.CLEAR
        }
    },
    evaluate: () => {
        return {
            type: ACTIONS.EVALUATE
        }
    }
};

 
export default connect(mapStateToProps, mapDispatchToProps)(Calculator);