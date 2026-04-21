import { useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ preview, setPreview] = useState(null);
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((res) => res.data),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
    const mutation =  useMutation({
    mutationFn:(formData)=> axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}` , formData , {headers: {"Content-Type" : "multipart/form-data"}}),
    onSuccess: ()=>{
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user",id]);
      navigate(`/user/${id}`);
      // navigate("/");
    },
    onError: (error) => {
      alert("Error adding user:" +error.message);
    },
  });
  return (
    <section className="max-w-125 mx-auto mt-24 mb-12 p-5 bg-white shadow-sm rounded-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-[#333] border-b border-gray-200 pb-4 mb-6">
        {" "}
        Edit User Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            required
            defaultValue={user?.name}
            className="w-full p-2.5 text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            placeholder="Enter age"
            required
            defaultValue={user?.age}
            className="w-full p-2.5 text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
            defaultValue={user?.email}
            className="w-full p-2.5 text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            // defaultValue={user?.photo}
            onChange={handleFileChange}
            className="w-full p-2 text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded cursor-pointer focus:outline-none"
            accept="image/*"
          />
          <div className="mt-3 min-h-25 flex justify-center items-center border border-dashed border-gray-300 rounded bg-gray-50 overflow-hidden">
            {preview ? (
              <img src={preview} className="max-h-50 object-contain" />
            ) : user?.photo ? (
              <img
                className="w-32 h-32 object-cover rounded-full"
                src={user?.photo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "../../public/user.avif";
                }}
              />
            ) : (
              <span className="text-gray-400 text-sm">
                Image Preview will appear here{" "}
              </span>
            )}
          </div>
        </div>
      <div className="flex pt-2 gap-3">
        <button
          type="submit" 
          className="flex-1 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Update Details
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 px-6 py-3 bg-gray-500 text-white font-medium rounded hover:bg-gray-600 active:scale-[0.98] transition-all"
        >
          Cancel
        </button>
      </div>
      </form>
    </section>
  );
};

export default EditUser;
