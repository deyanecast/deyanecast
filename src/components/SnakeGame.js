import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './SnakeGame.css';
import { useTheme } from '../context/ThemeContext';

const SnakeGame = () => {
  const { theme } = useTheme();
  const isTouchDevice = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    []
  );
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const stored = window.localStorage.getItem('snake-high-score');
    const parsed = Number.parseInt(stored ?? '0', 10);
    return Number.isFinite(parsed) ? parsed : 0;
  });
  const [gameStarted, setGameStarted] = useState(false);
  const gameLoopRef = useRef();
  const canvasRef = useRef(null);
  const directionRef = useRef([0, 1]);
  const foodRef = useRef([15, 15]);
  const gameOverRef = useRef(false);
  const gameStartedRef = useRef(false);

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
    setFood(() => {
      const newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      foodRef.current = newFood;
      return newFood;
    });
  }, []);

  // Mover la serpiente
  const moveSnake = useCallback(() => {
    if (gameOverRef.current || !gameStartedRef.current) return;

    setSnake(prevSnake => {
      const currentDirection = directionRef.current;
      const currentFood = foodRef.current;
      const head = [prevSnake[0][0], prevSnake[0][1]];
      
      // Mover la cabeza
      head[0] += currentDirection[0];
      head[1] += currentDirection[1];

      // Verificar colisión
      const hitWall = head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE;
      const hitSelf = prevSnake.slice(1).some(
        (segment) => head[0] === segment[0] && head[1] === segment[1]
      );
      if (hitWall || hitSelf) {
        gameOverRef.current = true;
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Verificar si come la comida
      if (head[0] === currentFood[0] && head[1] === currentFood[1]) {
        setScore(prev => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [generateFood]);

  const changeDirection = useCallback((nextDirection) => {
    const prevDirection = directionRef.current;
    const isReverse =
      prevDirection[0] + nextDirection[0] === 0 &&
      prevDirection[1] + nextDirection[1] === 0;
    if (isReverse) return;

    directionRef.current = nextDirection;
    setDirection(nextDirection);
    if (!gameStartedRef.current) {
      gameStartedRef.current = true;
      setGameStarted(true);
    }
  }, []);

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
        if (!gameStartedRef.current) {
          gameStartedRef.current = true;
          setGameStarted(true);
        }
        break;
      default:
        break;
    }
  }, [changeDirection]);

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

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    gameStartedRef.current = gameStarted;
  }, [gameStarted]);

  useEffect(() => {
    if (score <= highScore) return;
    setHighScore(score);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('snake-high-score', String(score));
    }
  }, [score, highScore]);

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

  const handleDirectionInput = useCallback(
    (nextDirection, event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      changeDirection(nextDirection);
    },
    [changeDirection]
  );

  // Reiniciar juego
  const restartGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    foodRef.current = [15, 15];
    directionRef.current = [0, 1];
    gameOverRef.current = false;
    gameStartedRef.current = false;
  };

  return (
    <div className="snake-game-container">
      <div className="snake-game-header">
        <h1 className="snake-game-title">Snake Game</h1>
        <div className="snake-game-info">
          <span className="snake-game-score">Score: {score}</span>
          <span className="snake-game-high-score">High Score: {highScore}</span>
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
            <p>{isTouchDevice ? 'Tap any direction to start' : 'Press any arrow key to start'}</p>
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
        <button type="button" onPointerDown={(e) => handleDirectionInput([0, -1], e)} className="touch-btn touch-up" aria-label="Move up">▲</button>
        <button type="button" onPointerDown={(e) => handleDirectionInput([-1, 0], e)} className="touch-btn touch-left" aria-label="Move left">◀</button>
        <button type="button" onPointerDown={(e) => handleDirectionInput([1, 0], e)} className="touch-btn touch-right" aria-label="Move right">▶</button>
        <button type="button" onPointerDown={(e) => handleDirectionInput([0, 1], e)} className="touch-btn touch-down" aria-label="Move down">▼</button>
      </div>
      
      <div className="snake-game-controls">
        <p>Use arrow keys or touch controls to move the snake</p>
        <p>Eat the red food to grow and score points</p>
      </div>
    </div>
  );
};

export default SnakeGame; 