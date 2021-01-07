import React from "react"
import ContentLoader from "react-content-loader" 

const SideBarNavLoader = () => (
  <ContentLoader 
    speed={2}
    width={275}
    viewBox="0 0 600 600"
    backgroundColor="rgb(47, 53, 58)"
    foregroundColor="rgb(57, 63, 68)"
    style={{padding: '10px'}}
  >
    <circle cx="48" cy="48" r="20" /> 
    <circle cx="48" cy="216" r="20" /> 
    <circle cx="48" cy="310" r="20" /> 
    <circle cx="48" cy="397" r="20" /> 
    <circle cx="48" cy="565" r="20" /> 
    <rect x="28" y="121" rx="0" ry="0" width="320" height="20" /> 
    <rect x="28" y="475" rx="0" ry="0" width="320" height="20" /> 
    <rect x="80" y="34" rx="0" ry="0" width="230" height="28" /> 
    <rect x="80" y="202" rx="0" ry="0" width="230" height="28" /> 
    <rect x="80" y="296" rx="0" ry="0" width="200" height="28" /> 
    <rect x="80" y="383" rx="0" ry="0" width="250" height="28" /> 
    <rect x="80" y="551" rx="0" ry="0" width="230" height="28" />
  </ContentLoader>
)

export default SideBarNavLoader