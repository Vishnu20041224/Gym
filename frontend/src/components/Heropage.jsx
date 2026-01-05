import heropage from '../assets/img/hero.png'
import { TextRoll } from '@/components/core/text-roll';
import { TextEffect } from "@/components/motion-primitives/text-effect";
const HeroPage = () => {
  return (
    <div className="h-screen w-full relative">
      <img
        src={heropage}
        alt="Hero"
        className="h-full w-full object-cover"
      />
      <div className='top-0 left-0 absolute bg-black/60 h-full w-full'></div>
      <div className='top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 text-center w-full'>
        <TextEffect per='char' preset='fade' className='text-3xl md:text-4xl lg:text-7xl font-semibold px-3 md:px-6 lg:px-20 block'>Unleash Your Potential. Transform Your Body.</TextEffect >
        <button className='py-1.5 font-normal px-4 rounded-3xl mt-7 btn-primary text-xs md:text-xl cursor-pointer text-black'>Join Now </button>
      </div>
    </div>
  )
}

export default HeroPage
