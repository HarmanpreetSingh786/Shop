import React from 'react'
import ImageSlider from '../ImageSlider/ImageSlider';

  function HeroSection() {
  const images = [
    'https://devknus.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feeee8099-a731-4be4-b949-97588572fb6b%2Faf556a00-6601-4a15-8931-dab16ebd5981%2FUntitled.png?table=block&id=4ec2cb9b-b4a9-4de8-8195-725a3a795de5&spaceId=eeee8099-a731-4be4-b949-97588572fb6b&width=2000&userId=&cache=v2',
    'https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg',
    // Add more image URLs as needed
  ];
  return (
    <div >
    {images.length > 0 ? (
      <ImageSlider  images={images} />
    ) : (
      <p>No images available</p>
    )}
  </div>
  )
}

export default HeroSection
