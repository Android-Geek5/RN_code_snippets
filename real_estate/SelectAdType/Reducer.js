import { Types } from '../Types'

const INITIAL_STATE = {
    [Types.SELECT_AD_TYPE_FORM_KEY]: {
        [Types.SELECT_AD_TYPE_FORM_SEARCH_TYPE]: "",
        [Types.SELECT_AD_TYPE_FORM_SCREEN_NAME]: ""
    }
};

export default function appReducers(state = INITIAL_STATE, action) {

    switch (action.type) {
        case Types.UPDATE_SELECT_AD_TYPE_FORM:
            return ({
                ...state,
                [Types.SELECT_AD_TYPE_FORM_KEY]: Object.assign({}, action.payload)
            })
        default:
            return state;
    }
}