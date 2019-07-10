import { Types } from '../Types';

const actions = {
    _updateFormData: (key, value) => dispatch => {
        return (
            dispatch({
                type: Types.UPDATE_SELECT_AD_TYPE_FORM,
                payload: value
            })
        )
    }
}

export default actions;