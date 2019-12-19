import React, { Component } from 'react';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import MapContainer from '../../custom/map';

class GMap extends Component {
    render() {
        return (
            <div class='animate fadeIn'>
                <CardColumns className="cols-2">
                    <Card>
                        <CardHeader>
                            THE MAP
                            <MapContainer />
                        </CardHeader>
                    </Card>
                </CardColumns>
            </div>
        )
    }
}