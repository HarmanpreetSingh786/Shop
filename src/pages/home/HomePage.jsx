import Category from '../../components/category/Cartegory';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import HomePageProductCard from '../../components/homePageProductCard/HomePageProductCard';
import Track from '../../components/track/Track';
import { Link } from 'react-router-dom';


function HomePage() {
  return (
    <Layout>
      <HeroSection/>
      <Category/>
      {/* <Filter/> */}
      <HomePageProductCard/>
      {/* <SeeMore/> */}
      <div className='flex justify-center -mt-10 mb-4 sm:mt-5'>
      <Link to="/allproduct">
      <button className=' bg-gray-300 px-5 py-2 hover:bg-pink-700 hover:text-white rounded-xl'>See more</button>
      </Link>
      </div>
      <Track/>
    
    </Layout>
  )
}

export default HomePage

