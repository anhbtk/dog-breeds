// App.tsx
import React from "react";
import { Provider } from "react-redux";
import DogComponent from "./components/DogComponent";
import store from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Welcome to the Dog Breeds App!</h1>
        <DogComponent />
      </div>
    </Provider>
  );
};

export default App;
