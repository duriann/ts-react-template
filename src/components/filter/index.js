import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Row, Col, Input, Button, Icon, Select, DatePicker} from 'antd';
import Cascader from '../cascader/index';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleReset = this._handleReset.bind(this);
    this._getFields = this._getFields.bind(this);
    this._getFormItem = this._getFormItem.bind(this);
  }

  _handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.handleSearch(values);
    });
  }

  _handleReset() {
    this.props.form.resetFields();
    //处理重置时，出现联动下拉表存在下拉值问题
    this.props.filterData && this.props.filterData.map((item) => {
      if(item.type === 'cascader') {
        let linkage = item.linkage;
        linkage.map((option, index) => {
          if(index !== 0) {
            option.data = [];
          }
        });
      }
    });
    this.props.handleReset();
  }

  _getFormItem(option) {
    switch (option.type) {
      case 'select':
        return (
          <Select placeholder={option.placeholder}>
            {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">全部</Option>}
            {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
          </Select>
        );
        break;
      case 'datepicker':
        return <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>;
        break;
      default:
        return <Input placeholder={option.placeholder}/>;
    }
  }

  _getFields() {
    const {filterData} = this.props;
    const {getFieldDecorator} = this.props.form;
    const that = this;
    return filterData && filterData.map((option, i) => {
      if(option.type === 'cascader') {
        return (
          <Cascader
            data={option.linkage}
            key={i}
            form={that.props.form}
            handleChange={this.props.handleChange}
          />
        )
      } else {
        return (
          <div key={i}>
            <FormItem label={option.name}>
              {getFieldDecorator(`${option.id}`)(
                that._getFormItem(option)
              )}
            </FormItem>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <Form
        layout="inline"
        className="filter-form"
        onSubmit={this._handleSearch}
      >
          {this._getFields()}
          <div className="btnContainer">
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button className="reset" onClick={this._handleReset}>重置</Button>
          </div>
      </Form>
    );
  }
}

Filter.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.object),
  handleSearch: PropTypes.func,
  handleReset: PropTypes.func
}