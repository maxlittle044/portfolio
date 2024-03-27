import * as React from "react";
import Layout from "../components/layout";
import CardSocial from "../components/card/card-social";


const IndexPage = () => {
  return (
    <Layout pageClass="homepage">
      <div></div>
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
