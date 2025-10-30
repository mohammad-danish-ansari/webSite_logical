import React, { useState, useEffect } from "react";
import { Search, Filter, X, ArrowUpDown, ChevronDown, Plus, Edit, Trash2 } from "lucide-react";
import UseMovieApi from "../../hooks/UseMovie";
import { Loader2 } from "lucide-react";
import MovieModal from "../../components/MovieModal/MovieModal";
import InfiniteScroll from "../../utils/scrollContainerRef";
import { deleteMovie } from "../../services/movieService";
import ExitModel from "../../components/ExitModel/ExitModel";
import { showAlert } from "../../utils/alerts";

export default function Movie() {
  const {
    resetForm,
    formData,
    createPostMovie,
    handleChange,
    setSearchValue,
    searchValue,
    getAllLoadMovie,
    getAllMovieData,
    pagination,
    selectedStatus,
    setSelectedStatus,
    loading,
    getByIdLoadMovie,
    updateMovieById,
    currentPage,
    setCurrentPage
  } = UseMovieApi();

  const [showFilters, setShowFilters] = useState(false);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [movieIdForUpdate, setMovieIdForUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteMovieId, setSelectedDeleteMovieId] = useState(null);

  // Reset when search or filters change
  useEffect(() => {
    setCurrentPage(1);
    getAllLoadMovie(false);
  }, [searchValue, selectedStatus]);
  
  useEffect(() => {
    if (currentPage > 1) {
      getAllLoadMovie(true);
    }
  }, [currentPage]);
  // Create movies =========
  const handleConfirmMovie = async (e) => {
    e.preventDefault();

    if (movieIdForUpdate) {
      await updateMovieById(movieIdForUpdate);
      setShowMovieModal(false);
      await getAllLoadMovie();

    } else {
      const response = await createPostMovie(e);
      console.log("response============response", response);
      if (response?.message === "Movie created successfully") {
        setShowMovieModal(false);
        await getAllLoadMovie();
      }
    }
    // setShowMovieModal(false);
    setMovieIdForUpdate(null);
  };



  const handleClearFilters = () => {
    setSearchValue("");
    setSelectedStatus("");
    getAllLoadMovie();
  };
  const handleDeleteMovie = async (id) => {
    const response = await deleteMovie(id)
    if (response?.message === "Movie deleted successfully") {
      showAlert.success(response.message)
      await getAllLoadMovie();
    }
  }
  return (
    <div className="flex-1 overflow-auto">
      <MovieModal
        isOpen={showMovieModal}
        onClose={() => setShowMovieModal(false)}
        onConfirm={handleConfirmMovie}
        formData={formData}
        handleChange={handleChange}
      />
      <ExitModel
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => { handleDeleteMovie(selectedDeleteMovieId); setShowDeleteModal(false) }}
        title="Delete Movie or TV/Show"
        message="Are you sure you want to delete this Movie or TV/Show?"
        confirmLabel="Delete"
        cancelLabel="Cancel"

      />
      {/* Your table or card UI */}

      {/* Header */}
      <div className="bg-white lg:px-6 flex items-center justify-end bt_1" >
        <button
          onClick={() => {resetForm();setShowMovieModal(true)}}
          className="inline-flex justify-end items-center px-2 md:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus size={16} className="md:mr-2" />
          Add movie or TV show
        </button>
      </div>

      <div className="p-6">

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 md:p-6 p-3 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? "Hide Filters" : "Filters"}
            </button>

            {/* Results total count */}
            <span className="text-sm text-gray-600">
              {pagination?.total || 0} Movies / TV Show
            </span>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Advanced Filters
              </h3>

              {/* Status Filter */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select status</option>
                    <option value="Movie">Movie</option>
                    <option value="TVShow">TVShow</option>
                  </select>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>

              <div className="flex space-x-3">
                <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Add Filter
                </button>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear
                </button>
                <button className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-900">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Leads Table */}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <InfiniteScroll
            data={getAllMovieData}
            loading={loading}
            pagination={pagination}
            onLoadMore={() => {
              if (pagination?.page < pagination?.totalPages) {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                getAllLoadMovie(true, nextPage); 
              }
            }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    {[
                      "Title",
                      "Type",
                      "Director",
                      "Budget",
                      "Location",
                      "Duration",
                      "Year/Time",
                      "Actions",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center space-x-1 text-xs">
                          <span> {header}</span>
                        </div>
                      </th>
                    ))}

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-12 text-gray-500 text-sm">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                      </td>
                    </tr>
                  ) : getAllMovieData?.length > 0 ? (
                    getAllMovieData.map((movie) => (
                      <tr key={movie.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {movie.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {movie.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {movie.director}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${Number(movie.budget).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {movie.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {movie.duration} min
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {movie.yearTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <button className="text-blue-500 hover:text-blue-700"
                            onClick={async () => { await getByIdLoadMovie(movie.id); setMovieIdForUpdate(movie.id); setTimeout(() => setShowMovieModal(true), 0); }}
                          >
                            <Edit size={16} />
                          </button>
                          <button className="text-red-500 hover:text-red-700"
                            onClick={() => { setSelectedDeleteMovieId(movie.id); setShowDeleteModal(true) }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-12 text-gray-500 text-sm">
                        No movies found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div >
  );
}
