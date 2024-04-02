import * as React from "react";
import Layout from "../components/layout";
// import CardSocial from "../components/card/card-social";


const IndexPage = () => {
  return (
    <Layout pageClass="homepage">
      <div className="container">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p> <strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</strong> Accusantium deserunt ab iusto ad obcaecati! Illum repellendus voluptatem ullam iure doloribus, excepturi ratione, necessitatibus fuga natus amet exercitationem a consequuntur ad.</p>
      </div>

      <section className="banner py-4">
        <div className="container">

        </div>
      </section>
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
