import React, { useEffect, useState } from 'react'
import Au_Hero from '../Components/about_us/Au_Hero'
import Footer from '.././Components/Footer_v1/Footer';
import Events from '../Components/Events/Events';
import { useLocation } from 'react-router-dom';
import Calender from '../Components/Events/Calender/Calender';
import Desc_or_Spkrs from '../Components/Events/Describtion_Speakers/Desc_or_Spkrs';
import Cal_bg from '../Components/Events/Calender/Cal_bg';
import axios from 'axios';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Navbar_animated from '../Components/NabarTest/Navbar_animated';


export default function Events_page() {

  //   const ScrollToTop = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

    let { state } = useLocation();

    if (!state) {
        return <div>No item ID provided</div>;
    }

    const client = axios.create({
      baseURL: `http://127.0.0.1:8000/API/Events/${state}/Details`
    });
  
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Step 1: Create loading state

    useEffect(() => {
        setLoading(true); // Step 2: Set loading to true before API call
        client.get()
        .then((response) => {
        setPosts(response.data.data);
        })
        .finally(() => {
        setLoading(false); 
        });
    }, [state]);

    return (
      <>
        <div >
          <Navbar_animated IsPage={true}/>
          {loading
          ?
            <PropagateLoader className='text-center py-5' color="#3CB7A8"/>
          :
            <>
              {posts?.map((post) => {
                return (
                    <>
                      <Events item={post}/>
                      <Desc_or_Spkrs item={post}/>
                    </>
                );
              })}
            </>
          }
          <Cal_bg />
          <Footer/>
      </div>
      </>
    );
  }

// {posts?.map((post) => {
//   return (
//     <div>
//       <Navbar_menu/>
//       <Events item={post.id}/>
//       <Desc_or_Spkrs/>
//       <Cal_bg/>
//       <Footer/>
//     </div>
//   )})}
// }

