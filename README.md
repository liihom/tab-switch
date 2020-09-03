# TabSwitch

Commonly used tab switching function. Strictly observe the following DOM structure please.

## Features

+ typescript features & vanilla js  

## Installing

[`@autots/tab-switch`](https://www.npmjs.com/package/@autots/tab-switch)

Using npm:

```
$ npm install @autots/tab-switch -S
```

Using yarn:

```
$ yarn add @autots/tab-switch
```

## Example

### layouts

- DOM structure: `[data-role="tabSwitch"]` ~ `[data-tab-scroll]` > `[data-role="tab"]` > `.item`

- set initial active item: `[data-tab-active="x"]` 

```
<div data-role="tabSwitch" data-tab-active="1">
  <div data-tab-scroll>
    <div data-role="tab">
      <span class="athm-tab__item item">tab1</span>
      <span class="athm-tab__item item">tab2</span>
      <span class="athm-tab__item item">tab3</span>
    </div>
  </div>
</div>
```

```
<div data-role="tabSwitch" data-tab-active="3">
  <div>
    <div data-tab-scroll>
      <div data-role="tab">
        <span class="item">tab1</span>
        <span class="item">tab2</span>
        <span class="item">tab3</span>
    </div>
  </div>
  <i class="overlay"></i>
</div>
```

### import as a module

```
import TabSwitch from '@autots/tab-switch';

new TabSwitch();
```

### import as a lib

```
<script src="dist/tab-switch.browser.min.js"></script>

<script>
  var demo = new AutoTs.TabSwitch();
</script>
```

## Todo
