import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './components/main-page/main-page';
import {Provider} from 'react-redux';
import {store} from "./store";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TaskPage from "./components/task-page/task-page";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <Route path="/" exact component={MainPage} />
                <Route path="/tasks/:id" component={TaskPage} />
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);