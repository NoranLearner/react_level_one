import React from 'react'
import './MainContent.css'

const MainContent = ({pageName, designer="Noran"}) => {
    return (
        <main>
            {pageName}
            <br/>
            Designed by {designer}
        </main>
    )
}

export default MainContent;