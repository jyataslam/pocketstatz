import React, { Component } from 'react';
import axios from 'axios';
import { BadProxy, DefaultError, NoApache, NotFound } from './errors';

const apiPath = '/api/test.php';
const proxyExample = `
"proxy": {
  "/api/*": {
    "target": "http://localhost:8000"
  }
}

`;

class ApiTest extends Component {
    state = {
        apiStatus: null,
        help: null,
        message: `Attempting API request to: "${apiPath}"`
    }

    componentDidMount(){
        this.testApi();
    }

    resetAndRunTest = () => {
        this.setState({
            apiStatus: null,
            help: null,
            message: `Attempting API request to: "${apiPath}"`
        }, () => {
                setTimeout(() => {
                    this.testApi();
                }, 750);
        });
    }

    async testApi(){
        try {
            const { data, status } = await axios.get(apiPath);

            if(status === 200 && typeof data === 'string'){
                const error = new Error('API test failed, it looks like your proxy is not setup. See below for more detailed help.');

                error.response = { status: 305 };

                throw error;
            }
            
            if (data.success && data.key === 'this is here to make sure you called the correct file'){
                this.setState({
                    apiStatus: true,
                    help: null,
                    message: data.message
                });
            } else {
                const error = new Error('Your Apache is working but the root directory is not correct');

                error.response = { status: 404 };

                throw error;
            }

            
        } catch(error){
            const { message, response: { status } = {} } = error;
            let userMessage = '';
            let help = null;

            switch(status){
                case 305:
                    userMessage = message;
                    help = <BadProxy example={proxyExample}/>;
                    break;
                case 404:
                    userMessage = 'Unable to find the correct file: "/api/test.php". This means your apache is running and on the correct port but the document root is not correct'
                    help = <NotFound/>;
                    break;
                case 504:
                    userMessage = 'Unable to communicate with Apache server, either Apache is not running or your proxy settings are incorrect. See below steps for more detailed help.';
                    help = <NoApache example={proxyExample}/>;
                    break;
                default:
                    userMessage = 'An unknown error ocurred when trying to call your Apache server'
                    help = <DefaultError error={error}/>;
            }

            this.setState({
                apiStatus: false,
                help,
                message: userMessage
            });
        }
    }

    render(){
        const { apiStatus, help, message } = this.state;

        const status = apiStatus
            ? {
                class: 'success',
                text: 'OK'
            } : apiStatus === null
                ? {
                    class: 'testing',
                    text: 'TESTING'
                }
                : {
                    class: 'failed',
                    text: 'OFFLINE'
                }

        return (
            <div className="api-test">
                <div className="api-header center">
                    <h1>API Status: [<span className={`api-status ${status.class}`}>{status.text}</span>]</h1>
                    <h2>{message}</h2>
                </div>
                <div className="help-container">{help}</div>
                <div className="api-actions center">
                    <button className="btn" onClick={this.resetAndRunTest}>Test API</button>
                </div>
            </div>
        );
    }
}

export default ApiTest;
