import React, { Component } from "react";
import { Button } from 'antd'
import './index.less'

class Home extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className='home'>home 
      <Button>哈哈</Button>
    </div>;
  }
}
export default Home;
