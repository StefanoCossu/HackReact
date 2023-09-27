import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import { FreeMode, Navigation, Thumbs, Autoplay} from 'swiper/modules';
import { useState } from 'react';
export default function Carousel({slide}){
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
    <div className=" overflow-hidden">
      <Swiper
        loop={true}
        speed={1000}
        autoplay={{
                     delay: 2500,
                     disableOnInteraction: false,
                  }}
        spaceBetween={0}
        draggable={true}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {slide.map( (el,index) => {
      return  (
      <SwiperSlide className="swiper-slide relative overflow-hidden" key={index}>
        <Link to={`/game/${el.game_id}`}>
        <p className='etiquette absolute z-10 bottom-4 left-6 border-2 px-2 dark:bg- text-white bg-[#6a93cb] border-[#14496c] dark:bg-[#14496cb3]'>{el.game_name}</p>
        <img src={el.game_image} className="swiper-slideImg w-[90vw]" alt={el.game_name} />
        </Link>   
        </SwiperSlide>)
    })}
       
      </Swiper>
    </div>
      
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        navigation={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, ]}
        className="mySwiper"
      >
        {slide.map( (el,index) => {
      return  (<SwiperSlide className="swiper-Minislide" key={index} >
        <img className="" src={el.game_image}  alt={el.game_name} /> 
        </SwiperSlide>)
    })}
      </Swiper>
    </>
  );
}

    
