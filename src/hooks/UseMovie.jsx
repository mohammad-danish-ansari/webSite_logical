import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../utils/alerts";
import { validateFields } from "../utils/formValidator";
import { getAllMovies, getMovieById, postMovies, updateMovie } from "../services/movieService";


const UseMovieApi = () => {

  const FORM_SCHEMA = {
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    yearTime: '',
    userId: '',

  };
  const [formData, setFormData] = useState(FORM_SCHEMA);
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState();
  const [getAllMovieData, setGetAllMovieData] = useState([])

  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const navigatePath = (path) => {
    navigate(path);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const resetForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  setFormData({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
    userId: user?.userId || "",
  });
};
  const createPostMovie = async (e) => {

    console.log("createPostMovie=========", createPostMovie);
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedFormData = {
        ...formData,
        userId: user.userId,
      };

      const requiredFields = [
        { name: "title", label: "Title" },
        { name: "type", label: "Type" },
        { name: "director", label: "Director" },
        { name: "budget", label: "Budget" },
        { name: "location", label: "Location" },
        { name: "duration", label: "Duration" },
        { name: "yearTime", label: "Year/Time" },
      ];

      const validation = validateFields(requiredFields, formData)
      if (!validation.isValid) {
        showAlert.warning(validation.message)
        return
      }
      console.log("log============")

      setLoading(true);
      const res = await postMovies(updatedFormData)
      console.log("postMovies============", res)
      showAlert.success(res.message);
      const response = res?.data
      setMovieData(response)
      setLoading(false);
      setFormData(FORM_SCHEMA)
      return res;
    } catch (error) {
      setLoading(false);
      console.log(error);

      showAlert.error("Failed to movie");
    }
  }

  const getByIdLoadMovie = async (id) => {
    try {
      setLoading(true);
      const response = await getMovieById(id);

      console.log("success =============", response);
      const data = response?.data;
      if (data) {
        setFormData({
          id: data.id,
          title: data.title,
          type: data.type,
          director: data.director,
          budget: data.budget,
          location: data.location,
          duration: data.duration,
          yearTime: data.yearTime,
        })
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showAlert.error("Failed to load movie.");
    }
  };

  const updateMovieById = async (id) => {
    try {
      const res = await updateMovie(id, formData)
      showAlert.success(res.message)
      console.log(res);
    } catch (error) {
      setLoading(false);
      showAlert.error("Failed to load movie.");
    }
  }


  const getAllLoadMovie = async (append = false, customPage = null) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;

      const pageToLoad = customPage || currentPage;

      const response = await getAllMovies({
        search: searchValue || "",
        page: pageToLoad,
        limit: 4,
        type: selectedStatus || "",
        userId
      });

      setLoading(false);

      if (append) {
        setGetAllMovieData((prev) => [...prev, ...(response?.data || [])]);
      } else {
        setGetAllMovieData(response?.data || []);
      }

      setPagination(response?.pagination);
    } catch (error) {
      setLoading(false);
      showAlert.error("Failed to load movies.");
    }
  };





  return {
    resetForm,
    navigatePath,
    handleChange,
    formData,
    loading,
    createPostMovie,
    movieData,
    getAllLoadMovie,
    getAllMovieData,
    pagination,
    searchValue,
    setSearchValue,
    selectedStatus,
    setSelectedStatus,
    selectedCity,
    setSelectedCity,
    selectedState,
    setSelectedState,
    currentPage,
    setCurrentPage,
    getByIdLoadMovie,
    updateMovieById

  }
}

export default UseMovieApi