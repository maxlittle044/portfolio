import React, { useContext, useMemo } from "react";
import Layout from "../components/layout";
// import BannerImg from "../images/banner-img.png"
// import useDeviceSize from "../hooks/use-device-size";
import CanvasParticle from "../components/particles/canvasParticle";
import BubbleParticles from "../components/particles/bubbleParticles";
import { Context } from "../redux/store";
import ElectricWizardParticle from "../components/particles/electricWizardParticle";
import CardIcon from "../components/card/cardIcon";
import GlassmorphismSquareParticle from "../components/particles/glassmorphismSquareParticles";
// import CardSocial from "../components/card/card-social";

const allAnimation = [CanvasParticle, BubbleParticles, ElectricWizardParticle, GlassmorphismSquareParticle]

const IndexPage = () => {

  // const deviceSizes = useDeviceSize();
  const { state } = useContext(Context);
  const randomNumber = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * allAnimation.length);
    return randomNumber;
  }, []);
  const Animation = useMemo(() => {
    return allAnimation[randomNumber]
  }, [randomNumber]);

  return (
    <Layout pageClass="homepage">
      <section className="banner relative z-0 bg-cover bg-no-repeat bg-center text-white bg-[linear-gradient(to_left,_#42275a,_#734b6d)] flex items-center min-h-[460px] md:min-h-[520px] lg:min-h-[560px]"
        style={{
          paddingTop: state.headerHeight,
          // backgroundImage: `url(${(deviceSizes.mdDown ? BannerImg : BannerImg) ?? BannerImg})`
        }}
      >
        <Animation />

        <div className="container">
          <div className="relative py-12 md:py-14 lg:py-16 2xl:pt-[7.9375rem] 2xl:pb-[6.9375rem]">
            <div className="max-w-[50rem] 2xl:max-w-[62rem] [&_p]:mb-3 [&_p_a]:underline [&_p_a:hover]:no-underline [&_a:not(.btn)]:text-white hover:[&_a:not(.btn)]:underline hover:[&_a:not(.btn)]:opacity-80">
              <h1 className={`text-white capitalize mb-2 ${randomNumber === 0 ? 'relative z-20 inline-block' : ''}`}>Heading 1</h1>
              <h2 className={`text-white font-medium capitalize mb-1 ${randomNumber === 0 ? 'relative z-20 w-max' : ''}`}>Heading 2</h2>
              <div className={`max-w-[38rem] 2xl:max-w-[50rem] ${randomNumber === 0 ? 'lg:relative lg:z-20 lg:w-max' : ''}`}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus debitis perferendis adipisci laborum delectus ad, nemo quibusdam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p> <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</strong> Accusantium deserunt ab iusto ad obcaecati! Illum repellendus voluptatem ullam iure doloribus, excepturi ratione, necessitatibus fuga natus amet exercitationem a consequuntur ad.</p>
        <div className="flex flex-wrap justify-center -mx-4 mb-4 md:mb-6">
          <div className="flex-[0_0_auto] w-full sm:w-1/2 lg:w-1/3 px-4">
            <CardIcon />
          </div>
        </div>
      </div>

      {/* <div className="container">
        <CardSocial
          facebook
          Instagram
          linkedIn
          twitter
        />
      </div> */}
    </Layout>
  )
}

export default IndexPage;

export const Head = () => <title>Home Page</title>
