import gsap from "gsap"
import { useEffect, useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import { heroVideo, smallHeroVideo } from "../utils"

const Hero = () => {

  const [videoSrc, setvideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
  const videoRef = useRef();

  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760){
      setvideoSrc(smallHeroVideo)
    }
    else{
      setvideoSrc(heroVideo)
    }
  }

  useGSAP(()=> {
    gsap.to('.hero-video', {
      scrollTrigger: {
        trigger: '.hero-video',
        toggleActions: 'play restart reverse restart',
      },
      onComplete: ()=>{
          videoRef.current.play()
      }
    })
  }, [])

  useEffect(()=>{
    window.addEventListener('resize', handleVideoSrcSet)

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet)
    }
  }, [])

  useGSAP(()=> {
    gsap.to ('#hero', {opacity: 1, delay: 1.5})
    gsap.to ('#cta', {opacity: 1, delay: 2, translateY:0})
  }, [])


  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-4/6 w-full flex-center flex-col'>
        <p className='hero-title' id="hero">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-5/12">
          <video ref={videoRef}  muted playsInline={true} key={videoSrc} className="pointer-events-none hero-video">
            <source src={videoSrc} type="video/mp4"/>
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
            <a href="#highlights" className="btn">Buy</a>
            <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero