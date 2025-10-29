import { deleteApi, getApi, postApi ,putsApi} from "./api";

export const postMovies = async (data) => postApi("/v1/admin/movies/createMovie", data)
export const getAllMovies = async (params = {}) => getApi("/v1/admin/movies/getAllMovies",params)
export const getMovieById = async (id) => getApi(`/v1/admin/movies/getMovieById/${id}`)
export const updateMovie = async (id, data) => putsApi(`/v1/admin/movies/updateMovie/${id}`,data)
export const deleteMovie = async (id) => deleteApi(`/v1/admin/movies/deleteMovie/${id}`)