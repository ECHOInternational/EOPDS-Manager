import React from "react"
import ContentLoader from "react-content-loader" 

const TileGridLoader = () => (
  <ContentLoader 
    speed={2}
    width={600}
    height={450}
    viewBox="0 0 600 450"
    backgroundColor='rgb(228,229,230)'
    foregroundColor='rgb(248,249,250)'
  >
    <rect x="0" y="0" rx="0" ry="0" width="190" height="200" /> 
    <rect x="205" y="0" rx="0" ry="0" width="190" height="200" /> 
    <rect x="410" y="0" rx="0" ry="0" width="190" height="200" /> 
    <rect x="0" y="215" rx="0" ry="0" width="190" height="200" /> 
    <rect x="205" y="215" rx="0" ry="0" width="190" height="200" /> 
    <rect x="410" y="215" rx="0" ry="0" width="190" height="200" />
  </ContentLoader>
)

export default TileGridLoader