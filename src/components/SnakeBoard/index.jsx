import React, { useEffect, useState, useRef } from "react";
import Blank from "../../images/blank.png";
import Snake from "../../images/snake.png";
import Food from "../../images/food.png";
import { SnakeBoardContainer } from "./style.jsx";

const SnakeBoard = () => {
  const width = 10;
  const height = 10;

  let initialRows = [];
  for (let i = 0; i < 10; i++) {
    initialRows.push([]);
    for (let j = 0; j < 10; j++) {
      initialRows[i].push("blank");
    }
  }

  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    return position;
  };

  const [rows, setRows] = useState(initialRows);
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(randomPosition);

  const displayRows = rows.map((row) => (
    <li>
      {row.map((e) => {
        switch (e) {
          case "blank":
            return <img src={Blank} alt="blank" />;
          case "snake":
            return <img src={Snake} alt="snake" />;
          case "food":
            return <img src={Food} alt="food" />;
          default:
            return "";
        }
      })}
    </li>
  ));

  const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = "snake";
    });
    newRows[food.x][food.y] = "food";
    setRows(newRows);
  };

  const changeDirectionWithKeys = (e) => {
    let { keyCode } = e;
    switch (keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("top");
        break;
      case 39:
        setDirection("right");
        break;
      case 40:
        setDirection("bottom");
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    const newSnake = [];
    switch (direction) {
      case "right":
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % width });
        break;
      case "left":
        newSnake.push({ x: snake[0].x, y: (snake[0].y - 1 + width) % width });
        break;
      case "top":
        newSnake.push({ x: (snake[0].x - 1 + height) % height, y: snake[0].y });
        break;
      case "bottom":
        newSnake.push({ x: (snake[0].x + 1) % height, y: snake[0].y });
        break;
      default:
        return "";
    }
    snake.forEach((cell) => {
      newSnake.push(cell);
    });
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(randomPosition);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
    displaySnake();
  };

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(moveSnake, 150);

  document.addEventListener("keydown", changeDirectionWithKeys, false);

  return (
    <SnakeBoardContainer>
      <ul>{displayRows}</ul>
    </SnakeBoardContainer>
  );
};

export default SnakeBoard;
