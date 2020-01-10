import React from "react";
import {
    Form,
    Row,
    Col,
    Input,
    Button
} from "antd";
import { FormComponentProps } from "antd/lib/form";

import { ValidateStatuses } from "../../types/types";

interface IProps {
    value: string;
    validateExplanation: string;
    validateStatus: (typeof ValidateStatuses)[number];
    validate: (text: string) => boolean;
    handleChange: (event: any) => void;
    submit: (event: any) => void;
}

const _SubmitForm: React.FC<IProps & FormComponentProps> = (
    {
        form,
        value,
        validateExplanation,
        validateStatus,
        validate,
        handleChange,
        submit
    }) => {
    const { getFieldDecorator } = form;

    const validateValue = async (rule: any, value: string) => {
        let isValid = validate(value);
        if (!isValid) {
            throw new Error(validateExplanation);
        }
    };

    return (
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={24}>
                <Col span={18}>
                    <Form.Item
                        label={<span style={{ fontWeight: "bold" }}>Set value</span>}
                        hasFeedback
                        validateStatus={validateStatus}
                        help={<span style={{ fontStyle: "italic" }}>{validateExplanation}</span>}
                    >
                        {getFieldDecorator("label", {
                            initialValue: value,
                            rules: [
                                { required: true, message: "Please input your value" },
                                { validator: validateValue }
                            ]
                        })(
                            <Input
                                placeholder="value"
                                onChange={handleChange}
                                style={{ width: "400px" }}
                            />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={submit}>Add</Button>
                </Col>
            </Row>
        </Form>
    );
};

const SubmitForm = Form.create<IProps & FormComponentProps>()(_SubmitForm);

export default SubmitForm;