import axios from "../axios";

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export {
  getTopDoctorHomeService,
}