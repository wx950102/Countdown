import React, { Component } from 'react';
import { View, Text } from 'react-native';
export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
  }
  componentDidMount() {
    const { expirationDate } = this.props;
    clearInterval(this.timer);
    if (expirationDate) {
      let endTime = expirationDate.replace(/-/g, '/');
      this.countFun(endTime);
    }
  }
  //组件卸载取消倒计时
  componentWillUnmount() {
    this.setState({ expirationDate: 0 });
    clearInterval(this.timer);
  }

  countFun = (time) => {
    let end_time = new Date(time).getTime(),
      sys_second = end_time - new Date().getTime();
    this.timer = setInterval(() => {
      //防止倒计时出现负数
      if (sys_second > 1000) {
        sys_second -= 1000;
        let day = Math.floor(sys_second / 1000 / 3600 / 24);
        let hour = Math.floor((sys_second / 1000 / 3600) % 24);
        let minute = Math.floor((sys_second / 1000 / 60) % 60);
        let second = Math.floor((sys_second / 1000) % 60);
        this.setState({
          day: day,
          hour: hour < 10 ? '0' + hour : hour,
          minute: minute < 10 ? '0' + minute : minute,
          second: second < 10 ? '0' + second : second,
        });
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  };
  render() {
    const { day, hour, minute, second } = this.state;
    return (
      <View>
        <Text>竞价截止:{day !== 0 || hour !== 0 || minute !== 0 || second !== 0 ? `${day}天${hour}小时${minute}分${second}秒` : `已结束`}</Text>
      </View>
    );
  }
}
