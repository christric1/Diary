import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const photoList = ({ data, location }) => {
    const nodes = data.allFile.nodes
    const siteTitle = data.site.siteMetadata?.title || `Title`

    return(
        <Layout location={location} title={siteTitle}>
            {nodes.map(node => {
                const image = getImage(node)
                return(
                    <GatsbyImage image={image}/>
                )
            })}
        </Layout>
    )
}

export const Head = () => <Seo title="Photo" />
export default photoList

export const query = graphql`
    query {
        site {
            siteMetadata {
              title
            }
        }
        allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, dir: {regex: "../images/DCNLab/"}}){
            nodes{
                childImageSharp {
                        gatsbyImageData(width: 200)
                }
            }
        }
    }
`