import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './SnakeGame.css';
import { useTheme } from '../context/ThemeContext';

const SnakeGame = () => {
  const { theme } = useTheme();
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gameLoopRef = useRef();
  const canvasRef = useRef(null);

  const GRID_SIZE = 20;
  const GAME_SPEED = 150;
  const palette = useMemo(
    () =>
      theme === 'dark'
        ? {
            bg: '#060606',
            grid: '#1f1f1f',
            head: '#ffffff',
            body: '#dcdcdc',
            food: '#ff3030',
          }
        : {
            bg: '#f7f7f7',
            grid: '#dddddd',
            head: '#111111',
            body: '#2f2f2f',
            food: '#d43f3f',
          },
    [theme]
  );

  // Generar comida aleatoria
  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE)
    ];
    setFood(newFood);
  }, []);

  // Verificar colisión
  const checkCollision = useCallback((head) => {
    // Colisión con paredes
    if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
      return true;
    }
    // Colisión con el cuerpo
    for (let i = 1; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }
    return false;
  }, [snake]);

  // Mover la serpiente
  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = [...newSnake[0]];
      
      // Mover la cabeza
      head[0] += direction[0];
      head[1] += direction[1];

      // Verificar colisión
      if (checkCollision(head)) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Verificar si come la comida
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, checkCollision, generateFood]);

  const changeDirection = useCallback((nextDirection) => {
    setDirection((prevDirection) => {
      const isReverse =
        prevDirection[0] + nextDirection[0] === 0 &&
        prevDirection[1] + nextDirection[1] === 0;
      return isReverse ? prevDirection : nextDirection;
    });
    if (!gameStarted) setGameStarted(true);
  }, [gameStarted]);

  // Manejar teclas
  const handleKeyPress = useCallback((e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowUp':
        changeDirection([0, -1]);
        break;
      case 'ArrowDown':
        changeDirection([0, 1]);
        break;
      case 'ArrowLeft':
        changeDirection([-1, 0]);
        break;
      case 'ArrowRight':
        changeDirection([1, 0]);
        break;
      case ' ':
        if (!gameStarted) setGameStarted(true);
        break;
      default:
        break;
    }
  }, [changeDirection, gameStarted]);

  // Ajustar tamaño del canvas
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const size = Math.min(containerWidth, containerHeight, 400);
    
    canvas.width = size;
    canvas.height = size;
  }, []);

  // Renderizar el juego
  const renderGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const cellSize = canvas.width / GRID_SIZE;

    // Limpiar canvas
    ctx.fillStyle = palette.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar grid
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Dibujar serpiente
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? palette.head : palette.body;
      ctx.fillRect(
        segment[0] * cellSize + 1,
        segment[1] * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });

    // Dibujar comida (rojo)
    ctx.fillStyle = palette.food;
    ctx.fillRect(
      food[0] * cellSize + 1,
      food[1] * cellSize + 1,
      cellSize - 2,
      cellSize - 2
    );
  }, [snake, food, palette]);

  // Inicializar juego
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Game loop
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, moveSnake]);

  // Renderizar en cada frame
  useEffect(() => {
    renderGame();
  }, [renderGame]);

  // Ajustar tamaño del canvas al montar y al cambiar el tamaño de la ventana
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Reiniciar juego
  const restartGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  return (
    <div className="snake-game-container">
      <div className="snake-game-header">
        <h1 className="snake-game-title">Snake Game</h1>
        <div className="snake-game-info">
          <span className="snake-game-score">Score: {score}</span>
          {gameOver && <span className="snake-game-over">Game Over!</span>}
        </div>
      </div>
      
      <div className="snake-game-canvas-container">
        <canvas
          ref={canvasRef}
          className="snake-game-canvas"
        />
        
        {!gameStarted && (
          <div className="snake-game-start-overlay">
            <p>Press any arrow key to start</p>
          </div>
        )}
        
        {gameOver && (
          <div className="snake-game-overlay">
            <p>Game Over!</p>
            <p>Final Score: {score}</p>
            <button onClick={restartGame} className="snake-game-restart-btn">
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="snake-game-touch-controls" aria-label="Touch controls">
        <button type="button" onClick={() => changeDirection([0, -1])} className="touch-btn touch-up" aria-label="Move up">▲</button>
        <button type="button" onClick={() => changeDirection([-1, 0])} className="touch-btn touch-left" aria-label="Move left">◀</button>
        <button type="button" onClick={() => changeDirection([1, 0])} className="touch-btn touch-right" aria-label="Move right">▶</button>
        <button type="button" onClick={() => changeDirection([0, 1])} className="touch-btn touch-down" aria-label="Move down">▼</button>
      </div>
      
      <div className="snake-game-controls">
        <p>Use arrow keys or touch controls to move the snake</p>
        <p>Eat the red food to grow and score points</p>
      </div>
    </div>
  );
};

export default SnakeGame; 