# kup-date-picker

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                                     | Type      | Default |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `clockVariant`    | `clock-variant`     | When set to true, the drop down menu will display a clock.                                                      | `boolean` | `true`  |
| `customStyle`     | `custom-style`      | Custom style of the component. For more information: https://ketchup.smeup.com/ketchup-showcase/#/customization | `string`  | `''`    |
| `data`            | --                  | Props of the sub-components (time input text field)                                                             | `Object`  | `{}`    |
| `disabled`        | `disabled`          | Defaults at false. When set to true, the component is disabled.                                                 | `boolean` | `false` |
| `initialValue`    | `initial-value`     | Sets the initial value of the component                                                                         | `string`  | `''`    |
| `manageSeconds`   | `manage-seconds`    | Manage seconds                                                                                                  | `boolean` | `false` |
| `timeMinutesStep` | `time-minutes-step` | Minutes step                                                                                                    | `number`  | `10`    |


## Events

| Event                          | Description | Type                                    |
| ------------------------------ | ----------- | --------------------------------------- |
| `kupTimePickerBlur`            |             | `CustomEvent<{ id: any; value: any; }>` |
| `kupTimePickerChange`          |             | `CustomEvent<{ id: any; value: any; }>` |
| `kupTimePickerClearIconClick`  |             | `CustomEvent<{ id: any; }>`             |
| `kupTimePickerClick`           |             | `CustomEvent<{ id: any; value: any; }>` |
| `kupTimePickerFocus`           |             | `CustomEvent<{ id: any; value: any; }>` |
| `kupTimePickerIconClick`       |             | `CustomEvent<{ id: any; value: any; }>` |
| `kupTimePickerInput`           |             | `CustomEvent<{ id: any; value: any; }>` |
| `kupTimePickerItemClick`       |             | `CustomEvent<{ id: any; value: any; }>` |
| `kupTimePickerTextFieldSubmit` |             | `CustomEvent<{ id: any; value: any; }>` |


## Methods

### `getProps(descriptions?: boolean) => Promise<GenericObject>`

Used to retrieve component's props values.

#### Returns

Type: `Promise<GenericObject>`



### `getValue() => Promise<string>`



#### Returns

Type: `Promise<string>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setValue(value: string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `themeChangeCallback(customStyleTheme: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [kup-card](../kup-card)

### Depends on

- [kup-text-field](../kup-text-field)
- [kup-button](../kup-button)
- [kup-list](../kup-list)

### Graph
```mermaid
graph TD;
  kup-time-picker --> kup-text-field
  kup-time-picker --> kup-button
  kup-time-picker --> kup-list
  kup-button --> kup-badge
  kup-badge --> kup-badge
  kup-list --> kup-radio
  kup-list --> kup-checkbox
  kup-card --> kup-time-picker
  style kup-time-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
