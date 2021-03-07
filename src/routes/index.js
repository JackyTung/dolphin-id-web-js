import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppV1 from '../containers/App'
import AppV2 from '../v2/containers/App'

const BaseRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/v2" component={AppV2} />
                <Route path="/" component={AppV1} />
            </Switch>
        </BrowserRouter>
    )
}

export default BaseRouter