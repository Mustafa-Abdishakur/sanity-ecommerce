import React from 'react';
import FirstBanner from '../banners/banner-1/banner';
import Navigation from '../navigation/navigation';

const header = (props) => {
    return ( 
        <header>
           <Navigation />
            <FirstBanner banners={props.banners} />
        </header>
    )

}

export default header;