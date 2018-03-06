import * as assert from "assert";
import { suitClassNames } from "../src/suitcss-classnames";

describe("suitcss-classnames", () => {
    context("all mix pattern", () => {
        it("should return classname", () => {
            const className = suitClassNames({
                namespace: "ns",
                component: "ComponentName",
                descendant: "descendantName",
                modifiers: ["default", "small"],
                states: ["disable", "active"],
                utilities: ["inlineBlock", "m20"]
            });
            const classes = className.split(" ");
            assert(classes.indexOf("ns-ComponentName-descendantName") !== -1);
            assert(classes.indexOf("ns-ComponentName-descendantName--default") !== -1);
            assert(classes.indexOf("ns-ComponentName-descendantName--small") !== -1);
            assert(classes.indexOf("is-disable") !== -1);
            assert(classes.indexOf("is-active") !== -1);
            assert(classes.indexOf("u-inlineBlock") !== -1);
            assert(classes.indexOf("u-m20") !== -1);
        });
    });
    context("namespace", () => {
        it("should returned classnames include `namespace-ComponentName`", () => {
            const className = suitClassNames({
                namespace: "ns",
                component: "ComponentName"
            });
            const classes = className.split(" ");
            assert(classes.indexOf("ComponentName") === -1);
            assert(classes.indexOf("ns-ComponentName") !== -1);
            assert(className.indexOf("ns-ComponentName") !== -1);
        });
        it("can mix namespace,ComponentName, state, util", () => {
            const className = suitClassNames({
                namespace: "ns",
                component: "ComponentName",
                descendant: "descendantName",
                states: ["stateName"]
            });
            const classes = className.split(" ");
            assert(classes.indexOf("ns-ComponentName-descendantName") !== -1);
            assert(className.indexOf("is-stateName") !== -1);
        });
    });
    context("descendant", () => {
        it("should returned classnames include `ComponentName-descendant`", () => {
            const className = suitClassNames({
                component: "ComponentName",
                descendant: "descendantName"
            });
            const classes = className.split(" ");
            assert(classes.indexOf("ComponentName-descendantName") !== -1);
            assert(className.indexOf("ComponentName-descendantName") !== -1);
        });
    });
    context("component", () => {
        context("when it is missing", () => {
            it("should throw Error", () => {
                assert.throws(() => {
                    suitClassNames({} as any);
                });
            });
        });
        context("when set the option", function() {
            it("should returned classnames include `ComponentName`", () => {
                const names = suitClassNames({
                    component: "ComponentName"
                });
                assert(names.indexOf("ComponentName") !== -1);
            });
        });
    });
    context("modifiers", () => {
        it("should returned classnames include `ComponentName--modifier`", () => {
            const className = suitClassNames({
                component: "ComponentName",
                modifiers: ["default"]
            });
            const classes = className.split(" ");
            assert(classes.indexOf("ComponentName") !== -1);
            assert(className.indexOf("ComponentName--default") !== -1);
        });
        it("should returned classnames has each modifier class ", () => {
            const names = suitClassNames({
                component: "ComponentName",
                modifiers: ["default", "small"]
            });
            assert(names.indexOf("ComponentName--default") !== -1);
            assert(names.indexOf("ComponentName--small") !== -1);
        });
    });
    context("states", () => {
        it("should returned classnames include `is-stateName`", () => {
            const className = suitClassNames({
                component: "ComponentName",
                states: ["stateName"]
            });
            const classes = className.split(" ");
            assert(classes.indexOf("ComponentName") !== -1);
            assert(className.indexOf("is-stateName") !== -1);
        });
        it("should returned classnames has each stateName class ", () => {
            const className = suitClassNames({
                component: "ComponentName",
                states: ["disable", "active"]
            });
            const classes = className.split(" ");
            assert(classes.indexOf("is-disable") !== -1);
            assert(classes.indexOf("is-active") !== -1);
        });
        context("when pass state object", () => {
            it("should returned classnames has only enable stateName class ", () => {
                const className = suitClassNames({
                    component: "ComponentName",
                    states: {
                        "disable": false,
                        "active": true
                    }
                });
                const classes = className.split(/\s+/);
                assert(classes.indexOf("is-disable") === -1);
                assert(classes.indexOf("is-active") !== -1);
            });
        });
    });
    context("utilities", () => {
        it("should returned classnames include `u-utilName`", () => {
            const className = suitClassNames({
                component: "ComponentName",
                utilities: ["utilityName"]
            });
            const classes = className.split(" ");
            assert(classes.indexOf("ComponentName") !== -1);
            assert(className.indexOf("u-utilityName") !== -1);
            assert(classes.indexOf("u-utilityName") !== -1);
        });
        it("should returned classnames has each utilityName class ", () => {
            const className = suitClassNames({
                component: "ComponentName",
                utilities: ["inlineBlock", "m20"]
            });
            const classes = className.split(" ");
            assert(classes.indexOf("u-inlineBlock") !== -1);
            assert(classes.indexOf("u-m20") !== -1);
        });
    });
    context("When key already has prefix", () => {
        it("should not add prefix", () => {
            const className = suitClassNames({
                component: "ComponentName",
                states: {
                    "is-active": true
                },
                utilities: ["u-inlineBlock"]
            });
            const classes = className.split(/\s+/);
            assert.equal(classes.length, 3);
            assert(classes.indexOf("ComponentName") !== -1);
            assert(classes.indexOf("is-active") !== -1);
            assert(classes.indexOf("u-inlineBlock") !== -1);
        });
    });
    context("When complex object and array", () => {
        it("should throw error", () => {
            const UpperCase = (text:string) => {
                return text.replace(/^[a-z]/g, function(val) {
                    return val.toUpperCase();
                });
            };
            const align = "left";
            const alignNames = `align${UpperCase(align)}`;
            const className = suitClassNames({
                component: "ComponentName",
                modifiers: [alignNames]
            });
            const classes = className.split(/\s+/);
            assert.equal(classes.length, 2);
            assert(classes.indexOf("ComponentName") !== -1);
            assert(classes.indexOf("ComponentName--alignLeft") !== -1);
        });
    });

    context("When property has typo", () => {
        it("should throw error", () => {
            assert.throws(() => {
                suitClassNames({
                    component: "ComponentName",
                    // typo => states
                    state: {
                        "is-active": true
                    }
                } as any);
            });
        });
    });

});
