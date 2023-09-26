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
      <Swiper
        loop={true}
        speed={1000}
        autoplay={{
                     delay: 2500,
                     disableOnInteraction: false,
                  }}
        spaceBetween={10}
        draggable={true}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {slide.map( (el,index) => {
      return  (
      <SwiperSlide className="swiper-slide" key={index}>
        <Link to={`/game/${el.game_id}`}>
        <div className='relative'>
        <p className='absolute text-white bottom-0 left-1 bg-cyan-500 border-red-500 p-2 mb-1'>{el.game_name}</p>
        <img src={el.game_image} className="swiper-slideImg w-[90vw]" alt={el.game_name} />
        </div>
        </Link>   
        </SwiperSlide>)
    })}
       
      </Swiper>
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
      return  (<SwiperSlide className="swiper-slide" key={index} >
        <img src={el.game_image}  alt={el.game_name} /> 
        </SwiperSlide>)
    })}
      </Swiper>
    </>
  );
}

    
