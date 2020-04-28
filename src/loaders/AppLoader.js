import React from "react"
import ContentLoader from "react-content-loader" 

const AppLoader = (props) => (
    <ContentLoader 
        viewBox="0 0 600 400"
      >
        <rect x="20" y="20" rx="0" ry="0" width="560" height="50" /> 
        <rect x="120" y="80" rx="0" ry="0" width="460" height="50" /> 
        <rect x="20" y="80" rx="0" ry="0" width="90" height="300" /> 
        <rect x="140" y="280" rx="0" ry="0" width="100" height="100" /> 
        <rect x="260" y="280" rx="0" ry="0" width="100" height="100" /> 
        <rect x="380" y="280" rx="0" ry="0" width="100" height="100" /> 
        <circle cx="155" cy="175" r="15" /> 
        <rect x="140" y="220" rx="0" ry="0" width="380" height="15" /> 
        <rect x="190" y="163" rx="0" ry="0" width="360" height="30" /> 
        <rect x="140" y="250" rx="0" ry="0" width="380" height="15" />
      </ContentLoader>
)

export default AppLoader