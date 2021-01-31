const initialState = {
    cocktail: {},
    cocktails: [],
    custom: [],
    loading: true
}

export default function (state = initialState, { type, payload, errors, error }) {
    switch (type) {
        case 'FETCH_COCKTAILS':
            return {
                ...state,
                cocktails: payload,
                loading: false
            }
        case 'FETCH_CUSTOM_COCKTAILS':
            return {
                ...state,
                custom: payload,
                loading: false
            }
        case 'SEARCH_RESULTS':
            return {
                ...state,
                custom: payload,
                loading: false
            }
        case 'FETCH_COCKTAIL':
            return {
                ...state,
                cocktail: payload,
                loading: false
            }

        default:
            return state;
    }
}