'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.types = exports.uiState = exports.uiStateReducer = undefined;
exports.generateName = generateName;
exports.generateType = generateType;
exports.generateResetUiState = generateResetUiState;
exports.generateSetUiState = generateSetUiState;
exports.dispatchToProps = dispatchToProps;
exports.stateToProps = stateToProps;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _hoc = require('./hoc');

var _hoc2 = _interopRequireDefault(_hoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.uiStateReducer = _reducer2.default;
exports.uiState = _hoc2.default;
var types = exports.types = {
    add: 'UI_STATE_ADD',
    delete: 'UI_STATE_DELETE',
    reset: 'UI_STATE_RESET',
    set: 'UI_STATE_SET'
};

function generateName() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return (name || 'component') + '_' + (0, _v2.default)();
}

function generateType(type, name) {
    return type + ':' + name;
}

function generateResetUiState(reset, name, state) {
    return function resetUiState(cb) {
        var resetState = reset(state, name);

        // optional callback
        if (cb) {
            return cb(resetState.payload.state);
        }

        return resetState.payload.state;
    };
}

function generateSetUiState(set, name) {
    return function setUiState(state, cb) {
        var updatedState = set(state, name);

        // optional callback to match setState API
        if (cb) {
            return cb(updatedState.payload.state);
        }

        return updatedState.payload.state;
    };
}

// these are set as props on the HOC
function dispatchToProps(dispatch) {
    return {
        add: function add() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var name = arguments[1];

            return dispatch({
                type: generateType(types.add, name),
                payload: {
                    name: name,
                    state: state
                }
            });
        },
        delete: function _delete(name) {
            return dispatch({
                type: generateType(types.delete, name),
                payload: {
                    name: name
                }
            });
        },
        reset: function reset() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var name = arguments[1];

            return dispatch({
                type: generateType(types.reset, name),
                payload: {
                    name: name,
                    state: state
                }
            });
        },
        set: function set() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var name = arguments[1];

            return dispatch({
                type: generateType(types.set, name),
                payload: {
                    name: name,
                    state: state
                }
            });
        }
    };
}

function stateToProps(state) {
    return {
        uiState: state.uiState
    };
}