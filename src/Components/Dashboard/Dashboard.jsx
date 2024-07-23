import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NavBar from '../NavBar/NavBar';
import './Dashboard.css'; // Ensure this CSS file is correctly imported
import { SlCalender } from "react-icons/sl";
import { TbBellSchool } from "react-icons/tb";
import { TbReportAnalytics } from "react-icons/tb";
import { BsChatSquareHeart } from "react-icons/bs";
import { fetchMedicalStaff } from '../../lib/axios'; // Ensure this import is correct

const Dashboard = () => {
  const [showButton, setShowButton] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const doctorData = await fetchMedicalStaff();
      if (doctorData && Array.isArray(doctorData.doctors)) {
        setDoctors(doctorData.doctors);
      } else {
        console.error("Unexpected data format:", doctorData);
      }
    } catch (error) {
      console.error("Fetching Doctor Error:", error);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const yOffset = -70; // Adjust this value to match the height of your fixed header
    const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: yPosition, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      <NavBar />
      <div className="relative w-full h-[46rem]">
        <div className="img1 h-full w-full absolute top-0 left-0"></div>

        {/* intro */}
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-11/12 lg:w-2/3 mx-auto h-auto lg:h-96 absolute top-[70%] lg:top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg rounded-lg p-4">
          <div className="flex flex-col items-center justify-center border-b-2 lg:border-r-2 lg:border-b-0 text-center p-4">
            <div className='flex flex-col items-center justify-center'>
              <SlCalender className="w-8 h-8 lg:w-12 lg:h-12" color='black'/>
              <h2 className="mt-2 text-md lg:text-lg font-semibold text-black">Appointment</h2>
              <p className="mt-1 text-xs lg:text-sm text-black">Schedule an appointment without going from your house</p>
            </div>
            <div className='mt-4 lg:mt-14'>
              <button className="explore" onClick={() => scrollToSection('appointment')}>
                <svg className="Icon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                </svg>
                Explore
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-b-2 lg:border-r-2 lg:border-b-0 text-center p-4">
            <div className='flex flex-col items-center justify-center'>
              <TbBellSchool className="w-8 h-8 lg:w-12 lg:h-12" color='black' />
              <h2 className="mt-2 text-md lg:text-lg font-semibold text-black">Reminder System</h2>
              <p className="mt-1 text-xs lg:text-sm text-black">Keep you in time to take the medication to gain a better health</p>
            </div>
            <div className='mt-4 lg:mt-14'>
              <button className="explore" onClick={() => scrollToSection('reminder')}>
                <svg className="Icon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                </svg>
                Explore
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className='flex flex-col items-center justify-center'>
              <TbReportAnalytics className="w-8 h-8 lg:w-12 lg:h-12" color='black' />
              <h2 className="mt-2 text-md lg:text-lg font-semibold text-black">Check Report</h2>
              <p className="mt-1 text-xs lg:text-sm text-black">Get your latest report from the clinic after your body check</p>
            </div>
            <div className='mt-4 lg:mt-14'>
              <button className="explore" onClick={() => scrollToSection('report')}>
                <svg className="Icon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                </svg>
                Explore
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-t-2 lg:border-t-0 lg:border-l-2 text-center p-4">
            <div className='flex flex-col items-center justify-center'>
              <BsChatSquareHeart className="w-8 h-8 lg:w-12 lg:h-12" color='black' />
              <h2 className="mt-2 text-md lg:text-lg font-semibold text-black">Minder Chat</h2>
              <p className="mt-1 text-xs lg:text-sm text-black">Solving some health problems using a chatbot</p>
            </div>
            <div className='mt-4 lg:mt-14'>
              <button className="explore" onClick={() => scrollToSection('chat')}>
                <svg className="Icon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                </svg>
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* body part */}
      <div className="w-full py-24 lg:py-72">
        {/* Carousel */}
        <div className="carousel-container absolute w-full md:mt-0 mt-40">
          <Carousel
            responsive={responsive}
            showDots={true}
            autoPlay
            infinite
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {Array.isArray(doctors) && doctors.length > 0 ? doctors.map((doctor, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <img src={doctor.details.profile_picture} alt={doctor.details.doctor_name} className="h-32 w-32 rounded-full" />
                <h3 className="text-lg font-semibold mt-4">{doctor.details.doctor_name}</h3>
                <p className="text-sm">{doctor.details.clinic_address}</p>
              </div>
            )) : (
              <div className="flex flex-col items-center p-4">
                <p className="text-lg">No doctors available.</p>
              </div>
            )}
          </Carousel>
        </div>
        {/* Section 1 */}
        <div id="appointment" className="max-w-7xl mt-[26rem] md:mt-56 mx-auto flex flex-col lg:flex-row items-center mb-48">
          <div className="w-full lg:w-1/2 p-4">
            <h1 className='font-sans text-2xl lg:text-3xl'>Appointment Feature</h1>
              <p className="text-base lg:text-lg font-sans mt-4">
                Our healthcare application, Vital_Minder, features a robust Appointment function designed to streamline the process of scheduling medical appointments. With this feature, you can effortlessly book appointments with your healthcare provider from the comfort of your home. This eliminates the need for time-consuming phone calls and in-person visits to the clinic just to secure an appointment. By making the scheduling process more efficient and user-friendly, you can manage your healthcare more effectively and ensure that you get the care you need without unnecessary hassle.
              </p>
              <button className="cssbuttons-io-button mt-6" onClick={() => navigateToPage('/appointment')}>
                Explore More
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
          </div>
          <div className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0">
            <div className="h-80 lg:h-[40rem] w-full appointment-img"></div>
          </div>
        </div>
        {/* Section 2 */}
        <div id="reminder" className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center mb-48">
          <div className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0">
            <div className="h-64 lg:h-80">
              <div className="h-64 lg:h-[20rem] w-full reminder-img"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h1 className='font-sans text-2xl lg:text-3xl'>Reminder Feature</h1>
              <p className="text-base lg:text-lg font-sans mt-4">
                The Reminder System in Vital_Minder is an essential tool for maintaining your health regimen. This feature ensures that you never miss a dose of your medication by sending you timely reminders. Keeping track of medication schedules can be challenging, especially for those managing chronic conditions or taking multiple medications. Our reminder system provides peace of mind by helping you adhere to your prescribed treatment plan, ultimately contributing to better health outcomes and reducing the risk of complications due to missed doses.
              </p>
              <button className="cssbuttons-io-button mt-6" onClick={() => navigateToPage('/reminder')}>
                Explore More
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
          </div>
        </div>
        {/* Section 3 */}
        <div id="report" className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center mb-48">
          <div className="w-full lg:w-1/2 p-4">
            <h1 className='font-sans text-2xl lg:text-3xl'>Check Report Feature</h1>
              <p className="text-base lg:text-lg font-sans mt-4">
                With the Check Report function, Vital_Minder gives you immediate access to your latest medical reports and test results directly from the clinic after your body check. This feature is designed to keep you informed about your health status without the need for follow-up appointments or waiting for phone calls. Having instant access to your medical reports allows you to make more informed decisions about your healthcare and enables more productive discussions with your healthcare provider. Staying informed is key to proactive health management, and our Check Report function ensures you have the information you need at your fingertips.
              </p>
              <button className="cssbuttons-io-button mt-6" onClick={() => navigateToPage('/report')}>
                Explore More
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
          </div>
          <div className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0">
            <div className="h-64 lg:h-full">
              <div className="check-report-img w-[20rem] lg:w-[28rem] h-[20rem] lg:h-[28rem] mx-auto"></div>
            </div>
          </div>
        </div>
        {/* Section 4 */}
        <div id="chat" className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center mb-4">
          <div className="w-full lg:w-1/2 p-4 mt-8 lg:mt-0">
            <div className="h-64 lg:h-full">
              <div className="chatbot-img w-[20rem] lg:w-[28rem] h-[20rem] lg:h-[30rem] mx-auto"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4 lg:mt-28">
            <h1 className='font-sans text-2xl lg:text-3xl mt-8 md:mt-0'>Minder Chat</h1>
            <p className="text-base lg:text-lg font-sans mt-4">
              The Minder Chat function in Vital_Minder offers you instant access to reliable health information and support through an intelligent chatbot. Whether you have questions about symptoms, medications, or general health advice, our chatbot is available to provide accurate and helpful responses. This feature ensures that you have access to health information anytime, anywhere, empowering you to manage your health proactively. The Minder Chat function is especially useful for addressing immediate health concerns and getting timely advice, making it a valuable resource for maintaining your overall wellbeing.
            </p>
            <button className="cssbuttons-io-button mt-6" onClick={() => navigateToPage('/chat')}>
                Explore More
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
          </div>
        </div>
      </div>

      {showButton && (
        <button className="button fixed bottom-8 right-8" onClick={scrollToTop}>
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Dashboard;
