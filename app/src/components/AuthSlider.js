import React from 'react'
import { Carousel } from 'antd'
const AuthSlider = () => {
  return (
    <Carousel dots={false} draggable autoplay>
      <div>
        <img
          className="img-carousel"
          src="https://static.standard.co.uk/2021/09/15/09/travel-to-france.jpg?width=968&auto=webp&quality=50&crop=968%3A645%2Csmart"
          alt=""
        ></img>
      </div>
      <div>
        <img
          className="img-carousel"
          src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/hinh-anh-tuong-nu-than-tu-do-doc-dao.jpg"
          alt=""
        ></img>
      </div>
    </Carousel>
  )
}

export default AuthSlider
