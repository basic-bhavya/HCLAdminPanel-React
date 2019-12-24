import React, { Component } from 'react';
// import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import MapContainer from '../FullMap/map';

class GMap extends Component {
    render() {
        return (
            // <div class='animate fadeIn'>
            //     <CardColumns className="cols-md-3">
            //         <Card>
            //             <CardHeader>
            //                 THE MAP
            //             </CardHeader>
            //             <CardBody>
            //                 <MapContainer />
            //             </CardBody>
            //         </Card>
            //     </CardColumns>
            // </div>
            <MapContainer />
            
        )
    }
}

export default FullMap