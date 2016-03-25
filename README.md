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
const SuitCSSObject = {
    namespace: "",  // class="namespace-Component"
    descendant: "", // class="Component-descendant"
    component: "",  // class="Component"
    modifiers: [] || {},  // class="Component--modifier"
    states: [] || {},     // class="Component is-state"
    utilities: [] || {}   // class="u-utility Component"
};
```

`component` property is required, other properties is optional.

```js
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