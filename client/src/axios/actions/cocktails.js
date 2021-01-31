import axios from 'axios'
import { base } from './../../components/baseUrl'

export const post = (data) => async dispatch => {
    try {

        const response = await axios.post(`${base}/api/cocktails`, data);
        return response;

    } catch (error) {
        throw error;
    }

};
export const search = (data) => async dispatch => {
    try {

        const response = await axios.post(`${base}/api/cocktails/search?word=${data}`);
        const payload = response.data.Cock
        await dispatch({ type: 'SEARCH_RESULTS', payload })
        return payload;

    } catch (error) {
        throw error;
    }

};
export const fetchcustom = () => async dispatch => {
    try {
        const response = await axios.get(`${base}/api/cocktails`);
        let payload = response.data.Cocks
        await dispatch({ type: 'FETCH_CUSTOM_COCKTAILS', payload })
        return payload;


    } catch (error) {

        throw error;
    }

};
export const fetch = () => async dispatch => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b`);
        let payload = response.data.drinks
        await dispatch({ type: 'FETCH_COCKTAILS', payload })
        return payload;

    } catch (error) {

        // alert(error)
        throw error;
    }

};
export const fetchsinglecocktaile = (id) => async dispatch => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        let payload = response.data.drinks[0]
        await dispatch({ type: 'FETCH_COCKTAIL', payload })

        return payload;

    } catch (error) {

        // alert(error)
        throw error;
    }

};

export const fetchrandomcocktaile = () => async dispatch => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        let payload = response.data.drinks[0]
        console.log(payload)

        await dispatch({ type: 'FETCH_COCKTAIL', payload })
        return payload;

    } catch (error) {

        // alert(error)
        throw error;
    }

};

