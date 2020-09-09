import * as types from './../constants/ActionTypes'

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
};
export const saveCustomer = (customer) => {
    return {
        type: types.SAVE_CUSTOMER,
        customer
    }
};

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM,
    }
};
export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
};
export const openForm = () => {
    return {
        type: types.OPEN_FORM,
    }
};

export const deleteCustomer = (customer) => {
    return {
        type: types.DELETE_CUSTOMER,
        customer
    }
};
export const editCustomer = (customer) => {
    return {
        type: types.EDIT_CUSTOMER,
        customer
    }
};

export const search = (keyword) => {
    return {
        type: types.SEARCH_NAME,
        keyword
    }
};

export const sortCustomer = (sort) => {
    return {
        type: types.SORT,
        sort
    }
};


