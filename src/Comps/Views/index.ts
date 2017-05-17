import React from 'react';
import undefinedWidgetFactory from './undefinedWidgetFactory';
import TextWidget from './TextWidget';
import ArrowNumberWidget from './ArrowNumberWidget';
import CheckboxWidget from './CheckboxWidget';
import ArrayWidget from './ArrayWidget';
import ObjectWidget from './ObjectWidget';
import SelectWidget from './SelectWidget';

import { WidgetProp } from '../../types';

type WidgetMap = {
    [key: string]: React.ComponentClass<any> | React.SFC<any>
};
let DefaultWidget: WidgetMap = {
    string: TextWidget,
    number: TextWidget,
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: ObjectWidget,
    arrowNumber: ArrowNumberWidget,
    select: SelectWidget
};

function defaultWidget(type: string) {
    return DefaultWidget[type] || undefinedWidgetFactory(type);
}

function setDefaultWidgets(obj: WidgetMap) {
    DefaultWidget = Object.assign({}, DefaultWidget, obj);
}

export { defaultWidget, setDefaultWidgets, undefinedWidgetFactory };