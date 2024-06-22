import { useEffect, useState } from "react";
import "./index.css";
import logo from "./image/Logo_Hust.png";
import axios from "axios";
import { HumidityChart, SmokeChart, TemperatureChart } from "./ChartDetail";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

import emailjs from '@emailjs/browser';


import { getDatabase, ref, get, set, onValue } from "firebase/database";

import imgOffline from './image/OFFLINE.png'
import imgOnline from './image/ONLINE.png'
import { useAuth } from './components/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const listenToFirebaseData = (refName, updateFunction) => {
  const dataRef = ref(getDatabase(), refName);

  const handleValueChange = (snapshot) => {
    const newData = snapshot.val();
    updateFunction(newData);
    console.log(`Dữ liệu ${refName} thay đổi:`, newData);
  };

  onValue(dataRef, handleValueChange);

  return () => {
    dataRef.off("value", handleValueChange);
  };
};


function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [sosData, setsosData] = useState(0);

  // hop 1

  const [humiData, sethumiData] = useState(0);
  const [smokeData, setsmokeData] = useState(0);
  const [tempData, settempData] = useState(0);


  const [status, setstatus] = useState(null);
  const [timestamp, settimestamp] = useState(null);
  const [newtimestamp, setnewtimestamp] = useState(null);

  // hop 2 

  const [humiData2, sethumiData2] = useState(0);
  const [smokeData2, setsmokeData2] = useState(0);
  const [tempData2, settempData2] = useState(0);


  const [status2, setstatus2] = useState(null);
  const [timestamp2, settimestamp2] = useState(null);
  const [newtimestamp2, setnewtimestamp2] = useState(null);


  const { isLoggedIn, logout } = useAuth();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    logout(); // Đăng xuất người dùng
    localStorage.setItem("isLoggedIn", false);
    navigate("/login"); // Chuyển hướng đến trang login
  };

  // //--------

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();

      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}:${seconds}`;

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dateString = now.toLocaleDateString("vi-VN", options);

      setTime(timeString);
      setDate(dateString);
    };

    updateTimeAndDate();
    const intervalID = setInterval(updateTimeAndDate, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);



  useEffect(() => {
    getValueData();
    getStatusData();
  }, []);
  
  useEffect(() => {
    getValueData2();
    getStatusData2();
  }, []);


const getValueData = async () => {
  try {
    const response = await axios.get(
      "https://test2-d9c33-default-rtdb.firebaseio.com/Room1/read.json"
    );
    const result = response?.data;

    sethumiData(result?.humi);
    setsmokeData(result?.smoke);
    settempData(result?.temp);

    console.log("data", result);
  } catch (error) {
    console.log("Error:", error);
  }
};

const getValueData2 = async () => {
  try {
    const response = await axios.get(
      "https://test2-d9c33-default-rtdb.firebaseio.com/Room2/read.json"
    );
    const result = response?.data;

    sethumiData2(result?.humi2);
    setsmokeData2(result?.smoke2);
    settempData2(result?.temp2);

    console.log("data", result);
  } catch (error) {
    console.log("Error:", error);
  }
};

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    await getValueData();
    await getValueData2();
    setIsLoading(false);
  };

  fetchData();
}, []);


  const toggleSos = () => {
    // Đảo ngược giá trị sosData
    const newSosData = sosData === 0 ? 1 : 0;
    setsosData(newSosData);
  };


  // Sử dụng hàm sendControlToFirebase để gửi giá trị tốc độ mới lên Firebase mỗi khi nó thay đổi
  useEffect(() => {
    // Tạo một hàm async để gửi dữ liệu lên Firebase
    const sendControlToFirebase = async () => {
      const database = getDatabase();
      const rwRef = ref(database, "rw");

      const data = {
        sos: sosData,
      };

      try {
        // Gửi dữ liệu lên Firebase bằng set
        await set(rwRef, data);
        console.log("Đã cập nhật giá trị tốc độ và sosData lên Firebase.");
      } catch (error) {
        console.error("Lỗi khi cập nhật giá trị lên Firebase:", error);
      }
    };

    // Gọi hàm sendControlToFirebase để gửi dữ liệu lên Firebase khi có sự thay đổi
    sendControlToFirebase();
  }, [ sosData]); 


 //Sử dụng hàm listenToFirebaseData để lắng nghe và cập nhật dữ liệu cho các biến
 useEffect(() => {

  // hop 1 
  listenToFirebaseData("Room1/read/humi", sethumiData);
  listenToFirebaseData("Room1/read/smoke", setsmokeData);
  listenToFirebaseData("Room1/read/temp", settempData);
  listenToFirebaseData("Room1/online/timestamp", settimestamp);


  // hop 2 

  listenToFirebaseData("Room2/read/humi", sethumiData2);
  listenToFirebaseData("Room2/read/smoke", setsmokeData2);
  listenToFirebaseData("Room2/read/temp", settempData2);
  listenToFirebaseData("Room2/online/timestamp2", settimestamp2);


  listenToFirebaseData("rw/sos", setsosData);
}, []);


// Gửi mail 


useEffect(() => {
  const sendMail = async (temperature, humidity, smoke, temperature2, humidity2, smoke2) => {
    try {
      const emailData = {
        user_name: 'DATN-Nam',
        user_email: 'bethu06022002@gmail.com',
        message: `Phòng 1: Nhiệt độ ${temperature}, Độ ẩm ${humidity}, Khói ${smoke}
                  Phòng 2: Nhiệt độ ${temperature2}, Độ ẩm ${humidity2}, khói ${smoke2}`,
      };

      // Gửi email bằng EmailJS
      const response = await emailjs.send(
        'service_ikjdpvi', // ID của service bạn đã tạo trên EmailJS
        'template_jo6ipmd', // ID của template bạn đã tạo trên EmailJS
        emailData,
        'mbm5JqtgOvY5-BI-Z' // publicKey
      );

      console.log('Email sent:', response);
      alert('Đã gửi mail thành công');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Gửi email thất bại');
    }
  };

  // Kiểm tra điều kiện và gọi hàm gửi email khi các biến thay đổi
  if (
    sosData === 1 &&
    tempData !== undefined &&
    humiData !== undefined &&
    smokeData !== undefined &&
    tempData2 !== undefined &&
    humiData2 !== undefined &&
    smokeData2 !== undefined
  ) {
    sendMail(
      tempData.toString(),
      humiData.toString(),
      smokeData.toString(),
      tempData2.toString(),
      humiData2.toString(),
      smokeData2.toString()
    );
  }
}, [sosData, tempData, humiData, smokeData, tempData2, humiData2, smokeData2]);
//...........



// hop 1

  const lastTimestamp = timestamp;

  const getStatusData = async () => {
    try {
      const response = await axios.get(
        "https://test2-d9c33-default-rtdb.firebaseio.com/Room1/online.json"
      );

      const result = response?.data;
      console.log('result', result);

      setnewtimestamp(result?.timestamp);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('newtimestamp:', newtimestamp);
  
  useEffect(() => {
    const intervalId = setInterval(getStatusData, 10000);
  
    if (lastTimestamp !== newtimestamp) {
      setstatus(1);
    } else {
      setstatus(0);
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [lastTimestamp, newtimestamp]);



// hop 2

  const lastTimestamp2 = timestamp2;

  const getStatusData2 = async () => {
    try {
      const response = await axios.get(
        "https://test2-d9c33-default-rtdb.firebaseio.com/Room2/online.json"
      );

      const result = response?.data;
      console.log('result', result);

      setnewtimestamp2(result?.timestamp2);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('newtimestamp2:', newtimestamp2);
  console.log('lastTimestamp2:', lastTimestamp2);
  console.log('timestamp2:', timestamp2);
  
  useEffect(() => {
    const intervalId = setInterval(getStatusData2, 10000);
  
    if (lastTimestamp2 !== newtimestamp2) {
      setstatus2(1);
    } else {
      setstatus2(0);
    }
  
    return () => {
      clearInterval(intervalId);
    };

  



  }, [lastTimestamp2, newtimestamp2]);



///....................


  return (

    <div className="content">
      <div className="header-main">
        <div style={{ backgroundColor: "white", borderRadius: "50%" }}>
          <img src={logo} style={{ width: "50px", height: "auto" }} />
        </div>
        <div className="text-header-main">
          <p style={{ marginBottom: "0px", fontWeight: "bold", textAlign: 'center' }}>
            HỆ THỐNG PHÁT HIỆN VÀ CẢNH BÁO CHÁY SỚM
          </p>
        </div>
        <div className="header-right" style={{ position: "relative" }}>
          <div
            className="dropdown-icon"
            onClick={toggleDropdown}
            style={{
              cursor: "pointer",
              display: "inline-block",
              marginRight: "20px",
              fontSize: "30px",
            }}
          >
            &#9776;
          </div>
          {showDropdown && (
            <div className="dropdown-content">
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>

      </div>



{/*     hop 1

*/}

      <div className="header-content">
        <div className="row align-items-center">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="date-time">
              <div style={{ fontSize: "large", fontWeight: "bolder" }}>{date}</div>
              <div style={{ fontSize: "large" }}>{time}</div>
            </div>
          </div>
          <div className="col-sm-1">
            {status == 1 ? (
              <img src={imgOnline} className="img-status" alt="Sample image" />
            ) : (
              <img src={imgOffline} className="img-status" alt="Sample image" />
            )}
          </div>
        </div>
      </div>

      <div className="textStatus" style={{ color: status === 1 ? 'green' : 'red' }}>
        Trạng thái: {status === 1 ? 'Đang hoạt động' : 'Mất kết nối'}
      </div>


      <div className="sos-btn">
        <div
          className={`toggle-switch ${sosData === 1 ? "active" : ""}`}
          style={{ borderColor: "red" }}
          onClick={toggleSos}
        >
          <div className={`text-sos-off ${sosData === 1 ? "hidden" : ""}`}>
            {sosData === 1 ? "Đang báo động" : "Trượt để báo động"}
          </div>
          <div className={`text-sos-on ${sosData === 1 ? "" : "hidden"}`}>
            Đang báo động
          </div>
          <div className={`toggle-slider ${sosData === 1 ? "active" : ""}`}>
            <p style={{ margin: "0px" }}>SOS</p>
          </div>
        </div>
      </div>
      <div className={`content ${status === 0 ? "grayed-out" : ""}`}>
  {isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="chart">
      <div className="text-box">Phòng 1</div>
      <HumidityChart humidity={humiData} />
      <SmokeChart smoke={smokeData} />
      <TemperatureChart temperature={tempData} />
    </div>
  )}
</div>



 {/*     hop 2

*/}
   
            
   <div className="header-content">
        <div className="row align-items-center">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div className="date-time">
              <div style={{ fontSize: "large", fontWeight: "bolder" }}>{date}</div>
              <div style={{ fontSize: "large" }}>{time}</div>
            </div>
          </div>
          <div className="col-sm-1">
            {status2 == 1 ? (
              <img src={imgOnline} className="img-status" alt="Sample image" />
            ) : (
              <img src={imgOffline} className="img-status" alt="Sample image" />
            )}
          </div>
        </div>
      </div>

      <div className="textStatus" style={{ color: status === 1 ? 'green' : 'red' }}>
        Trạng thái: {status2 === 1 ? 'Đang hoạt động' : 'Mất kết nối'}
      </div>



<div className={`content ${status2 === 0 ? "grayed-out" : ""}`}>
  {isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="chart">
      <div className="text-box">Phòng 2</div>
      <HumidityChart humidity={humiData2} />
      <SmokeChart smoke={smokeData2} />
      <TemperatureChart temperature={tempData2} />
    </div>
  )}
</div>
</div>
  );
}

export default App;
