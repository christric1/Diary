import * as React from "react"
import { Link, useStaticQuery, graphql} from "gatsby"
import Bio from "../components/bio"
import { Container, Row, Col, Nav, NavDropdown, SSRProvider } from "react-bootstrap"

const Layout = ({location, title, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY.MM.DD")
            title
            description
          }
        }
      }
    }
  `)

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const posts = data.allMarkdownRemark.nodes
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <SSRProvider>
    <Container className="global-wrapper">
      <header className="global-header">{header}</header>
      {isRootPath && <Bio/>}
      <Row>
        <Col md={2}>
          <Nav variant="tabs" as="ul" className="flex-md-column">
            <Nav.Link href="/photo">Photo</Nav.Link>

            <NavDropdown title="Diary" id="nav-dropdown">
              {posts.map(post => {
                return(                    
                  <NavDropdown.Item href={post.fields.slug}>{post.frontmatter.date}</NavDropdown.Item>
                )})}
            </NavDropdown>
          </Nav>
        </Col>

        <Col md={{ span: 9 }}>
          <main>{children}</main>
        </Col>
      </Row>
    </Container>
    </SSRProvider>
  )
}

export default Layout