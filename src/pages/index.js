import React, { useContext, useMemo } from "react";
import Layout from "../components/layout";
// import BannerImg from "../images/banner-img.png"
// import useDeviceSize from "../hooks/use-device-size";
import CanvasParticle from "../components/particles/canvasParticle";
import BubbleParticles from "../components/particles/bubbleParticles";
import { Context } from "../redux/store";
// import CardSocial from "../components/card/card-social";

const IndexPage = () => {

  // const deviceSizes = useDeviceSize();
  const { state, dispatch } = useContext(Context);
  // const randomNumber = Math.floor(Math.random() * 2);
  const randomNumber = useMemo(() => Math.floor(Math.random() * 2));

  return (
    <Layout pageClass="homepage">
      <section
        className="banner relative z-0 bg-cover bg-no-repeat bg-center text-white bg-[linear-gradient(to_left,_#42275a,_#734b6d)] flex items-center lg:min-h-[460px] before:absolute before:content-[''] before:inset-0 before:bg-gradient-to-r before:from-[#5B0C60] before:to-[#140215] before:-z-[1] after:absolute after:content-[''] after:inset-0 after:bg-[#350038]/50 before:hidden after:hidden"
        style={{
          paddingTop: state.headerHeight,
          // backgroundImage: `url(${(deviceSizes.mdDown ? BannerImg : BannerImg) ?? BannerImg})`
        }}
      >

        {randomNumber === 0 && <div className="z-10 h-full w-full absolute">
          <CanvasParticle />
        </div>}

        {randomNumber === 1 && <BubbleParticles />}

        <div className="container">
          <div className="relative z-[1] py-12 md:py-14 lg:py-16 2xl:pt-[7.9375rem] 2xl:pb-[6.9375rem]">
            <div className="max-w-[50.625rem] 2xl:max-w-[62.5rem] 2xl:text-[1.25rem] 2xl:leading-normal [&_p]:mb-3 [&_p_a]:underline [&_p_a:hover]:!no-underline [&_a:not(.btn)]:text-white hover:[&_a:not(.btn)]:underline hover:[&_a:not(.btn)]:opacity-80">
              <h1 className="text-white capitalize mb-1">Heading 1</h1>
              <h2 className="text-white font-medium capitalize">Heading 2</h2>
              <div className="max-w-[38.125rem] 2xl:max-w-[53.5rem]">
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

export default IndexPage

export const Head = () => <title>Home Page</title>
