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

export const getListCategory = async (payload) => {
  const { data } = await apiMethod.post(API.GET_LIST_CATEGORY)
  return data
}

export const createCategory = async (payload) => {
  const { data } = await apiMethod.post(API.CREATE_CATEGORY, payload)
  return data
}

export const updateCategory = async (payload) => {
  const { data } = await apiMethod.put(API.UPDATE_CATEGORY + `/${payload?.idCate}`, payload)
  return data
}

export const getDetailCategory = async (id) => {
  const { data } = await apiMethod.get(API.GET_DETAIL_CATEGORY + `/${id}`)
  return data
}

export const deleteCategory = async (id) => {
  const { data } = await apiMethod.delete(API.DELETE_CATEGORY + `/${id}`)
  return data
}