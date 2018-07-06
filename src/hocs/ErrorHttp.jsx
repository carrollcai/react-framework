import axios from 'axios';
import React, { Component } from 'react';

export default (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false
      };
    }

    componentWillMount() {
      this.intercetor();
    }

    // 通过refs访问到组件实例
    // ref的回调会在WrappedComponent组件渲染的时候执行，这时候就可以得到WrappedComponent的引用，就可以读取和添加实例的props，调用实例方法。
    proc(WarppedComponentInstance) {
      // console.log(WarppedComponentInstance); // 实例本身
      // console.log(WarppedComponentInstance.method); // 实例方法
    }

    intercetor() {
      axios.interceptors.response.use(res => {
        if (res.data.errorInfo.code === '-1') {
          this.setState({
            error: true
          });
        }
        return res;
      }, err => {
        this.setState({
          error: true
        });
        return Promise.reject(err);
      });
    }

    render() {
      let { error } = this.state;
      let props = Object.assign({}, this.props, {
        ref: this.proc.bind(this)
      })
      return (
        <div>
          {error ?
            <div> 页面发生错误</div>
            :
            <WrappedComponent {...props} />
          }
        </div>
      )
    }
  }
}
