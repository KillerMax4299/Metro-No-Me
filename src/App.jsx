import PendulumProgressBar from "./PendulumProgressBar";
import { useState, useEffect, memo } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaStop, FaPlay } from "react-icons/fa";

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight+"px");
  const [inputVal, setInputVal] = useState("");
  const [beats, setBeats] = useLocalStorage("beats", 60);
  const [delay, setDelay] = useState((60 / beats) * 1000);
  const [audio] = useState(new Audio("./sound.mp3"));
  const [playing, setPlaying] = useState(false);
  const [direction, setDirection] = useState("left");

  const handleClick = () => {
    setPlaying((prevState) => !prevState);
  };

  useEffect(() => {
    if (inputVal != "") setBeats(parseInt(inputVal));
  }, [inputVal]);

  useEffect(() => {
    setInputVal(beats.toString());
    setDelay((60 / beats) * 1000);
    if (beats > 300) setBeats(300);
  }, [beats]);

  // Update state when the window is resized
  const handleResize = () => {
    setWindowHeight(window.innerHeight+"px");
  };

  useEffect(() => {
    // Add a resize event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); //

  // Effect to handle audio play/stop based on the boolean value
  useEffect(() => {
    let audioInterval;
    // console.log(delay);
    if (playing) {
      audio.play();
      setDirection((prevDirection) =>
        prevDirection === "left" ? "right" : "left"
      );
      audioInterval = setInterval(() => {
        audio.play();
        setDirection((prevDirection) =>
          prevDirection === "left" ? "right" : "left"
        );
      }, delay);
    } else {
      audio.pause();
      clearInterval(audioInterval);
      setDirection("left");
    }

    // Cleanup function to stop the audio and clear the interval
    return () => {
      audio.pause();
      clearInterval(audioInterval);
    };
  }, [playing, delay]);
  return (
    <div
      style={{ height: windowHeight }}
      className="flex flex-col items-center dark:bg-zinc-800 dark:text-white"
    >
      <label className="text-zinc-400 pt-8 pb-2">Beats / min</label>
      <div className="flex space-x-4 text-2xl mb-8 ">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
          <button
            onClick={() => {
              if (beats >= 5) setBeats((prev) => prev - 5);
            }}
            className="px-4 w-16 border-zinc-500 border dark:border-zinc-600 rounded-2xl"
          >
            -5
          </button>
          <button
            className="px-4 w-16 border-zinc-500 border dark:border-zinc-600 rounded-2xl"
            onClick={() => {
              if (beats > 1) setBeats((prev) => prev - 1);
            }}
          >
            -
          </button>
        </div>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={(e) => {
            if (e.target.value == "") setBeats(0);
          }}
          type="text"
          className="bg-transparent w-24 border dark:border-zinc-600 border-zinc-400 transition-all focus:border-blue-500 focus:ring outline-none rounded text-center"
        />
        <div className="flex flex-col-reverse md:flex-row space-y-0 justify-between md:space-y-0 md:space-x-4 items-center">
          <button
            onClick={() => {
              if (beats <= 295) setBeats((prev) => prev + 1);
            }}
            className="px-4 w-16 border-zinc-500 border dark:border-zinc-600 rounded-2xl"
          >
            +
          </button>
          <button
            onClick={() => {
              if (beats < 300) setBeats((prev) => prev + 5);
            }}
            className="px-4 w-16 border-zinc-500 border dark:border-zinc-600 rounded-2xl"
          >
            +5
          </button>
        </div>
      </div>
      <PendulumProgressBar delay={delay} direction={direction} />
      <MemoizedButton playing={playing} handleClick={handleClick} />
    </div>
  );
}

export default App;

const PlayButton = ({ handleClick, playing }) => {
  return (
    <>
      <button
        className="px-8 border dark:border-zinc-600 text-2xl rounded-lg py-2 m-2"
        onClick={handleClick}
      >
        {playing ? (
          <span className="text-red-500">
            <FaStop />
          </span>
        ) : (
          <span className="text-zinc-400">
            <FaPlay />
          </span>
        )}
      </button>
    </>
  );
};

const MemoizedButton = memo(PlayButton, (prevProps, newProps) => {
  return prevProps.playing === newProps.playing;
});
