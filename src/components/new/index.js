import React, {Component} from 'react';
import {Form, Input, Button, Icon, Select, DatePicker, Divider, InputNumber, Checkbox, Switch} from 'antd';
import Cascader from '../cascader/index';
import * as Util from '../../../util/';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;


export default class New extends Component {
  constructor(props) {
    super(props);

    this._handelRegister = this._handelRegister.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._getFields = this._getFields.bind(this);
    this._getFormItem = this._getFormItem.bind(this);
    this._getEndDate = this._getEndDate.bind(this);

    this.state = {
      provinces: [],
      endDate: ''
    };
  }

  componentWillMount() {
    this.props.getCommonSelect && this.props.getCommonSelect();
  }

  //获取四级选择卡类型的截止时间
  _getEndDate(endDate) {
    this.setState({'endDate': endDate}, () => {
      console.log(this.state)
    })
  }

  _handelRegister(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('NewComponent组件调接口原始表单参数:', values);
      if (!err) {
        //如果有CheckBox类型的，将true改成1，undefined改为0
        let datas = this.props.newData;
        if (datas) {
          datas.forEach((data) => {
            if (data.type === 'checkbox') {
              let value = values[data.id];
              values[data.id] = value ? 1 : 0;
            }
            if (data.type === 'switch') {
              let value = values[data.id];
              values[data.id] = value ? 1 : 0;
            }
            if (data.type === 'select') {
              let value = values[data.id];
              values[data.id] = value === 'undefined' ? undefined : value;
            }
          });
        }
        console.log('NewComponent组件调接口处理后参数:', values);
        //执行父组件的addNew函数（在父组件redux调接口）
          if(!!Util.getUrlArg("from")){
              values.customerId = Util.getUrlArg("id");
          }
        this.props.addNew(values);
      }
    });
  }

  _handleBack() {
    this.props.history.goBack();
  }

  _getFormItem(option) {
    switch (option.type) {
      case 'select':
        return (
          <Select>
            {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">请选择</Option>}
            {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
          </Select>
        );
        break;
      case 'datepicker':
        return <DatePicker format="YYYY-MM-DD"/>;
        break;
      case 'switch':
        return <Switch checkedChildren="是" unCheckedChildren="否"/>;
        break;
      case 'showTime':
        return <Input disabled placeholder={Util.fmtDate(new Date())}/>;
        break;
      case 'showEndDate':
        return <Input disabled placeholder={this.state.endDate}/>;
        break;
      case 'textarea':
        return <TextArea rows={4}/>;
        break;
      case 'number':
        return <InputNumber min={option.min} max={option.max} placeholder={option.placeholder} style={option.styles}/>;
        break;
      case 'checkbox':
        return <Checkbox/>;
        break;
      default:
        return <Input placeholder={option.placeholder} disabled={option.isDisabled} type={option.type == 'password' ? 'password' : ''}/>;
    }
  }

  _getFields() {
    const {getFieldDecorator} = this.props.form;
    const that = this;
    return that.props.newData.map((option, i) => {
      if (option.isHide === 'true') {//隐藏的条目
        return (
          <div key={i} style={{display: 'none'}}></div>
        );
      } else if (option.type === 'cascader') {
        return (//将父组件的form传递给子组件，共用一个form控件
          <Cascader
            data={option.linkage}
            key={i}
            form={that.props.form}
            handleChange={this.props.handleChange}
          />
        )
      } else {
        let decoratorRules = option.type === 'checkbox' ? {
          valuePropName: 'checked',
          initialValue: option.initialValue
        } : {
          rules: [{
            required: option.isRequired, message: '不能为空！',
          }],
          initialValue: option.initialValue
        }

        return (
          <FormItem label={option.name} key={i}>
            {getFieldDecorator(`${option.id}`, decoratorRules
            )(
              that._getFormItem(option)
            )}
          </FormItem>
        );
      }
    });
  }

  render() {
    return (
      <Form
        layout={'inline'}
        className="new-form"
        onSubmit={this._handelRegister}
      >
        {/*此处动态生成表单域*/}
        {this._getFields()}
        <div className='btnItem' style={this.props.isBtnsInline ? {'display': 'inline-block', marginTop: '-15px'} : {}}>
          <Button type="primary" htmlType="submit">提交</Button>
          {this.props.isHideResetBtn ? '': <Button className="reset" onClick={this._handleBack}>返回</Button>}
          {/*根据pathname判断，只有在会员注册需要第三个按钮*/}
          {/*{this.props.history.location.pathname == '/member/member/new' ?
            (<Link to="./newEcard">
              <Button>其他身份注册</Button>
            </Link>) : null
          }*/}
        </div>
      </Form>
    );
  }
}

New.propTypes = {
  newData: PropTypes.arrayOf(PropTypes.object),
  addNew: PropTypes.func,
  history: PropTypes.object,
}
