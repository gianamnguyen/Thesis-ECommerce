import API from '../../configs/api';
import apiMethod from '@utility/ApiMethod';

export const getHomeData = async (codeLanguage = 'vi-VN') => {
  try {
    const { data } = await apiMethod.get(`/${codeLanguage}/${API.GET_BANNER}`);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getListPromotion = async (payload) => {
  const { data } = await apiMethod.post(API.GET_LIST_Promotion, payload)
  return data
}

export const createPromotion = async (payload) => {
  const { data } = await apiMethod.post(API.CREATE_Promotion, payload)
  return data
}

export const updatePromotion = async (payload) => {
  const {idPromotion, ...rest} = payload || {}
  const { data } = await apiMethod.put(API.UPDATE_Promotion + `/${payload?.idPromotion}`, {...rest})
  return data
}

export const getDetailPromotion = async (id) => {
  const { data } = await apiMethod.get(API.GET_DETAIL_Promotion + `/${id}`)
  return data
}

export const deletePromotion = async (id) => {
  const { data } = await apiMethod.delete(API.DELETE_Promotion + `/${id}`)
  return data
}