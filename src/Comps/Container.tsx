import React from 'react';
import { root, branch } from 'baobab-react/higher-order';
import createTree from '../Store/index';
import SchemaType from './SchemaType';
import { setErrors } from '../Store/actions';
import validate from './../Utils/customValidator';

import { Schema } from '../types';

const BranchedSchemaType = branch(
    {
        schema: 'schema',
        status: 'status',
        value: 'value'
    },
    SchemaType
);

export type Props = {
    onChange: ({ }, errors?: {}[]) => any,
    schema: Schema,
    value?: {}
};

/**
 * Top Component
 */
class Container extends React.Component<Props, undefined> {
    static defaultProps = { schema: {} };
    private tree: any;
    private rooted: React.StatelessComponent<{
        onChange: (value: {}, errors?: {}[]) => void,
        path: string[]
    }>;
    props: Props;

    constructor(props: Props) {
        super(props);
        this.tree = createTree();
        this.updateTree(props.value, props.schema);
        this.rooted = root(this.tree, BranchedSchemaType);
    }
    componentDidMount() {
        this.tree
            .select('value')
            .on('update', (event: { data: { currentData: {} } }) =>
                this.props.onChange(
                    event.data.currentData,
                    validate(
                        event.data.currentData,
                        this.tree.get('schema'),
                        event.data.currentData
                    ).errors
                )
            );
    }
    componentWillReceiveProps(nextProps: Props) {
        if (
            nextProps.value === this.tree.get('value') &&
            nextProps.schema === this.props.schema
        ) {
            return;
        }
        this.updateTree(nextProps.value, nextProps.schema);
    }
    componentWillUnmount() {
        this.tree.release();
    }
    getValue() {
        return this.tree.get('value');
    }
    updateTree(value?: {}, schema?: Schema) {
        this.tree.set('value', value);
        this.tree.set('schema', schema);
        this.tree.set('status', {});
    }
    validate() {
        const validationResult = validate(
            this.tree.get('value'),
            this.tree.get('schema'),
            this.tree.get('value')
        );
        const errorMap = new Map<string, string[]>();
        // Collect each error associated with a given path
        validationResult.errors.forEach(error => {
            const errors = errorMap.get(error.property) || [];
            errors.push(error.message); // Add new error
            errorMap.set(error.property, errors);
        });
        errorMap.forEach((value, key) => {
            setErrors(
                this.tree,
                key.split(/\.|\[|\]/).filter(x => x !== '').slice(1),
                value
            );
        });
        return validationResult.errors;
    }
    render() {
        const Rooted = this.rooted;
        return <Rooted onChange={this.props.onChange} path={[]} />;
    }
}

export default Container;