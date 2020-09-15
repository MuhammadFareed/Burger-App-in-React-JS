import React, { Component } from 'react';
import Auxilliary from '../Auxilliary/Auxilliary';
import Modal from '../../components/UI/Modal/Modal';
import Axios from '../../axios/axios-orders';

const WithErrorHandler = (WrappedComponent) => {
      return class extends Component {
            constructor(props) {
                  super(props);
                  this.reqInterceptor = Axios.interceptors.request.use(req => {
                        this.setState({
                              error: null
                        });
                        return req;
                  });
                  this.resInterceptor = Axios.interceptors.response.use(res => res, error => {
                        this.setState({
                              error: error
                        })
                  });
                  this.state = {
                        error: null 
                  }
            }
            componentWillUnmount = () => {
                  Axios.reqInterceptors.request.eject(this.reqInterceptor);
                  Axios.resInterceptors.response.eject(this.resInterceptor);
            }


            // componentWillMount = () => {
            //       Axios.interceptors.request.use(req => {
            //             this.setState({
            //                   error: null
            //             });
            //             return req;
            //       })
            //       Axios.interceptors.response.use(res => res, error => {
            //             this.setState({
            //                   error: error
            //             })
            //       })
            // }

            errorConfirmedHandler = () => {
                  this.setState({
                        error: null
                  })
            }
            render() {
                  return (
                        
                        <Auxilliary>
                              <Modal show={this.state.error}
                                    modalClosed={this.errorConfirmedHandler}
                              >
                                    {this.state.error ? this.state.error.message : null}
                              </Modal>
                              <WrappedComponent {...this.props}/>
                        </Auxilliary>
                  )
            }
      }
}

export default WithErrorHandler;
