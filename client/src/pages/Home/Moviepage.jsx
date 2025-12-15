import { useEffect, useState } from "react";
import api from "../../utils/api";
import MovieCard from "../../components/Movies/MovieCard";
import SearchBar from "../../components/Movies/SearchBar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../context/auth/authContext";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortby, setSortby] = useState("");
  const [search, setSearch] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    let url = "";

    if (search) {
      url = `/search?page=${page}&s=${search}`;
    } else if (sortby) {
      url = `/movies/sorted?page=${page}&sortby=${sortby}`;
    } else {
      url = `/movies?page=${page}`;
    }

    api.get(url).then((res) => {
      setMovies(res.data.resdata);
    });
  }, [page, sortby, search]);

  const handleLogout = async () => {
    api.post("/auth/logout");
    window.location.href = "/";
  };

  return (
    <div className="p-4">
      <Button onClick={handleLogout} variant="text" color="error">
        Logout
      </Button>
      <div className="flex justify-between my-2">
        {user && (
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
        )}
        {user.role === "admin" && (
          <Button
            onClick={() => (window.location.href = "/admin")}
            variant="outlined"
            color="primary"
          >
            Admin Dashboard
          </Button>
        )}
      </div>
      <SearchBar
        onSearch={(query) => {
          setSearch(query);
          setPage(1); // reset pagination on new search
        }}
      />

      {/* <select
        className="border px-2 py-1 mb-4"
        onChange={(e) => {
          setSortby(e.target.value);
          setSearch(""); // disable search when sorting
          setPage(1);
        }}
      >
        <option value="">Default</option>
        <option value="title">Title</option>
        <option value="rating">Rating</option>
        <option value="year">Year</option>
        <option value="duration">Duration</option>
      </select> */}

      <FormControl className="mb-4 w-1/3 text-sm">
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortby}
          onChange={(e) => {
            setSortby(e.target.value);
            setSearch(""); // disable search when sorting
            setPage(1);
          }}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </Select>
      </FormControl>
      {movies.length === 0 && <p>No movies found</p>}

      <div className="grid grid-cols-3 my-2 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        {movies.length > 0 && (
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
