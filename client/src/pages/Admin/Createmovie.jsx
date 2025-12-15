import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CreateMovie() {
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
    duration: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...movie,
      rating: Number(movie.rating),
      duration: Number(movie.duration),
    };

    try {
      await api.post("/movies", payload);
      alert("Movie created successfully");
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating movie");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border my-3">
      <div className="flex justify-between my-2">
        <h1 className="text-xl font-semibold mb-4">Add Movie</h1>
        <Button variant="outlined" onClick={() => navigate("/admin")}>
          Dashboard
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          onChange={handleChange}
          required
        />
        <TextField
          label="Poster"
          variant="outlined"
          name="poster"
          onChange={handleChange}
          required
        />
        <TextField
          label="Director"
          variant="outlined"
          name="director"
          onChange={handleChange}
          required
        />
        <TextField
          label="Year"
          variant="outlined"
          name="year"
          onChange={handleChange}
          required
        />
        <TextField
          label="IMDB ID"
          variant="outlined"
          name="imdbID"
          onChange={handleChange}
          required
        />
        <TextField
          label="Type"
          variant="outlined"
          name="type"
          onChange={handleChange}
          required
        />
        <TextField
          label="Rating"
          variant="outlined"
          name="rating"
          onChange={handleChange}
          type="number"
          required
        />
        <TextField
          label="Duration"
          variant="outlined"
          name="duration"
          onChange={handleChange}
          required
          type="number"
        />

        <Button type="submit" variant="contained" color="primary">
          Create Movie
        </Button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
