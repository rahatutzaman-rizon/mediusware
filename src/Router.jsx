
import {
    createBrowserRouter,
  
  } from "react-router-dom";
import App from "./App";
import Problem1 from "./components/Problem-1";
import Problem2 from "./components/Problem-2";




  const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children:[
          
{
path:"/problem-1",
element:<Problem1></Problem1>
},



    {
        path:"/problem-2",
        element:<Problem2></Problem2>
        },

      

        ]
      },

        
        
]
  );

export default router;