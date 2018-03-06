# suitcss-classnames [![Build Status](https://travis-ci.org/dwango-js/suitcss-classnames.svg?branch=master)](https://travis-ci.org/dwango-js/suitcss-classnames)

Class names builder library compatible for Suit CSS naming conventions.

- [SUIT CSS: style tools for UI components](http://suitcss.github.io/ "SUIT CSS: style tools for UI components")
- [SUIT CSS naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md "SUIT CSS naming conventions")

## Installation

    npm install suitcss-classnames

## Usage

### `suitClassNames(suitCSSObject): string`

`suitCSSObject` is a following object:

```js
export interface SuitCSSObject {
    /**
     * class="namespace-Component"
     */
    namespace?: string;
    /**
     * class="namespace-Component"
     */
    descendant?: string;
    /**
     * class="Component"
     */
    component: string;
    /**
     * class="Component--modifier"
     */
    modifiers?: string[] | {
        [index: string]: boolean;
    };
    /**
     * class="Component is-state"
     */
    states?: string[] | {
        [index: string]: boolean;
    };
    /**
     * class="u-utility Component"
     */
    utilities?: string[] | {
        [index: string]: boolean;
    };
}
```

`component` property is required, other properties is optional.

```js
import { suitClassNames } from "suitcss-classnames";
const className = suitClassNames({
    namespace: "ns",
    component: "ComponentName", // <= require
    descendant: "descendantName",
    modifiers: ["default", "small"],
    states: ["disable", "active"]
});
const classes = className.split(" ");
assert(classes.indexOf("ns-ComponentName-descendantName") !== -1);
assert(classes.indexOf("ns-ComponentName-descendantName--default") !== -1);
assert(classes.indexOf("ns-ComponentName-descendantName--small") !== -1);
assert(classes.indexOf("is-disable") !== -1);
assert(classes.indexOf("is-active") !== -1);
```

`state`, `modifiers` and `utilities` property accept array or object.

It means that you can write following:

```js
const className = suitClassNames({
component: "ComponentName",
    states: {
        // ignore
        "disable": false,
        // accept
        "active": true
    }
});
const classes = className.split(/\s+/);
console.log(classes);
// [ 'ComponentName', 'is-active' ]
```

### Use case

If you use it in react component, write following pattern:

```js
import { suitClassNames } from "suitcss-classnames";
class MyComponent extends React.Component {
    render() {
        const className = suitClassNames({
            component: "MyComponent",
            states: {
                // on/off by active state
                "active": this.props.active
            }
        });
        return <div className={className}>
           {this.props.active ? "active!" : "none"}
        </div>;
    }
}
```

## Behavior Note :memo:

### When `key` already has `prefix`

`suitcss-classnames` don't throw error, just ignore this.

```js
import { suitClassNames } from "suitcss-classnames";
const className = suitClassNames({
    component: "ComponentName",
    // key alredy has "is-" prefix
    states: {
        "is-active": true
    }
});
const classes = className.split(/\s+/);
assert.equal(classes.length, 2);
assert(classes.indexOf("ComponentName") !== -1);
// don't add duplicated prefix, it will be "is-active"
assert(classes.indexOf("is-active") !== -1);
```

### suitcss-classnames don't allowed the key name:"state"

`suitcss-classnames` don't allowed the key name that except "namespace", "descendant", "component", "modifiers", "states", "utilities".

```js
import { suitClassNames } from "suitcss-classnames";
suitClassNames({
    component: "ComponentName",
    // typo => states
    state: {
        "is-active": true
    }
});
```

The code throw error, because it contain a typo(`state` => `states`).

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
