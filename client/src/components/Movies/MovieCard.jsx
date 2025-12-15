import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MovieCard({ movie }) {
  return (
    <Card sx={{ maxWidth: 345 }} className="border-blue-500 border">
      <CardMedia
        sx={{ height: 300 }}
        image={movie.poster}
        title={movie.title}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
        <div className="flex justify-between mt-1">
          <Typography variant="body2" color="text.secondary">
            Director: {movie.director}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {movie.year}
          </Typography>
        </div>
        <div className="flex justify-between mt-1">
          <Typography variant="body2" color="text.secondary">
            Rating: {movie.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {movie.duration}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
