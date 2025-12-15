import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditMovie() {
  const { id } = useParams(); // imdbID (as per your backend logic)
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    poster: "",
    director: "",
    year: "",
    imdbID: "",
    type: "",
    rating: "",
    duration: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch existing movie
  useEffect(() => {
    api.get(`/movie/${id}`)
      .then(res => {
        const data = res.data.resdata;
        setMovie({
          title: data.title,
          description: data.description,
          poster: data.poster,
          director: data.director,
          year: data.year,
          imdbID: data.imdbID,
          type: data.type,
          rating: data.rating,
          duration: data.duration
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...movie,
      rating: Number(movie.rating),
      duration: Number(movie.duration)
    };

    try {
      await api.put(`/movies/${id}`, payload);
      alert("Movie updated successfully");
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating movie");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Movie</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextField label="Title" name="title" value={movie.title} onChange={handleChange} variant="outlined" />
        <TextField label="Description" name="description" value={movie.description} onChange={handleChange} variant="outlined" />
        <TextField label="Poster" name="poster" value={movie.poster} onChange={handleChange} variant="outlined" />
        <TextField label="Director" name="director" value={movie.director} onChange={handleChange} variant="outlined" />
        <TextField label="Year" name="year" value={movie.year} onChange={handleChange} variant="outlined" />
        <TextField label="IMDB ID" name="imdbID" value={movie.imdbID} onChange={handleChange} variant="outlined" />
        <TextField label="Type" name="type" value={movie.type} onChange={handleChange} variant="outlined" />
        <TextField label="Rating" name="rating" value={movie.rating} onChange={handleChange} variant="outlined" />
        <TextField label="Duration" name="duration" value={movie.duration} onChange={handleChange} variant="outlined" />

        <Button type="submit" variant="contained" color="primary">Update</Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
