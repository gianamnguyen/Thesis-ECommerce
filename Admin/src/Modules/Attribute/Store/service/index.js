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

export const getAllAttribute = async (payload) => {
  const { data } = await apiMethod.get(API.GET_ALL_ATTRIBUTE)
  return data
}

export const createAttribute = async (payload) => {
  const { data } = await apiMethod.post(API.CREATE_ATTRIBUTE, payload)
  return data
}

export const updateStatusAttribute = async (payload) => {
  const { data } = await apiMethod.put(API.UPDATE_STATUS_ATTRIBUTE, payload)
  return data
}

export const deleteAttribute = async (payload) => {
  const { data } = await apiMethod.delete(API.DELETE_ATTRIBUTE + `?attributeId=${payload}`)
  return data
}
