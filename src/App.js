import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import {apiUrl, filterData} from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner"; 


const App = () => {

// const[courses,setCourses] = useState([]); 
const[courses,setCourses] = useState(null); 
const[loading,setLoading] = useState(true); 
const[catagory,setCatagory] = useState(filterData[0].title);

async function fetchData(){
  setLoading(true);
  try{
    let responce = await fetch(apiUrl);
    let output = await responce.json();

    setCourses(output.data);
  }

  catch(error){
    toast.error("Network me koi dikkat hai")
  }
  setLoading(false);

}

useEffect( ()=>{
   fetchData();
},[] );


  return (
       <div className="min-h-screen flex flex-col bg-bgDark2">

           <div>
            <Navbar/>
           </div>


          <div className="bg-bgDark2">

              <div>
                <Filter filterData = {filterData}
                catagory = {catagory}
                setCatagory = {setCatagory}
                />
              </div>

              <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
                {
                  loading ? (<Spinner/>) : (<Cards courses={courses} catagory={catagory}/>) 
                }   
                
                {/* <Cards courses = {courses}/> */}    
                
              </div>

          </div>



       </div>
  )
};

export default App;
