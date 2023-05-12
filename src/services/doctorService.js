import axios from "../axios";

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
  return axios.get('/api/get-all-doctors')
}

const saveInfoDoctor =  (data) => {
  return axios.post('/api/save-info-doctor', data)
}

const getInfoDoctor = (doctorId) => {
  return axios.get(`/api/get-info-doctor-by-id?id=${doctorId}`)
}

export {
  getTopDoctorHomeService,
  getAllDoctors,
  saveInfoDoctor,
  getInfoDoctor
}