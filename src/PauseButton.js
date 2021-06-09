import { Button } from "@material-ui/core";

export default function PauseButton({ isPaused, togglePause }) {
  return (
    <Button
      variant="contained"
      color={isPaused ? "primary" : "secondary"}
      onClick={togglePause}
    >
      {isPaused ? "Resume" : "Pause"}
    </Button>
  );
}
