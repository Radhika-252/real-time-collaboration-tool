import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

const App = () => {
  const [userToken, setUserToken] = useState(null);

  return (
    <div>
      {!userToken ? (
        <>
          <Login setUserToken={setUserToken} />
          <Register />
        </>
      ) : (
        <Chat userToken={userToken} />
      )}
    </div>
  );
};

export default App;
