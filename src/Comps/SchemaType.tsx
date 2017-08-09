import React from 'react';
import Fields from './Fields/index';
import visible from './Decorators/visible';
import UndefinedField from './Fields/Undefined';
import inference from './Decorators/inference';
import fromDefaultValue from './Decorators/fromDefaultValue';
import { update } from '../Store/actions';

import { Schema, Action, TYPESTRING } from '../../typings/types';

type SchemaProps = {
    schema: Schema,
    status: { [key: string]: {} },
    x?:string,
    path: string[],
    dispatch: (action: Action, ...args: {}[]) => any,
    editKey?: string,
    value?: {}
};

/**
 * Component generating the correct field based on schema.type
 * @constructor
 * @param {Object} props
 */
class SchemaType<P extends SchemaProps> extends React.Component<P> {
    static defaultProps = {
        path: []
    };
    onChange: ({ }) => void;
    constructor(props: P) {
        super(props);
        this.onChange = function onChange(...args: {}[]) {
            props.dispatch(update, props.path, ...args);
        };
    }
    render() {
        const { schema: { type } } = this.props;
        const renderType = Array.isArray(type)
            ? (type as TYPESTRING[]).find(t => t !== 'null')
            : type;
        let Type: React.ComponentClass<any> | React.SFC<any>;
        if (renderType === undefined || renderType === 'null') {
            Type = UndefinedField;
        } else {
            Type = Fields[renderType];
        }
        return <Type {...this.props} onChange={this.onChange} />;
    }
}

export default inference(fromDefaultValue(visible(SchemaType)));
