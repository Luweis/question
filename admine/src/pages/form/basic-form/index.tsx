import {
  Button,
  Card, Checkbox,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Row,
  Col, Upload
} from 'antd';
import {FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import React, {Component} from 'react';

import {Dispatch} from 'redux';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class BasicForm extends Component<BasicFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'formBasicForm/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {submitting} = this.props;
    const {
      form: {getFieldDecorator, getFieldValue},
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    const p1 = {
      name: 'file',
      action: 'http://localhost:8090/upload',
    };
    return (
      <PageHeaderWrapper content={<FormattedMessage id="form-basic-form.basic.description"/>}>
        <Card bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>
            <Form.Item label="题目名称">
              {getFieldDecorator('username', {
                rules: [{required: true, message: 'Please input your username!'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="Username"
                />,
              )}
            </Form.Item>

            <Form.Item label="多选">
              {getFieldDecorator('mutable', {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox>多选</Checkbox>)}
            </Form.Item>
            <Row >
              <Col {...formItemLayout.labelCol}>
                <h3 style={{textAlign: 'right'}}>添加答案</h3>
              </Col>
            </Row>

            <Form.Item label="答案描述">
              {getFieldDecorator('username', {
                rules: [{required: true, message: 'Please input your username!'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder="请输入答案的描述"
                />,
              )}
            </Form.Item>
            <Upload  listType='picture' {...p1} >
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>

            <Form.Item {...submitFormLayout} >
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicFormProps>()(
  connect(
    ({loading}: { loading: { effects: { [key: string]: boolean } } }) => ({
      submitting: loading.effects['formBasicForm/submitRegularForm'],
    }))(BasicForm),
);
