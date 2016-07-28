function createCommonjsModule(e,t){return t={exports:{}},e(t,t.exports),t.exports}function updateDefault(e){var t=e.value,n=e.path,r=e.actions,a=e.schema.value,o=void 0!==t?t:a;t!==o&&r.setDefaultValue(n,o)}function fromDefaultValue(t){var n=function(n){function r(e){classCallCheck(this,r);var t=possibleConstructorReturn(this,Object.getPrototypeOf(r).call(this,e));return updateDefault(e),t}return inherits(r,n),createClass(r,[{key:"componentWillReceiveProps",value:function(e){updateDefault(e)}},{key:"render",value:function(){return e.createElement(t,this.props)}}]),r}(e.Component);return n}function undefinedWidgetFactory(t){return function(){return e.createElement("span",null,"Widget for '"+t+"' was not defined")}}function labeled(t){function n(n){var r=n.schema.required,a=r?"required":"";return e.createElement("div",null,e.createElement("label",{className:n.schema.type+"Field "+a},e.createElement("span",{className:"title"},n.view.title||n.editKey),e.createElement(t,n),e.createElement("span",null,n.view.description),e.createElement("span",null,n.errorMessage)))}return n}function onInputChange(e){return function(t){e("checkbox"===t.target.type?t.target.checked:t.target.value)}}function Input(t){return e.createElement("input",{type:t.type,placeholder:t.schema.placeholder,value:t.value,className:t.className,onChange:onInputChange(t.onChange),checked:t.checked})}function TextWidget(t){return e.createElement(Input,_extends({},t,{type:"string"}))}function ArrowNumberWidget(t){return e.createElement(Input,_extends({},t,{type:"number"}))}function CheckboxWidget(t){return e.createElement(Input,_extends({},t,{type:"checkbox",checked:t.value}))}function ArrayWidget(t){function n(n,r){return e.createElement("div",null,e.createElement("span",{onClick:t.onChildRemove(r)},"-"),n)}var r=e.Children.map(t.children,n);return e.createElement("div",null,e.createElement("div",null,r),e.createElement("span",{onClick:t.onChildAdd},"+"))}function ObjectWidget(t){return e.createElement("div",null,t.children)}function SelectWidget(t){var n=t.view,r=t.value,a=t.onChange,o=n.choices.map(function(t){return e.createElement("option",{key:t.value,value:t.value},t.label)});return e.createElement("select",{value:r,onChange:function(e){return a(e.target.value)}},o)}function defaultWidget(e){return DefaultWidget[e]||undefinedWidgetFactory(e)}function setDefaultWidgets(e){DefaultWidget=Object.assign({},DefaultWidget,e)}function Widget(t){var n=t.schema,r=n.view,a=objectWithoutProperties(n,["view"]);if(r){var o=r.type;if("string"==typeof o){var i=defaultWidget(o);return e.createElement(i,_extends({},t,{schema:a,view:r}))}if("function"==typeof o){var u=o;return e.createElement(u,_extends({},t,{schema:a,view:r}))}}var c=Array.isArray(n.type)?n.type.find(function(e){return"null"!==e}):n.type,l=defaultWidget(c);return e.createElement(l,_extends({},t,{schema:a,view:r||EMPTYOBJECT}))}function validate(e,t,n){return customValidator.validate(e,t,{formValue:n})}function validated(t){function n(n){function r(e){var t=validate(e,n.schema,n.actions.getFormValue()),r=t.errors.map(function(e){return e.message});n.onChange(e,r)}return e.createElement(t,_extends({},n,{errorMessage:n.actions.getErrors(n.path),onChange:r}))}return n}function renderChildren(t){function n(e,t){var n=a[e]?a[e].index||0:0,r=a[t]?a[t].index||0:0;return n-r}var r=[],a=t.schema.properties||{},o=t.value||{},i=Object.keys(a);Object.keys(o).forEach(function(e){a.hasOwnProperty(e)||i.push(e)}),i.sort(n);for(var u=0;u<i.length;u+=1){var c=i[u];if(a.hasOwnProperty(c))r.push(e.createElement(SchemaType$1,_extends({},t,{schema:a[c],value:o[c],editKey:c,key:c})));else{var l=t.schema.defaultProperties;r.push(e.createElement(SchemaType$1,_extends({},t,{schema:l,value:o[c],editKey:c,key:c})))}}return r}function ObjectField(t){function n(e,n){t.onChange(Object.assign({},t.value,defineProperty({},e,n)))}function r(e){var n=Object.assign({},t.value);delete n[e],t.onChange(n)}function a(e,n){var r={};Object.keys(t.value).forEach(function(a){a!==e?r[a]=t.value[a]:r[n]=t.value[a]}),t.onChange(r)}return e.createElement(Widget,_extends({},t,{addKey:n,removeKey:r,alterKey:a}),renderChildren(t))}function SimpleStringField(t){return e.createElement(Widget,_extends({},t,{onChange:t.onChange}))}function BooleanField(t){return e.createElement(Widget,t)}function onChildChange(e,t){return function(n){var r=t.value;r?t.onChange(r.map(function(t,r){return+r!==+e?t:n})):t.onChange([n])}}function onChildRemove(e){return function(t){return function(){var n=e.value||[];e.onChange(n.filter(function(e,n){return Number(n)!==Number(t)}))}}}function onChildAdd(e){return function(){var t=e.value||[];e.onChange(t.concat([void 0]))}}function renderChildren$1(t){var n=t.value,r=t.schema,a=r.defaultValue,o=r.items,i=void 0;i=n?n:a?a:[];var u=[];return i.forEach(function(n,r){return u.push(e.createElement(SchemaType$1,_extends({},t,{schema:o,value:n,editKey:String(r),key:r,onChange:onChildChange(r,t)})))}),u}function ArrayField(t){return e.createElement(Widget,_extends({},t,{onChildAdd:onChildAdd(t),onChildRemove:onChildRemove(t)}),renderChildren$1(t))}function visibility(t){function n(n){var r=n.schema.visible,a=n.value;return r&&!r(a,n.actions.getFormValue())?null:e.createElement(t,n)}return n}function Undefined(t){return e.createElement("span",null,'Undefined field type "'+t.schema.type+'", ['+t.path+"]")}function infer(e){switch("undefined"==typeof e?"undefined":_typeof(e)){case"number":return"number";case"string":return"string";case"boolean":return"boolean";case"object":return Array.isArray(e)?"array":"object";default:return"string"}}function updatePath(e,t){return t?e.concat([t]):e}function inference(t){function n(n){var r=n.schema,a=updatePath(n.path,n.editKey),o=r;return o&&o.hasOwnProperty("type")||(o={type:infer(n.value)}),e.createElement(t,_extends({},n,{path:a,schema:o}))}return n}function doAction(e,t){return function(){for(var n=arguments.length,r=Array(n),a=0;a<n;a++)r[a]=arguments[a];e.apply(void 0,[t].concat(r))}}function setErrors(e,t,n){var r=[STATUS].concat(t).concat([ERRORS]),a=e.select(r);n&&n.length&&Array.isArray(a.get())?(a.splice([0,a.get().length]),a.concat(n||[])):a.set(n||NOERRORS)}function update(e,t,n,r){var a=[STATUS].concat(t);e.set([VALUE].concat(t),n),e.set(a.concat([STATE]),"dirty"),setErrors(e,t,r)}function setDefaultValue(e,t,n){e.set([VALUE].concat(t),n),e.set([STATUS].concat(t).concat([STATE]),"pristine")}function getStatus(e,t){return e.get([STATUS].concat(t).concat([STATE]))}function getErrors(e,t){return e.get([STATUS].concat(t).concat([ERRORS]))||NOERRORS}function getFormValue(e){return e.get(VALUE)}function updateSchema(e,t,n){var r=t.reduce(function(t,n){return"object"===e.get(t).type?t.concat(["properties",n]):"array"===e.get(t).type?t.concat(["items"]):t.concat([n])},["schema"]);e.set(r,n)}import e from"react";import t from"baobab";import n,{Validator as r}from"jsonschema";var createTree=function(){return new t({schema:{},value:{},status:{}})},propTypes=createCommonjsModule(function(e,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return"prop type `"+e+"` is invalid; it must be "+t+"."}Object.defineProperty(n,"__esModule",{value:!0});var o=t,i=r(o);n.default={baobab:function(e,t){if(t in e)return e[t]instanceof i.default?void 0:new Error(a(t,"a Baobab tree"))}}}),require$$0$1=propTypes&&"object"==typeof propTypes&&"default"in propTypes?propTypes.default:propTypes,helpers=createCommonjsModule(function(e,t){"use strict";function n(e,t){return function n(){for(var r=arguments.length,a=Array(r),o=0;o<r;o++)a[o]=arguments[o];return a.length>=t?e.apply(null,a):function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.apply(null,a.concat(t))}}}function r(e,t,n){return"function"==typeof e&&(e=e(t,n)),e}Object.defineProperty(t,"__esModule",{value:!0}),t.curry=n,t.solveMapping=r}),require$$1=helpers&&"object"==typeof helpers&&"default"in helpers?helpers.default:helpers,higherOrder$2=createCommonjsModule(function(n,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e){return e.name||e.displayName||"Component"}function l(e,t){throw E('baobab-react/higher-order.branch: given cursors mapping is invalid (check the "'+e+'" component).',{mapping:t})}function s(e,t){if(!(e instanceof y.default))throw E("baobab-react/higher-order.root: given tree is not a Baobab.",{target:e});if("function"!=typeof t)throw Error("baobab-react/higher-order.root: given target is not a valid React component.");var n=c(t),r=function(n){function r(){return o(this,r),i(this,Object.getPrototypeOf(r).apply(this,arguments))}return u(r,n),h(r,[{key:"getChildContext",value:function(){return{tree:e}}},{key:"render",value:function(){return v.default.createElement(t,this.props)}}]),r}(v.default.Component);return r.displayName="Rooted"+n,r.childContextTypes={tree:C.default.baobab},r}function f(e,t){if("function"!=typeof t)throw Error("baobab-react/higher-order.branch: given target is not a valid React component.");var n=c(t);O(e)||"function"==typeof e||l(n,e);var r=function(r){function a(t,r){o(this,a);var u=i(this,Object.getPrototypeOf(a).call(this,t,r));if(e){var c=(0,g.solveMapping)(e,t,r);c||l(n,c),u.watcher=u.context.tree.watch(c),u.state=u.watcher.get()}return u}return u(a,r),h(a,[{key:"getDecoratedComponentInstance",value:function(){return this.decoratedComponentInstance}},{key:"handleChildRef",value:function(e){this.decoratedComponentInstance=e}}]),h(a,[{key:"componentWillMount",value:function(){var e=this;if(this.dispatcher=function(t){for(var n=arguments.length,r=Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];return t.apply(void 0,[e.context.tree].concat(r))},this.watcher){var t=function(){e.watcher&&e.setState(e.watcher.get())};this.watcher.on("update",t)}}},{key:"render",value:function(){var e={dispatch:this.dispatcher};return v.default.createElement(t,d({},this.props,e,this.state,{ref:this.handleChildRef.bind(this)}))}},{key:"componentWillUnmount",value:function(){this.watcher&&(this.watcher.release(),this.watcher=null)}},{key:"componentWillReceiveProps",value:function(t){if(this.watcher&&"function"==typeof e){var r=(0,g.solveMapping)(e,t,this.context);r||l(n,r),this.watcher.refresh(r),this.setState(this.watcher.get())}}}]),a}(v.default.Component);return r.displayName="Branched"+n,r.contextTypes={tree:C.default.baobab},r}Object.defineProperty(r,"__esModule",{value:!0}),r.branch=r.root=void 0;var d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=e,v=a(p),m=t,y=a(m),g=require$$1,b=require$$0$1,C=a(b),E=y.default.helpers.makeError,O=y.default.type.object,w=(0,g.curry)(s,2),j=(0,g.curry)(f,2);r.root=w,r.branch=j}),require$$0=higherOrder$2&&"object"==typeof higherOrder$2&&"default"in higherOrder$2?higherOrder$2.default:higherOrder$2,higherOrder=createCommonjsModule(function(e,t){var n=require$$0;t.root=n.root,t.branch=n.branch}),branch=higherOrder.branch,root=higherOrder.root,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),defineProperty=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},objectWithoutProperties=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},TextWidget$1=labeled(TextWidget),ArrowNumberWidget$1=labeled(ArrowNumberWidget),CheckboxWidget$1=labeled(CheckboxWidget),ArrayWidget$1=labeled(ArrayWidget),ObjectWidget$1=labeled(ObjectWidget),DefaultWidget={string:TextWidget$1,number:TextWidget$1,boolean:CheckboxWidget$1,array:ArrayWidget$1,object:ObjectWidget$1,arrowNumber:ArrowNumberWidget$1,select:SelectWidget},EMPTYOBJECT={},customValidator=new r;customValidator.attributes.errored=function(e,t,r){if("function"!=typeof t.errored)throw new n.SchemaError('"errored" expects a function');var a=t.errored(e,r.formValue);if(a)return a};var ObjectField$1=validated(fromDefaultValue(ObjectField)),StringField=validated(fromDefaultValue(SimpleStringField)),NumberField=function(t){function n(e){classCallCheck(this,n);var t=possibleConstructorReturn(this,Object.getPrototypeOf(n).call(this,e));return t.state={value:e.value},t.boundChange=t.onChange.bind(t),t}return inherits(n,t),createClass(n,[{key:"componentWillReceiveProps",value:function(e){Number(this.state.value)!==Number(e.value)&&this.setState({value:e.value})}},{key:"onChange",value:function(e){var t=this,n=""===e?void 0:e,r=Number(n);this.setState({value:n},function(){return t.props.onChange(isNaN(r)?n:r)})}},{key:"render",value:function(){return e.createElement(SimpleStringField,_extends({},this.props,{value:this.state.value,onChange:this.boundChange}))}}]),n}(e.Component),NumberField$1=validated(fromDefaultValue(NumberField)),BooleanField$1=validated(fromDefaultValue(BooleanField)),ArrayField$1=fromDefaultValue(ArrayField),Fields={object:ObjectField$1,string:StringField,number:NumberField$1,boolean:BooleanField$1,array:ArrayField$1},shallowEqual=createCommonjsModule(function(e,t){"use strict";function n(e,t){if(e===t)return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var a=Object.prototype.hasOwnProperty.bind(t),o=0;o<n.length;o++)if(!a(n[o])||e[n[o]]!==t[n[o]])return!1;return!0}t.__esModule=!0,t.default=n,e.exports=t.default}),require$$0$2=shallowEqual&&"object"==typeof shallowEqual&&"default"in shallowEqual?shallowEqual.default:shallowEqual,_function=createCommonjsModule(function(e,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){return!(0,o.default)(this.props,e)||!(0,o.default)(this.state,t)}t.__esModule=!0,t.default=r;var a=require$$0$2,o=n(a);e.exports=t.default}),shouldPureComponentUpdate=_function&&"object"==typeof _function&&"default"in _function?_function.default:_function,SchemaType=function(t){function n(e){classCallCheck(this,n);var t=possibleConstructorReturn(this,Object.getPrototypeOf(n).call(this,e));return t.onChange=doAction(e.actions.update,e.path),t}return inherits(n,t),createClass(n,[{key:"shouldComponentUpdate",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return shouldPureComponentUpdate.apply(this,t)}},{key:"render",value:function(){var t=this.props.schema.type,n=Array.isArray(t)?t.find(function(e){return"null"!==e}):t,r=Fields[n]||Undefined;return e.createElement(r,_extends({},this.props,{onChange:this.onChange}))}}]),n}(e.Component),SchemaType$1=inference(visibility(SchemaType)),VALUE="value",STATUS="status",STATE="state",ERRORS="errors",NOERRORS=[],actions=Object.freeze({setErrors:setErrors,update:update,setDefaultValue:setDefaultValue,getStatus:getStatus,getErrors:getErrors,getFormValue:getFormValue,updateSchema:updateSchema}),BranchedSchemaType=branch({schema:"schema",status:"status",value:"value"},SchemaType$1),Container=function(t){function n(e){classCallCheck(this,n);var t=possibleConstructorReturn(this,Object.getPrototypeOf(n).call(this,e));return t.tree=createTree(),t.updateTree(e.value,e.schema),t.ACTIONS={},Object.keys(actions).forEach(function(e){t.ACTIONS[e]=actions[e].bind(t.tree,t.tree)}),t.rooted=root(t.tree,BranchedSchemaType),t}return inherits(n,t),createClass(n,[{key:"componentWillReceiveProps",value:function(e){this.updateTree(e.value,e.schema)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"componentWillUnmount",value:function(){this.tree.release()}},{key:"getValue",value:function(){return this.tree.get("value")}},{key:"updateTree",value:function(e,t){var n=this;this.tree.select("value").release(),this.tree.select("value").set(e),this.tree.select("schema").set(t),this.tree.select("status").release(),this.tree.commit(),this.tree.select("value").on("update",function(e){return n.props.onChange(e.data.currentData,validate(e.data.currentData,n.tree.get("schema"),e.data.currentData).errors)})}},{key:"validate",value:function(){var e=validate(this.tree.get("value"),this.tree.get("schema"),this.tree.get("value")),t=this.ACTIONS.setErrors,n=new Map;return e.errors.forEach(function(e){var t=n.get(e.property)||[];t.push(e.message),n.set(e.property,t)}),n.forEach(function(e,n){t(n.split(/\.|\[|\]/).filter(function(e){return""!==e}).slice(1),e)}),e.errors}},{key:"render",value:function(){var t=this.rooted;return e.createElement(t,{onChange:this.props.onChange,path:[],actions:this.ACTIONS})}}]),n}(e.Component);export{setDefaultWidgets};export default Container;
//# sourceMappingURL=index.es2015.js.map