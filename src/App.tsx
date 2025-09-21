import { useCounterStore } from './store/counterStore';

function App() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-extrabold">Hello World!</h1>
      <p className="font-extrabold text-4xl text-yellow-500">{count}</p>
      <div className="flex gap-4 *:bg-yellow-50 text-black *:p-3 *:hover:bg-yellow-500 *:cursor-pointer">
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
