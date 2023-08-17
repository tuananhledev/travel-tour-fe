import { Avatar, Card } from 'antd';
import React from 'react'
import Slider from 'react-slick'

const { Meta } = Card;

const Carousel = () => {

   let settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 600,
      autoplaySpeed: 1500,
      slidesToShow: 3,
      slidesToScroll: 2,
      initialSlide: 0,
      arrows: false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         },
      ],
   };

   return (
      <Slider {...settings}>
         <Card className='card-carousel-item'>
            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
            <Meta
               className='carousel-meta'
               avatar={<Avatar src="images/ava-3.jpg" />}
               title="Van Duong"
               description="This is the description"
            />
         </Card>
         <Card className='card-carousel-item'>
            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
            <Meta
               className='carousel-meta'
               avatar={<Avatar src="images/ava-3.jpg" />}
               title="Chan Hiep"
               description="This is the description"
            />
         </Card>
         <Card className='card-carousel-item'>
            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
            <Meta
               className='carousel-meta'
               avatar={<Avatar src="images/ava-3.jpg" />}
               title="Duy Khang"
               description="This is the description"
            />
         </Card>
         <Card className='card-carousel-item'>
            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
            <Meta
               className='carousel-meta'
               avatar={<Avatar src="images/ava-3.jpg" />}
               title="Chan Hiep"
               description="This is the description"
            />
         </Card>
         <Card className='card-carousel-item'>
            <p>Our Vietnam is a beautiful country. We have a variety of landscapes which are widely well-known such as Ha Long Bay, Hoi An Old quarter and Phong Nha Ke Bang cave. A long coast with many attractive beaches is also our recognized reputation.</p>
            <Meta
               className='carousel-meta'
               avatar={<Avatar src="images/ava-3.jpg" />}
               title="Duy Khang"
               description="This is the description"
            />
         </Card>

      </Slider>
   )
}

export default Carousel