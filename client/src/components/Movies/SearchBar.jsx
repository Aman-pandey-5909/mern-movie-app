import { useState } from "react";
import Button from "@mui/material/Button";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 flex-1"
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
}
