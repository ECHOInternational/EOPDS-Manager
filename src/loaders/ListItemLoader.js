import React from "react"
import ContentLoader from "react-content-loader" 

const ListItemLoader = (props) => {

    const speed = props.speed || 2;
    const width = props.width || 300;
    const height = props.height || 200;
    const backgroundColor = props.backgroundColor || '#f3f3f3';
    const foregroundColor = props.foregroundColor || '#ecebeb';

    return(
        <ContentLoader 
            speed={2}
            width='100%'
            height={200}
            viewBox="0 0 100% 400"
            preseveAspectRatio="xminYmin"
            backgroundColor='rgb(228,229,230)'
            foregroundColor='rgb(248,249,250)'
          >
            <rect x="10" y="20" rx="5" ry="5" width="100" height="15" /> 
            <rect x="10" y="72" rx="5" ry="5" width="180" height="15" /> 
            <rect x="10" y="126" rx="5" ry="5" width="100" height="15" /> 
            <rect x="10" y="177" rx="5" ry="5" width="190" height="15" /> 
            <rect x="0" y="53" rx="0" ry="0" width="100%" height="1" /> 
            <rect x="0" y="107" rx="0" ry="0" width="100%" height="1" /> 
            <rect x="0" y="159" rx="0" ry="0" width="100%" height="1" />
          </ContentLoader>
    )
}

export default ListItemLoader;