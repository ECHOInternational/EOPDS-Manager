import React from "react"
import ContentLoader from "react-content-loader" 

const TileLoader = () => (
  <ContentLoader 
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 550 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="card-grid-item"
  >
    <rect x="0" y="0" rx="0" ry="0" width="550" height="330" /> 
    <rect x="0" y="335" rx="0" ry="0" width="550" height="130" />
  </ContentLoader>
)

export default TileLoader