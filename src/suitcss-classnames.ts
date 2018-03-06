// LICENSE : MIT
"use strict";
const ObjectAssign = require("object.assign");
import classNames = require("classnames");
export interface SuitCSSObject {
    /**
     * class="namespace-Component"
     */
    namespace?: string,
    /**
     * class="namespace-Component"
     */
    descendant?: string,
    /**
     * class="Component"
     */
    component: string,
    /**
     * class="Component--modifier"
     */
    modifiers?: string[] | { [index: string]: boolean },
    /**
     * class="Component is-state"
     */
    states?: string[] | { [index: string]: boolean },
    /**
     * class="u-utility Component"
     */
    utilities?: string[] | { [index: string]: boolean }
}
// Allowed keyword list
const ALLOW_KEY_NAMES = ["namespace", "descendant", "component", "modifiers", "states", "utilities"];
const DefaultSuitCSSObject = {
    namespace: "",  // class="namespace-Component"
    descendant: "", // class="Component-descendant"
    component: "", // class="Component"
    modifiers: [],  // class="Component--modifier"
    states: [],     // class="Component is-state"
    utilities: []  // class="u-utility Component"
};
/**
 * @param {Object} object
 */
const validateSuitCSSObject = function validateSuitCSSObject(object: {}) {
    const keys = Object.keys(object);
    keys.forEach(key => {
        if (ALLOW_KEY_NAMES.indexOf(key) === -1) {
            throw new Error(`suitcss-classnames don't allowed the key name:"${key}"
You can use one of "${ALLOW_KEY_NAMES.join('", "')}" as a key name.
`)
        }
    });
};
/**
 * Create class names string from object.
 * The option object should have `component` property.
 * It it based name of the class names.
 * @param {{
 * namespace: ?string, descendant: ?string, component: string,
 * modifiers: (?string[] | ?Object), states: (?string[] | ?Object), utilities: (?string[] | ?Object)
 * }} suitCSSObject
 * @returns {string} class names string. it could be assigned to `class` attribute of element.
 */
export function suitClassNames(suitCSSObject: SuitCSSObject) {
    if (suitCSSObject === null) {
        throw new Error("require options object.");
    }
    if (typeof suitCSSObject === "object" && suitCSSObject.component == null) {
        throw new Error(`require "component" option value.
Please specify "component" value.

suitClassNames({
    component: "ComponentName"
});
`);
    }
    validateSuitCSSObject(suitCSSObject);
    const suitCSS = ObjectAssign({}, DefaultSuitCSSObject, suitCSSObject);
    const { namespace, descendant, component, modifiers, states, utilities } = suitCSS;
    const base = (
        (namespace ? `${namespace}-` : "") +
        component +
        (descendant ? `-${descendant}` : "")
    );

    const addPrefix = (prefix: string, key: string) => {
        const index = key.indexOf(prefix);
        // if don't contain prefix, add prefix
        if (index === -1) {
            return prefix + key;
        } else if (index === 0) {
            // if key start with prefix, don't add prefix
            return key;
        } else {
            // if key has prefix, but it is not prefix, add prefix
            return prefix + key;
        }
    };
    const map = (args: string[] | { [index: string]: boolean; }, prefix: string) => {
        if (!args) {
            return false;
        }
        /*
            {
                "stateA": true,
                "stateB": false
            }
            =>
            {
                "is-stateA": true
            }
         */
        if (!Array.isArray(args) && typeof args === "object") {
            return Object.keys(args).reduce((result: { [index: string]: string | boolean}, key) => {
                const prefixedKey = addPrefix(prefix, key);
                result[prefixedKey] = args[key];
                return result;
            }, {});
        }
        const array = Array.isArray(args) ? args : [args];
        return array.map((key) => {
            return addPrefix(prefix, key);
        });
    };

    const classNamesMap = [
        map(utilities, "u-"),
        base,
        map(modifiers, `${base}--`),
        map(states, "is-")
    ].filter(classMap => classMap !== false);
    return classNames(classNamesMap).trim();
}
