/* eslint-disable */
// @ts-nocheck

// @ts-ignore
(function(self, undefined) {

// _DOMTokenList
    var _DOMTokenList = (function() {
        var dpSupport = true;
        var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty)
                Object.defineProperty(object, name, {
                    configurable: false === dpSupport ? true : !!configurable,
                    get: fn
                });

            else object.__defineGetter__(name, fn);
        };

        /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
        try {
            defineGetter({}, "support");
        }
        catch (e) {
            dpSupport = false;
        }


        var _DOMTokenList = function (el, prop) {
            var that = this;
            var tokens = [];
            var tokenMap = {};
            var length = 0;
            var maxLength = 0;
            var addIndexGetter = function (i) {
                defineGetter(that, i, function () {
                    preop();
                    return tokens[i];
                }, false);

            };
            var reindex = function () {

                /** Define getter functions for array-like access to the tokenList's contents. */
                if (length >= maxLength)
                    for (; maxLength < length; ++maxLength) {
                        addIndexGetter(maxLength);
                    }
            };

            /** Helper function called at the start of each class method. Internal use only. */
            var preop = function () {
                var error;
                var i;
                var args = arguments;
                var rSpace = /\s+/;

                /** Validate the token/s passed to an instance method, if any. */
                if (args.length)
                    for (i = 0; i < args.length; ++i)
                        if (rSpace.test(args[i])) {
                            error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                            error.code = 5;
                            error.name = "InvalidCharacterError";
                            throw error;
                        }


                /** Split the new value apart by whitespace*/
                if (typeof el[prop] === "object") {
                    tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
                } else {
                    tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
                }

                /** Avoid treating blank strings as single-item token lists */
                if ("" === tokens[0]) tokens = [];

                /** Repopulate the internal token lists */
                tokenMap = {};
                for (i = 0; i < tokens.length; ++i)
                    tokenMap[tokens[i]] = true;
                length = tokens.length;
                reindex();
            };

            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */
            preop();

            /** Return the number of tokens in the underlying string. Read-only. */
            defineGetter(that, "length", function () {
                preop();
                return length;
            });

            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */
            that.toLocaleString =
                that.toString = function () {
                    preop();
                    return tokens.join(" ");
                };

            that.item = function (idx) {
                preop();
                return tokens[idx];
            };

            that.contains = function (token) {
                preop();
                return !!tokenMap[token];
            };

            that.add = function () {
                preop.apply(that, args = arguments);

                for (var args, token, i = 0, l = args.length; i < l; ++i) {
                    token = args[i];
                    if (!tokenMap[token]) {
                        tokens.push(token);
                        tokenMap[token] = true;
                    }
                }

                /** Update the targeted attribute of the attached element if the token list's changed. */
                if (length !== tokens.length) {
                    length = tokens.length >>> 0;
                    if (typeof el[prop] === "object") {
                        el[prop].baseVal = tokens.join(" ");
                    } else {
                        el[prop] = tokens.join(" ");
                    }
                    reindex();
                }
            };

            that.remove = function () {
                preop.apply(that, args = arguments);

                /** Build a hash of token names to compare against when recollecting our token list. */
                for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                    ignore[args[i]] = true;
                    delete tokenMap[args[i]];
                }

                /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */
                for (i = 0; i < tokens.length; ++i)
                    if (!ignore[tokens[i]]) t.push(tokens[i]);

                tokens = t;
                length = t.length >>> 0;

                /** Update the targeted attribute of the attached element. */
                if (typeof el[prop] === "object") {
                    el[prop].baseVal = tokens.join(" ");
                } else {
                    el[prop] = tokens.join(" ");
                }
                reindex();
            };

            that.toggle = function (token, force) {
                preop.apply(that, [token]);

                /** Token state's being forced. */
                if (undefined !== force) {
                    if (force) {
                        that.add(token);
                        return true;
                    } else {
                        that.remove(token);
                        return false;
                    }
                }

                /** Token already exists in tokenList. Remove it, and return FALSE. */
                if (tokenMap[token]) {
                    that.remove(token);
                    return false;
                }

                /** Otherwise, add the token and return TRUE. */
                that.add(token);
                return true;
            };

            that.forEach = Array.prototype.forEach;

            return that;
        };

        return _DOMTokenList;
    }());

// _ESAbstract.ArrayCreate
// 9.4.2.2. ArrayCreate ( length [ , proto ] )
    function ArrayCreate(length /* [, proto] */) { // eslint-disable-line no-unused-vars
        // 1. Assert: length is an integer Number ≥ 0.
        // 2. If length is -0, set length to +0.
        if (1 / length === -Infinity) {
            length = 0;
        }
        // 3. If length>2^32-1, throw a RangeError exception.
        if (length > (Math.pow(2, 32) - 1)) {
            throw new RangeError('Invalid array length');
        }
        // 4. If proto is not present, set proto to the intrinsic object %ArrayPrototype%.
        // 5. Let A be a newly created Array exotic object.
        var A = [];
        // 6. Set A's essential internal methods except for [[DefineOwnProperty]] to the default ordinary object definitions specified in 9.1.
        // 7. Set A.[[DefineOwnProperty]] as specified in 9.4.2.1.
        // 8. Set A.[[Prototype]] to proto.
        // 9. Set A.[[Extensible]] to true.
        // 10. Perform ! OrdinaryDefineOwnProperty(A, "length", PropertyDescriptor{[[Value]]: length, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false}).
        A.length = length;
        // 11. Return A.
        return A;
    }

// _ESAbstract.Call
    /* global IsCallable */
// 7.3.12. Call ( F, V [ , argumentsList ] )
    function Call(F, V /* [, argumentsList] */) { // eslint-disable-line no-unused-vars
        // 1. If argumentsList is not present, set argumentsList to a new empty List.
        var argumentsList = arguments.length > 2 ? arguments[2] : [];
        // 2. If IsCallable(F) is false, throw a TypeError exception.
        if (IsCallable(F) === false) {
            throw new TypeError(Object.prototype.toString.call(F) + 'is not a function.');
        }
        // 3. Return ? F.[[Call]](V, argumentsList).
        return F.apply(V, argumentsList);
    }

// _ESAbstract.CreateDataProperty
// 7.3.4. CreateDataProperty ( O, P, V )
// NOTE
// This abstract operation creates a property whose attributes are set to the same defaults used for properties created by the ECMAScript language assignment operator.
// Normally, the property will not already exist. If it does exist and is not configurable or if O is not extensible, [[DefineOwnProperty]] will return false.
    function CreateDataProperty(O, P, V) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(O) is Object.
        // 2. Assert: IsPropertyKey(P) is true.
        // 3. Let newDesc be the PropertyDescriptor{ [[Value]]: V, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }.
        var newDesc = {
            value: V,
            writable: true,
            enumerable: true,
            configurable: true
        };
        // 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
        try {
            Object.defineProperty(O, P, newDesc);
            return true;
        } catch (e) {
            return false;
        }
    }

// _ESAbstract.CreateDataPropertyOrThrow
    /* global CreateDataProperty */
// 7.3.6. CreateDataPropertyOrThrow ( O, P, V )
    function CreateDataPropertyOrThrow(O, P, V) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(O) is Object.
        // 2. Assert: IsPropertyKey(P) is true.
        // 3. Let success be ? CreateDataProperty(O, P, V).
        var success = CreateDataProperty(O, P, V);
        // 4. If success is false, throw a TypeError exception.
        if (!success) {
            throw new TypeError('Cannot assign value `' + Object.prototype.toString.call(V) + '` to property `' + Object.prototype.toString.call(P) + '` on object `' + Object.prototype.toString.call(O) + '`');
        }
        // 5. Return success.
        return success;
    }

// _ESAbstract.CreateMethodProperty
// 7.3.5. CreateMethodProperty ( O, P, V )
    function CreateMethodProperty(O, P, V) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(O) is Object.
        // 2. Assert: IsPropertyKey(P) is true.
        // 3. Let newDesc be the PropertyDescriptor{[[Value]]: V, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true}.
        var newDesc = {
            value: V,
            writable: true,
            enumerable: false,
            configurable: true
        };
        // 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
        Object.defineProperty(O, P, newDesc);
    }

// _ESAbstract.Get
// 7.3.1. Get ( O, P )
    function Get(O, P) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(O) is Object.
        // 2. Assert: IsPropertyKey(P) is true.
        // 3. Return ? O.[[Get]](P, O).
        return O[P];
    }

// _ESAbstract.HasOwnProperty
// 7.3.11 HasOwnProperty (O, P)
    function HasOwnProperty(o, p) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(O) is Object.
        // 2. Assert: IsPropertyKey(P) is true.
        // 3. Let desc be ? O.[[GetOwnProperty]](P).
        // 4. If desc is undefined, return false.
        // 5. Return true.
        // Polyfill.io - As we expect user agents to support ES3 fully we can skip the above steps and use Object.prototype.hasOwnProperty to do them for us.
        return Object.prototype.hasOwnProperty.call(o, p);
    }

// _ESAbstract.IsCallable
// 7.2.3. IsCallable ( argument )
    function IsCallable(argument) { // eslint-disable-line no-unused-vars
        // 1. If Type(argument) is not Object, return false.
        // 2. If argument has a [[Call]] internal method, return true.
        // 3. Return false.

        // Polyfill.io - Only function objects have a [[Call]] internal method. This means we can simplify this function to check that the argument has a type of function.
        return typeof argument === 'function';
    }

// _ESAbstract.RequireObjectCoercible
// 7.2.1. RequireObjectCoercible ( argument )
// The abstract operation ToObject converts argument to a value of type Object according to Table 12:
// Table 12: ToObject Conversions
    /*
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Argument Type | Result                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Undefined     | Throw a TypeError exception.                                                                                                       |
| Null          | Throw a TypeError exception.                                                                                                       |
| Boolean       | Return argument.                                                                                                                   |
| Number        | Return argument.                                                                                                                   |
| String        | Return argument.                                                                                                                   |
| Symbol        | Return argument.                                                                                                                   |
| Object        | Return argument.                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
*/
    function RequireObjectCoercible(argument) { // eslint-disable-line no-unused-vars
        if (argument === null || argument === undefined) {
            throw TypeError(Object.prototype.toString.call(argument) + ' is not coercible to Object.');
        }
        return argument;
    }

// _ESAbstract.SameValueNonNumber
// 7.2.12. SameValueNonNumber ( x, y )
    function SameValueNonNumber(x, y) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(x) is not Number.
        // 2. Assert: Type(x) is the same as Type(y).
        // 3. If Type(x) is Undefined, return true.
        // 4. If Type(x) is Null, return true.
        // 5. If Type(x) is String, then
        // a. If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices), return true; otherwise, return false.
        // 6. If Type(x) is Boolean, then
        // a. If x and y are both true or both false, return true; otherwise, return false.
        // 7. If Type(x) is Symbol, then
        // a. If x and y are both the same Symbol value, return true; otherwise, return false.
        // 8. If x and y are the same Object value, return true. Otherwise, return false.

        // Polyfill.io - We can skip all above steps because the === operator does it all for us.
        return x === y;
    }

// _ESAbstract.ToBoolean
// 7.1.2. ToBoolean ( argument )
// The abstract operation ToBoolean converts argument to a value of type Boolean according to Table 9:
    /*
--------------------------------------------------------------------------------------------------------------
| Argument Type | Result                                                                                     |
--------------------------------------------------------------------------------------------------------------
| Undefined     | Return false.                                                                              |
| Null          | Return false.                                                                              |
| Boolean       | Return argument.                                                                           |
| Number        | If argument is +0, -0, or NaN, return false; otherwise return true.                        |
| String        | If argument is the empty String (its length is zero), return false; otherwise return true. |
| Symbol        | Return true.                                                                               |
| Object        | Return true.                                                                               |
--------------------------------------------------------------------------------------------------------------
*/
    function ToBoolean(argument) { // eslint-disable-line no-unused-vars
        return Boolean(argument);
    }

// _ESAbstract.ToObject
// 7.1.13 ToObject ( argument )
// The abstract operation ToObject converts argument to a value of type Object according to Table 12:
// Table 12: ToObject Conversions
    /*
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Argument Type | Result                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Undefined     | Throw a TypeError exception.                                                                                                       |
| Null          | Throw a TypeError exception.                                                                                                       |
| Boolean       | Return a new Boolean object whose [[BooleanData]] internal slot is set to argument. See 19.3 for a description of Boolean objects. |
| Number        | Return a new Number object whose [[NumberData]] internal slot is set to argument. See 20.1 for a description of Number objects.    |
| String        | Return a new String object whose [[StringData]] internal slot is set to argument. See 21.1 for a description of String objects.    |
| Symbol        | Return a new Symbol object whose [[SymbolData]] internal slot is set to argument. See 19.4 for a description of Symbol objects.    |
| Object        | Return argument.                                                                                                                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
*/
    function ToObject(argument) { // eslint-disable-line no-unused-vars
        if (argument === null || argument === undefined) {
            throw TypeError();
        }
        return Object(argument);
    }

// _ESAbstract.GetV
    /* global ToObject */
// 7.3.2 GetV (V, P)
    function GetV(v, p) { // eslint-disable-line no-unused-vars
        // 1. Assert: IsPropertyKey(P) is true.
        // 2. Let O be ? ToObject(V).
        var o = ToObject(v);
        // 3. Return ? O.[[Get]](P, V).
        return o[p];
    }

// _ESAbstract.GetMethod
    /* global GetV, IsCallable */
// 7.3.9. GetMethod ( V, P )
    function GetMethod(V, P) { // eslint-disable-line no-unused-vars
        // 1. Assert: IsPropertyKey(P) is true.
        // 2. Let func be ? GetV(V, P).
        var func = GetV(V, P);
        // 3. If func is either undefined or null, return undefined.
        if (func === null || func === undefined) {
            return undefined;
        }
        // 4. If IsCallable(func) is false, throw a TypeError exception.
        if (IsCallable(func) === false) {
            throw new TypeError('Method not callable: ' + P);
        }
        // 5. Return func.
        return func;
    }

// _ESAbstract.Type
// "Type(x)" is used as shorthand for "the type of x"...
    function Type(x) { // eslint-disable-line no-unused-vars
        switch (typeof x) {
            case 'undefined':
                return 'undefined';
            case 'boolean':
                return 'boolean';
            case 'number':
                return 'number';
            case 'string':
                return 'string';
            case 'symbol':
                return 'symbol';
            default:
                // typeof null is 'object'
                if (x === null) return 'null';
                // Polyfill.io - This is here because a Symbol polyfill will have a typeof `object`.
                if ('Symbol' in self && (x instanceof self.Symbol || x.constructor === self.Symbol)) return 'symbol';

                return 'object';
        }
    }

// _ESAbstract.CreateIterResultObject
    /* global Type, CreateDataProperty */
// 7.4.7. CreateIterResultObject ( value, done )
    function CreateIterResultObject(value, done) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(done) is Boolean.
        if (Type(done) !== 'boolean') {
            throw new Error();
        }
        // 2. Let obj be ObjectCreate(%ObjectPrototype%).
        var obj = {};
        // 3. Perform CreateDataProperty(obj, "value", value).
        CreateDataProperty(obj, "value", value);
        // 4. Perform CreateDataProperty(obj, "done", done).
        CreateDataProperty(obj, "done", done);
        // 5. Return obj.
        return obj;
    }

// _ESAbstract.GetPrototypeFromConstructor
    /* global Get, Type */
// 9.1.14. GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
    function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
        // 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object. The corresponding object must be an intrinsic that is intended to be used as the [[Prototype]] value of an object.
        // 2. Assert: IsCallable(constructor) is true.
        // 3. Let proto be ? Get(constructor, "prototype").
        var proto = Get(constructor, "prototype");
        // 4. If Type(proto) is not Object, then
        if (Type(proto) !== 'object') {
            // a. Let realm be ? GetFunctionRealm(constructor).
            // b. Set proto to realm's intrinsic object named intrinsicDefaultProto.
            proto = intrinsicDefaultProto;
        }
        // 5. Return proto.
        return proto;
    }

// _ESAbstract.OrdinaryCreateFromConstructor
    /* global GetPrototypeFromConstructor */
// 9.1.13. OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto [ , internalSlotsList ] )
    function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) { // eslint-disable-line no-unused-vars
        var internalSlotsList = arguments[2] || {};
        // 1. Assert: intrinsicDefaultProto is a String value that is this specification's name of an intrinsic object.
        // The corresponding object must be an intrinsic that is intended to be used as the[[Prototype]] value of an object.

        // 2. Let proto be ? GetPrototypeFromConstructor(constructor, intrinsicDefaultProto).
        var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);

        // 3. Return ObjectCreate(proto, internalSlotsList).
        // Polyfill.io - We do not pass internalSlotsList to Object.create because Object.create does not use the default ordinary object definitions specified in 9.1.
        var obj = Object.create(proto);
        for (var name in internalSlotsList) {
            if (Object.prototype.hasOwnProperty.call(internalSlotsList, name)) {
                Object.defineProperty(obj, name, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: internalSlotsList[name]
                });
            }
        }
        return obj;
    }

// _ESAbstract.IsConstructor
    /* global Type */
// 7.2.4. IsConstructor ( argument )
    function IsConstructor(argument) { // eslint-disable-line no-unused-vars
        // 1. If Type(argument) is not Object, return false.
        if (Type(argument) !== 'object') {
            return false;
        }
        // 2. If argument has a [[Construct]] internal method, return true.
        // 3. Return false.

        // Polyfill.io - `new argument` is the only way  to truly test if a function is a constructor.
        // We choose to not use`new argument` because the argument could have side effects when called.
        // Instead we check to see if the argument is a function and if it has a prototype.
        // Arrow functions do not have a [[Construct]] internal method, nor do they have a prototype.
        return typeof argument === 'function' && !!argument.prototype;
    }

// _ESAbstract.Construct
    /* global IsConstructor, OrdinaryCreateFromConstructor, Call */
// 7.3.13. Construct ( F [ , argumentsList [ , newTarget ]] )
    function Construct(F /* [ , argumentsList [ , newTarget ]] */) { // eslint-disable-line no-unused-vars
        // 1. If newTarget is not present, set newTarget to F.
        var newTarget = arguments.length > 2 ? arguments[2] : F;

        // 2. If argumentsList is not present, set argumentsList to a new empty List.
        var argumentsList = arguments.length > 1 ? arguments[1] : [];

        // 3. Assert: IsConstructor(F) is true.
        if (!IsConstructor(F)) {
            throw new TypeError('F must be a constructor.');
        }

        // 4. Assert: IsConstructor(newTarget) is true.
        if (!IsConstructor(newTarget)) {
            throw new TypeError('newTarget must be a constructor.');
        }

        // 5. Return ? F.[[Construct]](argumentsList, newTarget).
        // Polyfill.io - If newTarget is the same as F, it is equivalent to new F(...argumentsList).
        if (newTarget === F) {
            return new (Function.prototype.bind.apply(F, [null].concat(argumentsList)))();
        } else {
            // Polyfill.io - This is mimicking section 9.2.2 step 5.a.
            var obj = OrdinaryCreateFromConstructor(newTarget, Object.prototype);
            return Call(F, obj, argumentsList);
        }
    }

// _ESAbstract.IsRegExp
    /* global Type, Get, ToBoolean */
// 7.2.8. IsRegExp ( argument )
    function IsRegExp(argument) { // eslint-disable-line no-unused-vars
        // 1. If Type(argument) is not Object, return false.
        if (Type(argument) !== 'object') {
            return false;
        }
        // 2. Let matcher be ? Get(argument, @@match).
        var matcher = 'Symbol' in self && 'match' in self.Symbol ? Get(argument, self.Symbol.match) : undefined;
        // 3. If matcher is not undefined, return ToBoolean(matcher).
        if (matcher !== undefined) {
            return ToBoolean(matcher);
        }
        // 4. If argument has a [[RegExpMatcher]] internal slot, return true.
        try {
            var lastIndex = argument.lastIndex;
            argument.lastIndex = 0;
            RegExp.prototype.exec.call(argument);
            return true;
            // eslint-disable-next-line no-empty
        } catch (e) {} finally {
            argument.lastIndex = lastIndex;
        }
        // 5. Return false.
        return false;
    }

// _ESAbstract.IteratorClose
    /* global GetMethod, Type, Call */
// 7.4.6. IteratorClose ( iteratorRecord, completion )
    function IteratorClose(iteratorRecord, completion) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(iteratorRecord.[[Iterator]]) is Object.
        if (Type(iteratorRecord['[[Iterator]]']) !== 'object') {
            throw new Error(Object.prototype.toString.call(iteratorRecord['[[Iterator]]']) + 'is not an Object.');
        }
        // 2. Assert: completion is a Completion Record.
        // Polyfill.io - Ignoring this step as there is no way to check if something is a Completion Record in userland JavaScript.

        // 3. Let iterator be iteratorRecord.[[Iterator]].
        var iterator = iteratorRecord['[[Iterator]]'];
        // 4. Let return be ? GetMethod(iterator, "return").
        // Polyfill.io - We name it  returnMethod because return is a keyword and can not be used as an identifier (E.G. variable name, function name etc).
        var returnMethod = GetMethod(iterator, "return");
        // 5. If return is undefined, return Completion(completion).
        if (returnMethod === undefined) {
            return completion;
        }
        // 6. Let innerResult be Call(return, iterator, « »).
        try {
            var innerResult = Call(returnMethod, iterator);
        } catch (error) {
            var innerException = error;
        }
        // 7. If completion.[[Type]] is throw, return Completion(completion).
        if (completion) {
            return completion;
        }
        // 8. If innerResult.[[Type]] is throw, return Completion(innerResult).
        if (innerException) {
            throw innerException;
        }
        // 9. If Type(innerResult.[[Value]]) is not Object, throw a TypeError exception.
        if (Type(innerResult) !== 'object') {
            throw new TypeError("Iterator's return method returned a non-object.");
        }
        // 10. Return Completion(completion).
        return completion;
    }

// _ESAbstract.IteratorComplete
    /* global Type, ToBoolean, Get */
// 7.4.3 IteratorComplete ( iterResult )
    function IteratorComplete(iterResult) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(iterResult) is Object.
        if (Type(iterResult) !== 'object') {
            throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
        }
        // 2. Return ToBoolean(? Get(iterResult, "done")).
        return ToBoolean(Get(iterResult, "done"));
    }

// _ESAbstract.IteratorNext
    /* global Call, Type */
// 7.4.2. IteratorNext ( iteratorRecord [ , value ] )
    function IteratorNext(iteratorRecord /* [, value] */) { // eslint-disable-line no-unused-vars
        // 1. If value is not present, then
        if (arguments.length < 2) {
            // a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « »).
            var result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]']);
            // 2. Else,
        } else {
            // a. Let result be ? Call(iteratorRecord.[[NextMethod]], iteratorRecord.[[Iterator]], « value »).
            result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]'], [arguments[1]]);
        }
        // 3. If Type(result) is not Object, throw a TypeError exception.
        if (Type(result) !== 'object') {
            throw new TypeError('bad iterator');
        }
        // 4. Return result.
        return result;
    }

// _ESAbstract.IteratorStep
    /* global IteratorNext, IteratorComplete */
// 7.4.5. IteratorStep ( iteratorRecord )
    function IteratorStep(iteratorRecord) { // eslint-disable-line no-unused-vars
        // 1. Let result be ? IteratorNext(iteratorRecord).
        var result = IteratorNext(iteratorRecord);
        // 2. Let done be ? IteratorComplete(result).
        var done = IteratorComplete(result);
        // 3. If done is true, return false.
        if (done === true) {
            return false;
        }
        // 4. Return result.
        return result;
    }

// _ESAbstract.IteratorValue
    /* global Type, Get */
// 7.4.4 IteratorValue ( iterResult )
    function IteratorValue(iterResult) { // eslint-disable-line no-unused-vars
        // Assert: Type(iterResult) is Object.
        if (Type(iterResult) !== 'object') {
            throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
        }
        // Return ? Get(iterResult, "value").
        return Get(iterResult, "value");
    }

// _ESAbstract.OrdinaryToPrimitive
    /* global Get, IsCallable, Call, Type */
// 7.1.1.1. OrdinaryToPrimitive ( O, hint )
    function OrdinaryToPrimitive(O, hint) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(O) is Object.
        // 2. Assert: Type(hint) is String and its value is either "string" or "number".
        // 3. If hint is "string", then
        if (hint === 'string') {
            // a. Let methodNames be « "toString", "valueOf" ».
            var methodNames = ['toString', 'valueOf'];
            // 4. Else,
        } else {
            // a. Let methodNames be « "valueOf", "toString" ».
            methodNames = ['valueOf', 'toString'];
        }
        // 5. For each name in methodNames in List order, do
        for (var i = 0; i < methodNames.length; ++i) {
            var name = methodNames[i];
            // a. Let method be ? Get(O, name).
            var method = Get(O, name);
            // b. If IsCallable(method) is true, then
            if (IsCallable(method)) {
                // i. Let result be ? Call(method, O).
                var result = Call(method, O);
                // ii. If Type(result) is not Object, return result.
                if (Type(result) !== 'object') {
                    return result;
                }
            }
        }
        // 6. Throw a TypeError exception.
        throw new TypeError('Cannot convert to primitive.');
    }

// _ESAbstract.SameValueZero
    /* global Type, SameValueNonNumber */
// 7.2.11. SameValueZero ( x, y )
    function SameValueZero (x, y) { // eslint-disable-line no-unused-vars
        // 1. If Type(x) is different from Type(y), return false.
        if (Type(x) !== Type(y)) {
            return false;
        }
        // 2. If Type(x) is Number, then
        if (Type(x) === 'number') {
            // a. If x is NaN and y is NaN, return true.
            if (isNaN(x) && isNaN(y)) {
                return true;
            }
            // b. If x is +0 and y is -0, return true.
            if (1/x === Infinity && 1/y === -Infinity) {
                return true;
            }
            // c. If x is -0 and y is +0, return true.
            if (1/x === -Infinity && 1/y === Infinity) {
                return true;
            }
            // d. If x is the same Number value as y, return true.
            if (x === y) {
                return true;
            }
            // e. Return false.
            return false;
        }
        // 3. Return SameValueNonNumber(x, y).
        return SameValueNonNumber(x, y);
    }

// _ESAbstract.ToInteger
    /* global Type */
// 7.1.4. ToInteger ( argument )
    function ToInteger(argument) { // eslint-disable-line no-unused-vars
        if (Type(argument) === 'symbol') {
            throw new TypeError('Cannot convert a Symbol value to a number');
        }

        // 1. Let number be ? ToNumber(argument).
        var number = Number(argument);
        // 2. If number is NaN, return +0.
        if (isNaN(number)) {
            return 0;
        }
        // 3. If number is +0, -0, +∞, or -∞, return number.
        if (1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
            return number;
        }
        // 4. Return the number value that is the same sign as number and whose magnitude is floor(abs(number)).
        return ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
    }

// _ESAbstract.ToLength
    /* global ToInteger */
// 7.1.15. ToLength ( argument )
    function ToLength(argument) { // eslint-disable-line no-unused-vars
        // 1. Let len be ? ToInteger(argument).
        var len = ToInteger(argument);
        // 2. If len ≤ +0, return +0.
        if (len <= 0) {
            return 0;
        }
        // 3. Return min(len, 253-1).
        return Math.min(len, Math.pow(2, 53) -1);
    }

// _ESAbstract.ToPrimitive
    /* global Type, GetMethod, Call, OrdinaryToPrimitive */
// 7.1.1. ToPrimitive ( input [ , PreferredType ] )
    function ToPrimitive(input /* [, PreferredType] */) { // eslint-disable-line no-unused-vars
        var PreferredType = arguments.length > 1 ? arguments[1] : undefined;
        // 1. Assert: input is an ECMAScript language value.
        // 2. If Type(input) is Object, then
        if (Type(input) === 'object') {
            // a. If PreferredType is not present, let hint be "default".
            if (arguments.length < 2) {
                var hint = 'default';
                // b. Else if PreferredType is hint String, let hint be "string".
            } else if (PreferredType === String) {
                hint = 'string';
                // c. Else PreferredType is hint Number, let hint be "number".
            } else if (PreferredType === Number) {
                hint = 'number';
            }
            // d. Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
            var exoticToPrim = typeof self.Symbol === 'function' && typeof self.Symbol.toPrimitive === 'symbol' ? GetMethod(input, self.Symbol.toPrimitive) : undefined;
            // e. If exoticToPrim is not undefined, then
            if (exoticToPrim !== undefined) {
                // i. Let result be ? Call(exoticToPrim, input, « hint »).
                var result = Call(exoticToPrim, input, [hint]);
                // ii. If Type(result) is not Object, return result.
                if (Type(result) !== 'object') {
                    return result;
                }
                // iii. Throw a TypeError exception.
                throw new TypeError('Cannot convert exotic object to primitive.');
            }
            // f. If hint is "default", set hint to "number".
            if (hint === 'default') {
                hint = 'number';
            }
            // g. Return ? OrdinaryToPrimitive(input, hint).
            return OrdinaryToPrimitive(input, hint);
        }
        // 3. Return input
        return input;
    }
// _ESAbstract.ToString
    /* global Type, ToPrimitive */
// 7.1.12. ToString ( argument )
// The abstract operation ToString converts argument to a value of type String according to Table 11:
// Table 11: ToString Conversions
    /*
|---------------|--------------------------------------------------------|
| Argument Type | Result                                                 |
|---------------|--------------------------------------------------------|
| Undefined     | Return "undefined".                                    |
|---------------|--------------------------------------------------------|
| Null	        | Return "null".                                         |
|---------------|--------------------------------------------------------|
| Boolean       | If argument is true, return "true".                    |
|               | If argument is false, return "false".                  |
|---------------|--------------------------------------------------------|
| Number        | Return NumberToString(argument).                       |
|---------------|--------------------------------------------------------|
| String        | Return argument.                                       |
|---------------|--------------------------------------------------------|
| Symbol        | Throw a TypeError exception.                           |
|---------------|--------------------------------------------------------|
| Object        | Apply the following steps:                             |
|               | Let primValue be ? ToPrimitive(argument, hint String). |
|               | Return ? ToString(primValue).                          |
|---------------|--------------------------------------------------------|
*/
    function ToString(argument) { // eslint-disable-line no-unused-vars
        switch(Type(argument)) {
            case 'symbol':
                throw new TypeError('Cannot convert a Symbol value to a string');
            case 'object':
                var primValue = ToPrimitive(argument, String);
                return ToString(primValue); // eslint-disable-line no-unused-vars
            default:
                return String(argument);
        }
    }

// _ESAbstract.ToPropertyKey
    /* globals ToPrimitive, Type, ToString */
// 7.1.14. ToPropertyKey ( argument )
    function ToPropertyKey(argument) { // eslint-disable-line no-unused-vars
        // 1. Let key be ? ToPrimitive(argument, hint String).
        var key = ToPrimitive(argument, String);
        // 2. If Type(key) is Symbol, then
        if (Type(key) === 'symbol') {
            // a. Return key.
            return key;
        }
        // 3. Return ! ToString(key).
        return ToString(key);
    }

// _ESAbstract.TrimString
    /* eslint-disable no-control-regex */
    /* global RequireObjectCoercible, ToString */
// TrimString ( string, where )
    function TrimString(string, where) { // eslint-disable-line no-unused-vars
        // 1. Let str be ? RequireObjectCoercible(string).
        var str = RequireObjectCoercible(string);
        // 2. Let S be ? ToString(str).
        var S = ToString(str);
        // 3. If where is "start", let T be a String value that is a copy of S with leading white space removed.
        // The definition of white space is the union of WhiteSpace and LineTerminator. When determining whether a Unicode code point is in Unicode general category “Space_Separator” (“Zs”), code unit sequences are interpreted as UTF-16 encoded code point sequences as specified in 6.1.4.
        var whitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/.source;
        if (where === 'start') {
            var T = String.prototype.replace.call(S, new RegExp('^' + whitespace, 'g'), '');
            // 4. Else if where is "end", let T be a String value that is a copy of S with trailing white space removed.
        } else if (where === "end") {
            T = String.prototype.replace.call(S, new RegExp(whitespace + '$', 'g'), '');
            // 5. Else,
        } else {
            // a. Assert: where is "start+end".
            // b. Let T be a String value that is a copy of S with both leading and trailing white space removed.
            T = String.prototype.replace.call(S, new RegExp('^' + whitespace + '|' + whitespace + '$', 'g'), '');
        }
        // 6. Return T.
        return T;
    }
// _mutation
    var _mutation = (function () { // eslint-disable-line no-unused-vars

        function isNode(object) {
            // DOM, Level2
            if (typeof Node === 'function') {
                return object instanceof Node;
            }
            // Older browsers, check if it looks like a Node instance)
            return object &&
                typeof object === "object" &&
                object.nodeName &&
                object.nodeType >= 1 &&
                object.nodeType <= 12;
        }

        // http://dom.spec.whatwg.org/#mutation-method-macro
        return function mutation(nodes) {
            if (nodes.length === 1) {
                return isNode(nodes[0]) ? nodes[0] : document.createTextNode(nodes[0] + '');
            }

            var fragment = document.createDocumentFragment();
            for (var i = 0; i < nodes.length; i++) {
                fragment.appendChild(isNode(nodes[i]) ? nodes[i] : document.createTextNode(nodes[i] + ''));

            }
            return fragment;
        };
    }());

// Array.prototype.fill
    /* global CreateMethodProperty, Get, ToInteger, ToLength, ToObject, ToString */
// 22.1.3.6. Array.prototype.fill ( value [ , start [ , end ] ] )
    CreateMethodProperty(Array.prototype, 'fill', function fill(value /* [ , start [ , end ] ] */) {
        var start = arguments[1];
        var end = arguments[2];
        // 1. Let O be ? ToObject(this value).
        var O = ToObject(this);
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = ToLength(Get(O, "length"));
        // 3. Let relativeStart be ? ToInteger(start).
        var relativeStart = ToInteger(start);
        // 4. If relativeStart < 0, let k be max((len + relativeStart), 0); else let k be min(relativeStart, len)
        var k = relativeStart < 0 ? Math.max((len + relativeStart), 0) : Math.min(relativeStart, len);
        // 5. If end is undefined, let relativeEnd be len; else let relativeEnd be ? ToInteger(end).
        var relativeEnd = end === undefined ? len : ToInteger(end);
        // 6. If relativeEnd < 0, let final be max((len + relativeEnd), 0); else let final be min(relativeEnd, len).
        var final = relativeEnd < 0 ? Math.max((len + relativeEnd), 0) : Math.min(relativeEnd, len);
        // 7. Repeat, while k < final
        while (k < final) {
            // a. Let Pk be ! ToString(k).
            var Pk = ToString(k);
            // b. Perform ? Set(O, Pk, value, true).
            O[Pk] = value;
            // c. Increase k by 1.
            k = k + 1;
        }
        // 8. Return O.
        return O;
    });

// Array.prototype.find
    /* global Call, CreateMethodProperty, Get, IsCallable, ToBoolean, ToLength, ToObject, ToString */
// 22.1.3.8 Array.prototype.find ( predicate [ , thisArg ] )
    CreateMethodProperty(Array.prototype, 'find', function find( predicate /* [ , thisArg ] */) {
        // 1. Let O be ? ToObject(this value).
        var O = ToObject(this);
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = ToLength(Get(O, "length"));
        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (IsCallable(predicate) === false) {
            throw new TypeError(predicate + ' is not a function');
        }
        // 4. If thisArg is present, let T be thisArg; else let T be undefined.
        var T = arguments.length > 1 ? arguments[1] : undefined;
        // 5. Let k be 0.
        var k = 0;
        // 6. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ! ToString(k).
            var Pk = ToString(k);
            // b. Let kValue be ? Get(O, Pk).
            var kValue = Get(O, Pk);
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
            var testResult = ToBoolean(Call(predicate, T, [kValue, k, O ]));
            // d. If testResult is true, return kValue.
            if (testResult) {
                return kValue;
            }
            // e. Increase k by 1.
            k = k + 1;
        }
        // 7. Return undefined.
        return undefined;
    });

// Array.prototype.includes
    /* global CreateMethodProperty, Get, SameValueZero, ToInteger, ToLength, ToObject, ToString */
// 22.1.3.11. Array.prototype.includes ( searchElement [ , fromIndex ] )
    CreateMethodProperty(Array.prototype, 'includes', function includes(searchElement /* [ , fromIndex ] */) {
        'use strict';
        // 1. Let O be ? ToObject(this value).
        var O = ToObject(this);
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = ToLength(Get(O, "length"));
        // 3. If len is 0, return false.
        if (len === 0) {
            return false;
        }
        // 4. Let n be ? ToInteger(fromIndex). (If fromIndex is undefined, this step produces the value 0.)
        var n = ToInteger(arguments[1]);
        // 5. If n ≥ 0, then
        if (n >= 0) {
            // a. Let k be n.
            var k = n;
            // 6. Else n < 0,
        } else {
            // a. Let k be len + n.
            k = len + n;
            // b. If k < 0, let k be 0.
            if (k < 0) {
                k = 0;
            }
        }
        // 7. Repeat, while k < len
        while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            var elementK = Get(O, ToString(k));
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            if (SameValueZero(searchElement, elementK)) {
                return true;
            }
            // c. Increase k by 1.
            k = k + 1;
        }
        // 8. Return false.
        return false;
    });

// DOMTokenList
    /* global _DOMTokenList */
    (function (global) {
        var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

        if (
            !nativeImpl ||
            (
                !!document.createElementNS &&
                !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') &&
                !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)
            )
        ) {
            global.DOMTokenList = _DOMTokenList;
        }

        // Add second argument to native DOMTokenList.toggle() if necessary
        (function () {
            var e = document.createElement('span');
            if (!('classList' in e)) return;
            e.classList.toggle('x', false);
            if (!e.classList.contains('x')) return;
            e.classList.constructor.prototype.toggle = function toggle(token /*, force*/) {
                var force = arguments[1];
                if (force === undefined) {
                    var add = !this.contains(token);
                    this[add ? 'add' : 'remove'](token);
                    return add;
                }
                force = !!force;
                this[force ? 'add' : 'remove'](token);
                return force;
            };
        }());

        // Add multiple arguments to native DOMTokenList.add() if necessary
        (function () {
            var e = document.createElement('span');
            if (!('classList' in e)) return;
            e.classList.add('a', 'b');
            if (e.classList.contains('b')) return;
            var native = e.classList.constructor.prototype.add;
            e.classList.constructor.prototype.add = function () {
                var args = arguments;
                var l = arguments.length;
                for (var i = 0; i < l; i++) {
                    native.call(this, args[i]);
                }
            };
        }());

        // Add multiple arguments to native DOMTokenList.remove() if necessary
        (function () {
            var e = document.createElement('span');
            if (!('classList' in e)) return;
            e.classList.add('a');
            e.classList.add('b');
            e.classList.remove('a', 'b');
            if (!e.classList.contains('b')) return;
            var native = e.classList.constructor.prototype.remove;
            e.classList.constructor.prototype.remove = function () {
                var args = arguments;
                var l = arguments.length;
                for (var i = 0; i < l; i++) {
                    native.call(this, args[i]);
                }
            };
        }());

    }(self));

// Element.prototype.classList
    /* global _DOMTokenList */
    /*
Copyright (c) 2016, John Gardner

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
    (function (global) {
        var dpSupport = true;
        var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty)
                Object.defineProperty(object, name, {
                    configurable: false === dpSupport ? true : !!configurable,
                    get: fn
                });

            else object.__defineGetter__(name, fn);
        };
        /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
        try {
            defineGetter({}, "support");
        }
        catch (e) {
            dpSupport = false;
        }
        /** Polyfills a property with a DOMTokenList */
        var addProp = function (o, name, attr) {

            defineGetter(o.prototype, name, function () {
                var tokenList;

                var THIS = this,

                    /** Prevent this from firing twice for some reason. What the hell, IE. */
                    gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
                if(THIS[gibberishProperty]) return tokenList;
                THIS[gibberishProperty] = true;

                /**
                 * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
                 *
                 * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
                 * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
                 * element instead, this would conflict with element types which use indexed properties (such as forms and
                 * select lists).
                 */
                if (false === dpSupport) {

                    var visage;
                    var mirror = addProp.mirror || document.createElement("div");
                    var reflections = mirror.childNodes;
                    var l = reflections.length;

                    for (var i = 0; i < l; ++i)
                        if (reflections[i]._R === THIS) {
                            visage = reflections[i];
                            break;
                        }

                    /** Couldn't find an element's reflection inside the mirror. Materialise one. */
                    visage || (visage = mirror.appendChild(document.createElement("div")));

                    tokenList = DOMTokenList.call(visage, THIS, attr);
                } else tokenList = new _DOMTokenList(THIS, attr);

                defineGetter(THIS, name, function () {
                    return tokenList;
                });
                delete THIS[gibberishProperty];

                return tokenList;
            }, true);
        };

        addProp(global.Element, "classList", "className");
        addProp(global.HTMLElement, "classList", "className");
        addProp(global.HTMLLinkElement, "relList", "rel");
        addProp(global.HTMLAnchorElement, "relList", "rel");
        addProp(global.HTMLAreaElement, "relList", "rel");
    }(self));

// DOMTokenList.prototype.forEach
    DOMTokenList.prototype.forEach = Array.prototype.forEach;

// Element.prototype.matches
    Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {

        var element = this;
        var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
        var index = 0;

        while (elements[index] && elements[index] !== element) {
            ++index;
        }

        return !!elements[index];
    };

// Element.prototype.closest
    Element.prototype.closest = function closest(selector) {
        var node = this;

        while (node) {
            if (node.matches(selector)) return node;
            else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
        }

        return null;
    };

// Element.prototype.remove
    Document.prototype.remove = Element.prototype.remove = function remove() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };

// Not all UAs support the Text constructor.  Polyfill on the Text constructor only where it exists
// TODO: Add a polyfill for the Text constructor, and make it a dependency of this polyfill.
    if ("Text" in self) {
        Text.prototype.remove = Element.prototype.remove;
    }

// NodeList.prototype.forEach
    NodeList.prototype.forEach = Array.prototype.forEach;
// Object.getOwnPropertyDescriptor
    /* global CreateMethodProperty, ToObject, ToPropertyKey, HasOwnProperty, Type */
    (function () {
        var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

        var supportsDOMDescriptors = (function () {
            try {
                return Object.defineProperty(document.createElement('div'), 'one', {
                    get: function () {
                        return 1;
                    }
                }).one === 1;
            } catch (e) {
                return false;
            }
        });

        var toString = ({}).toString;
        var split = ''.split;

        // 19.1.2.8 Object.getOwnPropertyDescriptor ( O, P )
        CreateMethodProperty(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(O, P) {
            // 1. Let obj be ? ToObject(O).
            var obj = ToObject(O);
            // Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
            obj = (Type(obj) === 'string' || obj instanceof String) && toString.call(O) == '[object String]' ? split.call(O, '') : Object(O);

            // 2. Let key be ? ToPropertyKey(P).
            var key = ToPropertyKey(P);

            // 3. Let desc be ? obj.[[GetOwnProperty]](key).
            // 4. Return FromPropertyDescriptor(desc).
            // Polyfill.io Internet Explorer 8 natively supports property descriptors only on DOM objects.
            // We will fallback to the polyfill implementation if the native implementation throws an error.
            if (supportsDOMDescriptors) {
                try {
                    return nativeGetOwnPropertyDescriptor(obj, key);
                    // eslint-disable-next-line no-empty
                } catch (error) {}
            }
            if (HasOwnProperty(obj, key)) {
                return {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: obj[key]
                };
            }
        });
    }());

// Object.isExtensible
    /* global CreateMethodProperty, Type */

    (function (nativeIsExtensible) {
        // 19.1.2.13 Object.isExtensible ( O )
        CreateMethodProperty(Object, 'isExtensible', function isExtensible(O) {
            // 1. If Type(O) is not Object, return false.
            if (Type(O) !== "object") {
                return false;
            }
            // 2. Return ? IsExtensible(O).
            return nativeIsExtensible ? nativeIsExtensible(O) : true;
        });
    }(Object.isExtensible));

// Object.keys
    /* global CreateMethodProperty */
    CreateMethodProperty(Object, "keys", (function() {
        'use strict';

        // modified from https://github.com/es-shims/object-keys

        var has = Object.prototype.hasOwnProperty;
        var toStr = Object.prototype.toString;
        var isEnumerable = Object.prototype.propertyIsEnumerable;
        var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
        var hasPrototypeEnumBug = isEnumerable.call(function () { }, 'prototype');
        function hasProtoEnumBug() {
            // Object.create polyfill creates an enumerable __proto__
            var createdObj;
            try {
                createdObj = Object.create({});
            } catch (e) {
                // If this fails the polyfil isn't loaded yet, but will be.
                // Can't add it to depedencies because of it would create a circular depedency.
                return true;
            }

            return isEnumerable.call(createdObj, '__proto__')
        }

        var dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ];
        var equalsConstructorPrototype = function (o) {
            var ctor = o.constructor;
            return ctor && ctor.prototype === o;
        };
        var excludedKeys = {
            $console: true,
            $external: true,
            $frame: true,
            $frameElement: true,
            $frames: true,
            $innerHeight: true,
            $innerWidth: true,
            $outerHeight: true,
            $outerWidth: true,
            $pageXOffset: true,
            $pageYOffset: true,
            $parent: true,
            $scrollLeft: true,
            $scrollTop: true,
            $scrollX: true,
            $scrollY: true,
            $self: true,
            $webkitIndexedDB: true,
            $webkitStorageInfo: true,
            $window: true
        };
        var hasAutomationEqualityBug = (function () {
            if (typeof window === 'undefined') { return false; }
            for (var k in window) {
                try {
                    if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                        try {
                            equalsConstructorPrototype(window[k]);
                        } catch (e) {
                            return true;
                        }
                    }
                } catch (e) {
                    return true;
                }
            }
            return false;
        }());
        var equalsConstructorPrototypeIfNotBuggy = function (o) {
            if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
                return equalsConstructorPrototype(o);
            }
            try {
                return equalsConstructorPrototype(o);
            } catch (e) {
                return false;
            }
        };

        function isArgumentsObject(value) {
            var str = toStr.call(value);
            var isArgs = str === '[object Arguments]';
            if (!isArgs) {
                isArgs = str !== '[object Array]' &&
                    value !== null &&
                    typeof value === 'object' &&
                    typeof value.length === 'number' &&
                    value.length >= 0 &&
                    toStr.call(value.callee) === '[object Function]';
            }
            return isArgs;
        }

        return function keys(object) {
            var isFunction = toStr.call(object) === '[object Function]';
            var isArguments = isArgumentsObject(object);
            var isString = toStr.call(object) === '[object String]';
            var theKeys = [];

            if (object === undefined || object === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var skipPrototype = hasPrototypeEnumBug && isFunction;
            if (isString && object.length > 0 && !has.call(object, 0)) {
                for (var i = 0; i < object.length; ++i) {
                    theKeys.push(String(i));
                }
            }

            if (isArguments && object.length > 0) {
                for (var j = 0; j < object.length; ++j) {
                    theKeys.push(String(j));
                }
            } else {
                for (var name in object) {
                    if (!(hasProtoEnumBug() && name === '__proto__') && !(skipPrototype && name === 'prototype') && has.call(object, name)) {
                        theKeys.push(String(name));
                    }
                }
            }

            if (hasDontEnumBug) {
                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

                for (var k = 0; k < dontEnums.length; ++k) {
                    if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
                        theKeys.push(dontEnums[k]);
                    }
                }
            }
            return theKeys;
        };
    }()));

// _ESAbstract.EnumerableOwnProperties
    /* globals Type, Get */
// 7.3.21. EnumerableOwnProperties ( O, kind )
    function EnumerableOwnProperties(O, kind) { // eslint-disable-line no-unused-vars
        // 1. Assert: Type(O) is Object.
        // 2. Let ownKeys be ? O.[[OwnPropertyKeys]]().
        var ownKeys = Object.keys(O);
        // 3. Let properties be a new empty List.
        var properties = [];
        // 4. For each element key of ownKeys in List order, do
        var length = ownKeys.length;
        for (var i = 0; i < length; i++) {
            var key = ownKeys[i];
            // a. If Type(key) is String, then
            if (Type(key) === 'string') {
                // i. Let desc be ? O.[[GetOwnProperty]](key).
                var desc = Object.getOwnPropertyDescriptor(O, key);
                // ii. If desc is not undefined and desc.[[Enumerable]] is true, then
                if (desc && desc.enumerable) {
                    // 1. If kind is "key", append key to properties.
                    if (kind === 'key') {
                        properties.push(key);
                        // 2. Else,
                    } else {
                        // a. Let value be ? Get(O, key).
                        var value = Get(O, key);
                        // b. If kind is "value", append value to properties.
                        if (kind === 'value') {
                            properties.push(value);
                            // c. Else,
                        } else {
                            // i. Assert: kind is "key+value".
                            // ii. Let entry be CreateArrayFromList(« key, value »).
                            var entry = [key, value];
                            // iii. Append entry to properties.
                            properties.push(entry);
                        }
                    }
                }
            }
        }
        // 5. Order the elements of properties so they are in the same relative order as would be produced by the Iterator that would be returned if the EnumerateObjectProperties internal method were invoked with O.
        // 6. Return properties.
        return properties;
    }

// Object.entries
    /* global CreateMethodProperty, EnumerableOwnProperties, ToObject, Type */

    (function () {
        var toString = ({}).toString;
        var split = ''.split;

        // 19.1.2.5. Object.entries ( O )
        CreateMethodProperty(Object, 'entries', function entries(O) {
            // 1. Let obj be ? ToObject(O).
            var obj = ToObject(O);
            // Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
            obj = (Type(obj) === 'string' || obj instanceof String) && toString.call(O) == '[object String]' ? split.call(O, '') : Object(O);
            // 2. Let nameList be ? EnumerableOwnProperties(obj, "key+value").
            var nameList = EnumerableOwnProperties(obj, "key+value");
            // 3. Return CreateArrayFromList(nameList).
            // Polyfill.io - nameList is already an array.
            return nameList;
        });
    }());
// Object.assign
    /* global CreateMethodProperty, Get, ToObject */
// 19.1.2.1 Object.assign ( target, ...sources )
    CreateMethodProperty(Object, 'assign', function assign(target, source) { // eslint-disable-line no-unused-vars
        // 1. Let to be ? ToObject(target).
        var to = ToObject(target);

        // 2. If only one argument was passed, return to.
        if (arguments.length === 1) {
            return to;
        }

        // 3. Let sources be the List of argument values starting with the second argument
        var sources = Array.prototype.slice.call(arguments, 1);

        // 4. For each element nextSource of sources, in ascending index order, do
        var index1;
        var index2;
        var keys;
        var from;
        for (index1 = 0; index1 < sources.length; index1++) {
            var nextSource = sources[index1];
            // a. If nextSource is undefined or null, let keys be a new empty List.
            if (nextSource === undefined || nextSource === null) {
                keys = [];
                // b. Else,
            } else {
                // Polyfill.io - In order to get strings in ES3 and old V8 working correctly we need to split them into an array ourselves.
                // i. Let from be ! ToObject(nextSource).
                from = Object.prototype.toString.call(nextSource) === '[object String]' ? String(nextSource).split('') : ToObject(nextSource);
                // ii. Let keys be ? from.[[OwnPropertyKeys]]().
                /*
				This step in our polyfill is not complying with the specification.
				[[OwnPropertyKeys]] is meant to return ALL keys, including non-enumerable and symbols.
				TODO: When we have Reflect.ownKeys, use that instead as it is the userland equivalent of [[OwnPropertyKeys]].
			*/
                keys = Object.keys(from);
            }

            // c. For each element nextKey of keys in List order, do
            for (index2 = 0; index2 < keys.length; index2++) {
                var nextKey = keys[index2];
                var enumerable;
                try {
                    // i. Let desc be ? from.[[GetOwnProperty]](nextKey).
                    var desc = Object.getOwnPropertyDescriptor(from, nextKey);
                    // ii. If desc is not undefined and desc.[[Enumerable]] is true, then
                    enumerable = desc !== undefined && desc.enumerable === true;
                } catch (e) {
                    // Polyfill.io - We use Object.prototype.propertyIsEnumerable as a fallback
                    // because `Object.getOwnPropertyDescriptor(window.location, 'hash')` causes Internet Explorer 11 to crash.
                    enumerable = Object.prototype.propertyIsEnumerable.call(from, nextKey);
                }
                if (enumerable) {
                    // 1. Let propValue be ? Get(from, nextKey).
                    var propValue = Get(from, nextKey);
                    // 2. Perform ? Set(to, nextKey, propValue, true).
                    to[nextKey] = propValue;
                }
            }
        }
        // 5. Return to.
        return to;
    });

// Object.getOwnPropertyNames
    /* global CreateMethodProperty, ToObject */
    (function() {
        var toString = {}.toString;
        var split = "".split;
        var concat = [].concat;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var nativeGetOwnPropertyNames = Object.getOwnPropertyNames || Object.keys;
        var cachedWindowNames =
            typeof self === "object" ? nativeGetOwnPropertyNames(self) : [];

        // 19.1.2.10 Object.getOwnPropertyNames ( O )
        CreateMethodProperty(
            Object,
            "getOwnPropertyNames",
            function getOwnPropertyNames(O) {
                var object = ToObject(O);

                if (toString.call(object) === "[object Window]") {
                    try {
                        return nativeGetOwnPropertyNames(object);
                    } catch (e) {
                        // IE bug where layout engine calls userland Object.getOwnPropertyNames for cross-domain `window` objects
                        return concat.call([], cachedWindowNames);
                    }
                }

                // Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
                object =
                    toString.call(object) == "[object String]"
                        ? split.call(object, "")
                        : Object(object);

                var result = nativeGetOwnPropertyNames(object);
                var extraNonEnumerableKeys = ["length", "prototype"];
                for (var i = 0; i < extraNonEnumerableKeys.length; i++) {
                    var key = extraNonEnumerableKeys[i];
                    if (hasOwnProperty.call(object, key) && !result.includes(key)) {
                        result.push(key);
                    }
                }

                if (result.includes("__proto__")) {
                    var index = result.indexOf("__proto__");
                    result.splice(index, 1);
                }

                return result;
            }
        );
    })();

// Object.setPrototypeOf
    /* global CreateMethodProperty */
// ES6-shim 0.16.0 (c) 2013-2014 Paul Miller (http://paulmillr.com)
// ES6-shim may be freely distributed under the MIT license.
// For more details and documentation:
// https://github.com/paulmillr/es6-shim/

    // NOTE:  This versions needs object ownership
    //        because every promoted object needs to be reassigned
    //        otherwise uncompatible browsers cannot work as expected
    //
    // NOTE:  This might need es5-shim or polyfills upfront
    //        because it's based on ES5 API.
    //        (probably just an IE <= 8 problem)
    //
    // NOTE:  nodejs is fine in version 0.8, 0.10, and future versions.
    (function () {
        if (Object.setPrototypeOf) { return; }

        /*jshint proto: true */
        // @author    Andrea Giammarchi - @WebReflection

        var getOwnPropertyNames = Object.getOwnPropertyNames;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var create = Object.create;
        var defineProperty = Object.defineProperty;
        var getPrototypeOf = Object.getPrototypeOf;
        var objProto = Object.prototype;

        var copyDescriptors = function (target, source) {
            // define into target descriptors from source
            getOwnPropertyNames(source).forEach(function (key) {
                defineProperty(
                    target,
                    key,
                    getOwnPropertyDescriptor(source, key)
                );
            });
            return target;
        };
        // used as fallback when no promotion is possible
        var createAndCopy = function setPrototypeOf(origin, proto) {
            return copyDescriptors(create(proto), origin);
        };
        var set, sPOf;
        try {
            // this might fail for various reasons
            // ignore if Chrome cought it at runtime
            set = getOwnPropertyDescriptor(objProto, '__proto__').set;
            set.call({}, null);
            // setter not poisoned, it can promote
            // Firefox, Chrome
            sPOf = function setPrototypeOf(origin, proto) {
                set.call(origin, proto);
                return origin;
            };
        } catch (e) {
            // do one or more feature detections
            set = { __proto__: null };
            // if proto does not work, needs to fallback
            // some Opera, Rhino, ducktape
            if (set instanceof Object) {
                sPOf = createAndCopy;
            } else {
                // verify if null objects are buggy
                /* eslint-disable no-proto */
                set.__proto__ = objProto;
                /* eslint-enable no-proto */
                // if null objects are buggy
                // nodejs 0.8 to 0.10
                if (set instanceof Object) {
                    sPOf = function setPrototypeOf(origin, proto) {
                        // use such bug to promote
                        /* eslint-disable no-proto */
                        origin.__proto__ = proto;
                        /* eslint-enable no-proto */
                        return origin;
                    };
                } else {
                    // try to use proto or fallback
                    // Safari, old Firefox, many others
                    sPOf = function setPrototypeOf(origin, proto) {
                        // if proto is not null
                        if (getPrototypeOf(origin)) {
                            // use __proto__ to promote
                            /* eslint-disable no-proto */
                            origin.__proto__ = proto;
                            /* eslint-enable no-proto */
                            return origin;
                        } else {
                            // otherwise unable to promote: fallback
                            return createAndCopy(origin, proto);
                        }
                    };
                }
            }
        }
        CreateMethodProperty(Object, 'setPrototypeOf', sPOf);
    }());

// Object.values
    /* global CreateMethodProperty, ToObject */
    (function () {
        var toString = ({}).toString;
        var split = ''.split;
        // 19.1.2.21. Object.values ( O )
        CreateMethodProperty(Object, 'values', function values(O) {
            // 1. Let obj be ? ToObject(O).
            // Polyfill.io fallback for non-array-like strings which exist in some ES3 user-agents (IE 8)
            var obj = toString.call(O) == '[object String]' ? split.call(O, '') : ToObject(O);
            // 2. Let nameList be ? EnumerableOwnProperties(obj, "value").
            var nameList = Object.keys(obj).map(function (key) {
                return obj[key];
            });
            // 3. Return CreateArrayFromList(nameList).
            // Polyfill.io - nameList is already an array.
            return nameList;
        });
    }());

// String.prototype.endsWith
    /* global CreateMethodProperty, IsRegExp, RequireObjectCoercible, ToInteger, ToString */
// 21.1.3.6. String.prototype.endsWith ( searchString [ , endPosition ] )
    CreateMethodProperty(String.prototype, 'endsWith', function endsWith(searchString /* [ , endPosition ] */) {
        'use strict';
        var endPosition = arguments.length > 1 ? arguments[1] : undefined;
        // 1. Let O be ? RequireObjectCoercible(this value).
        var O = RequireObjectCoercible(this);
        // 2. Let S be ? ToString(O).
        var S = ToString(O);
        // 3. Let isRegExp be ? IsRegExp(searchString).
        var isRegExp = IsRegExp(searchString);
        // 4. If isRegExp is true, throw a TypeError exception.
        if (isRegExp) {
            throw new TypeError('First argument to String.prototype.endsWith must not be a regular expression');
        }
        // 5. Let searchStr be ? ToString(searchString).
        var searchStr = ToString(searchString);
        // 6. Let len be the length of S.
        var len = S.length;
        // 7. If endPosition is undefined, let pos be len, else let pos be ? ToInteger(endPosition).
        var pos = endPosition === undefined ? len : ToInteger(endPosition);
        // 8. Let end be min(max(pos, 0), len).
        var end = Math.min(Math.max(pos, 0), len);
        // 9. Let searchLength be the length of searchStr.
        var searchLength = searchStr.length;
        // 10. Let start be end - searchLength.
        var start = end - searchLength;
        // 11. If start is less than 0, return false.
        if (start < 0) {
            return false;
        }
        // 12. If the sequence of elements of S starting at start of length searchLength is the same as the full element sequence of searchStr, return true.
        if (S.substr(start, searchLength) === searchStr) {
            return true;
        }
        // 13. Otherwise, return false.
        return false;
    });

// String.prototype.includes
    /* global CreateMethodProperty, IsRegExp, RequireObjectCoercible, ToInteger, ToString */
// 21.1.3.7. String.prototype.includes ( searchString [ , position ] )
    CreateMethodProperty(String.prototype, 'includes', function includes(searchString /* [ , position ] */) {
        'use strict';
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // 1. Let O be ? RequireObjectCoercible(this value).
        var O = RequireObjectCoercible(this);
        // 2. Let S be ? ToString(O).
        var S = ToString(O);
        // 3. Let isRegExp be ? IsRegExp(searchString).
        var isRegExp = IsRegExp(searchString);
        // 4. If isRegExp is true, throw a TypeError exception.
        if (isRegExp) {
            throw new TypeError('First argument to String.prototype.includes must not be a regular expression');
        }
        // 5. Let searchStr be ? ToString(searchString).
        var searchStr = ToString(searchString);
        // 6. Let pos be ? ToInteger(position). (If position is undefined, this step produces the value 0.)
        var pos = ToInteger(position);
        // 7. Let len be the length of S.
        var len = S.length;
        // 8. Let start be min(max(pos, 0), len).
        var start = Math.min(Math.max(pos, 0), len);
        // 9. Let searchLen be the length of searchStr.
        // var searchLength = searchStr.length;
        // 10. If there exists any integer k not smaller than start such that k + searchLen is not greater than len, and for all nonnegative integers j less than searchLen, the code unit at index k+j within S is the same as the code unit at index j within searchStr, return true; but if there is no such integer k, return false.
        return String.prototype.indexOf.call(S, searchStr, start) !== -1;
    });

// String.prototype.startsWith
    /* global CreateMethodProperty, IsRegExp, RequireObjectCoercible, ToInteger, ToString */
// 21.1.3.20. String.prototype.startsWith ( searchString [ , position ] )
    CreateMethodProperty(String.prototype, 'startsWith', function startsWith(searchString /* [ , position ] */) {
        'use strict';
        var position = arguments.length > 1 ? arguments[1] : undefined;
        // 1. Let O be ? RequireObjectCoercible(this value).
        var O = RequireObjectCoercible(this);
        // 2. Let S be ? ToString(O).
        var S = ToString(O);
        // 3. Let isRegExp be ? IsRegExp(searchString).
        var isRegExp = IsRegExp(searchString);
        // 4. If isRegExp is true, throw a TypeError exception.
        if (isRegExp) {
            throw new TypeError('First argument to String.prototype.startsWith must not be a regular expression');
        }
        // 5. Let searchStr be ? ToString(searchString).
        var searchStr = ToString(searchString);
        // 6. Let pos be ? ToInteger(position). (If position is undefined, this step produces the value 0.)
        var pos = ToInteger(position);
        // 7. Let len be the length of S.
        var len = S.length;
        // 8. Let start be min(max(pos, 0), len).
        var start = Math.min(Math.max(pos, 0), len);
        // 9. Let searchLength be the length of searchStr.
        var searchLength = searchStr.length;
        // 10. If searchLength+start is greater than len, return false.
        if (searchLength + start > len) {
            return false;
        }
        // 11. If the sequence of elements of S starting at start of length searchLength is the same as the full element sequence of searchStr, return true.
        if (S.substr(start).indexOf(searchString) === 0) {
            return true;
        }
        // 12. Otherwise, return false.
        return false;
    });

// String.prototype.trimEnd
    /* global CreateMethodProperty, TrimString */
// 21.1.3.28 String.prototype.trimEnd ( )
    CreateMethodProperty(String.prototype, 'trimEnd', function trimEnd() {
        'use strict';
        // 1. Let S be this value.
        var S = this;
        // 2. Return ? TrimString(S, "end").
        return TrimString(S, "end");
    });

// Symbol
// A modification of https://github.com/WebReflection/get-own-property-symbols
// (C) Andrea Giammarchi - MIT Licensed

    /* global Type */
    (function (Object,  GOPS, global) {
        'use strict'; //so that ({}).toString.call(null) returns the correct [object Null] rather than [object Window]

        var supportsGetters = (function () {
            // supports getters
            try {
                var a = {};
                Object.defineProperty(a, "t", {
                    configurable: true,
                    enumerable: false,
                    get: function () {
                        return true;
                    },
                    set: undefined
                });
                return !!a.t;
            } catch (e) {
                return false;
            }
        }());

        var	setDescriptor;
        var id = 0;
        var random = '' + Math.random();
        var prefix = '__\x01symbol:';
        var prefixLength = prefix.length;
        var internalSymbol = '__\x01symbol@@' + random;
        var emptySymbolLookup = {};
        var DP = 'defineProperty';
        var DPies = 'defineProperties';
        var GOPN = 'getOwnPropertyNames';
        var GOPD = 'getOwnPropertyDescriptor';
        var PIE = 'propertyIsEnumerable';
        var ObjectProto = Object.prototype;
        var hOP = ObjectProto.hasOwnProperty;
        var pIE = ObjectProto[PIE];
        var toString = ObjectProto.toString;
        var concat = Array.prototype.concat;
        var cachedWindowNames = Object.getOwnPropertyNames ? Object.getOwnPropertyNames(self) : [];
        var nGOPN = Object[GOPN];
        var gOPN = function getOwnPropertyNames (obj) {
            if (toString.call(obj) === '[object Window]') {
                try {
                    return nGOPN(obj);
                } catch (e) {
                    // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
                    return concat.call([], cachedWindowNames);
                }
            }
            return nGOPN(obj);
        };
        var gOPD = Object[GOPD];
        var objectCreate = Object.create;
        var objectKeys = Object.keys;
        var freeze = Object.freeze || Object;
        var objectDefineProperty = Object[DP];
        var $defineProperties = Object[DPies];
        var descriptor = gOPD(Object, GOPN);
        var addInternalIfNeeded = function (o, uid, enumerable) {
            if (!hOP.call(o, internalSymbol)) {
                try {
                    objectDefineProperty(o, internalSymbol, {
                        enumerable: false,
                        configurable: false,
                        writable: false,
                        value: {}
                    });
                } catch (e) {
                    o[internalSymbol] = {};
                }
            }
            o[internalSymbol]['@@' + uid] = enumerable;
        };
        var createWithSymbols = function (proto, descriptors) {
            var self = objectCreate(proto);
            gOPN(descriptors).forEach(function (key) {
                if (propertyIsEnumerable.call(descriptors, key)) {
                    $defineProperty(self, key, descriptors[key]);
                }
            });
            return self;
        };
        var copyAsNonEnumerable = function (descriptor) {
            var newDescriptor = objectCreate(descriptor);
            newDescriptor.enumerable = false;
            return newDescriptor;
        };
        var get = function get(){};
        var onlyNonSymbols = function (name) {
            return name != internalSymbol &&
                !hOP.call(source, name);
        };
        var onlySymbols = function (name) {
            return name != internalSymbol &&
                hOP.call(source, name);
        };
        var propertyIsEnumerable = function propertyIsEnumerable(key) {
            var uid = '' + key;
            return onlySymbols(uid) ? (
                hOP.call(this, uid) &&
                this[internalSymbol] && this[internalSymbol]['@@' + uid]
            ) : pIE.call(this, key);
        };
        var setAndGetSymbol = function (uid) {
            var descriptor = {
                enumerable: false,
                configurable: true,
                get: get,
                set: function (value) {
                    setDescriptor(this, uid, {
                        enumerable: false,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                    addInternalIfNeeded(this, uid, true);
                }
            };
            try {
                objectDefineProperty(ObjectProto, uid, descriptor);
            } catch (e) {
                ObjectProto[uid] = descriptor.value;
            }
            source[uid] = objectDefineProperty(
                Object(uid),
                'constructor',
                sourceConstructor
            );
            var description = gOPD(Symbol.prototype, 'description');
            if (description) {
                objectDefineProperty(
                    source[uid],
                    'description',
                    description
                );
            }
            return freeze(source[uid]);
        };

        var symbolDescription = function (s) {
            var sym = thisSymbolValue(s);

            // 3. Return sym.[[Description]].
            if (supportsInferredNames) {
                var name = getInferredName(sym);
                if (name !== "") {
                    return name.slice(1, -1); // name.slice('['.length, -']'.length);
                }
            }

            if (emptySymbolLookup[sym] !== undefined) {
                return emptySymbolLookup[sym];
            }

            var string = sym.toString();
            var randomStartIndex = string.lastIndexOf("0.");
            string = string.slice(10, randomStartIndex);

            if (string === "") {
                return undefined;
            }
            return string;
        };

        var Symbol = function Symbol() {
            var description = arguments[0];
            if (this instanceof Symbol) {
                throw new TypeError('Symbol is not a constructor');
            }

            var uid = prefix.concat(description || '', random, ++id);

            if (description !== undefined && (description === null || isNaN(description) || String(description) === "")) {
                emptySymbolLookup[uid] = String(description);
            }

            var that = setAndGetSymbol(uid);

            if (!supportsGetters) {
                Object.defineProperty(that, "description", {
                    configurable: true,
                    enumerable: false,
                    value: symbolDescription(that)
                });
            }

            return that;
        };

        var source = objectCreate(null);
        var sourceConstructor = {value: Symbol};
        var sourceMap = function (uid) {
            return source[uid];
        };
        var $defineProperty = function defineProperty(o, key, descriptor) {
            var uid = '' + key;
            if (onlySymbols(uid)) {
                setDescriptor(o, uid, descriptor.enumerable ?
                    copyAsNonEnumerable(descriptor) : descriptor);
                addInternalIfNeeded(o, uid, !!descriptor.enumerable);
            } else {
                objectDefineProperty(o, key, descriptor);
            }
            return o;
        };

        var onlyInternalSymbols = function (obj) {
            return function (name) {
                return hOP.call(obj, internalSymbol) && hOP.call(obj[internalSymbol], '@@' + name);
            };
        };
        var $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
                return gOPN(o).filter(o === ObjectProto ? onlyInternalSymbols(o) : onlySymbols).map(sourceMap);
            }
        ;

        descriptor.value = $defineProperty;
        objectDefineProperty(Object, DP, descriptor);

        descriptor.value = $getOwnPropertySymbols;
        objectDefineProperty(Object, GOPS, descriptor);

        descriptor.value = function getOwnPropertyNames(o) {
            return gOPN(o).filter(onlyNonSymbols);
        };
        objectDefineProperty(Object, GOPN, descriptor);

        descriptor.value = function defineProperties(o, descriptors) {
            var symbols = $getOwnPropertySymbols(descriptors);
            if (symbols.length) {
                objectKeys(descriptors).concat(symbols).forEach(function (uid) {
                    if (propertyIsEnumerable.call(descriptors, uid)) {
                        $defineProperty(o, uid, descriptors[uid]);
                    }
                });
            } else {
                $defineProperties(o, descriptors);
            }
            return o;
        };
        objectDefineProperty(Object, DPies, descriptor);

        descriptor.value = propertyIsEnumerable;
        objectDefineProperty(ObjectProto, PIE, descriptor);

        descriptor.value = Symbol;
        objectDefineProperty(global, 'Symbol', descriptor);

        // defining `Symbol.for(key)`
        descriptor.value = function (key) {
            var uid = prefix.concat(prefix, key, random);
            return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
        };
        objectDefineProperty(Symbol, 'for', descriptor);

        // defining `Symbol.keyFor(symbol)`
        descriptor.value = function (symbol) {
            if (onlyNonSymbols(symbol))
                throw new TypeError(symbol + ' is not a symbol');
            return hOP.call(source, symbol) ?
                symbol.slice(prefixLength * 2, -random.length) :
                void 0
                ;
        };
        objectDefineProperty(Symbol, 'keyFor', descriptor);

        descriptor.value = function getOwnPropertyDescriptor(o, key) {
            var descriptor = gOPD(o, key);
            if (descriptor && onlySymbols(key)) {
                descriptor.enumerable = propertyIsEnumerable.call(o, key);
            }
            return descriptor;
        };
        objectDefineProperty(Object, GOPD, descriptor);

        descriptor.value = function create(proto, descriptors) {
            return arguments.length === 1 || typeof descriptors === "undefined" ?
                objectCreate(proto) :
                createWithSymbols(proto, descriptors);
        };

        objectDefineProperty(Object, 'create', descriptor);

        var strictModeSupported = (function(){ 'use strict'; return this; }).call(null) === null;
        if (strictModeSupported) {
            descriptor.value = function () {
                var str = toString.call(this);
                return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
            };
        } else {
            descriptor.value = function () {
                // https://github.com/Financial-Times/polyfill-library/issues/164#issuecomment-486965300
                // Polyfill.io this code is here for the situation where a browser does not
                // support strict mode and is executing `Object.prototype.toString.call(null)`.
                // This code ensures that we return the correct result in that situation however,
                // this code also introduces a bug where it will return the incorrect result for
                // `Object.prototype.toString.call(window)`. We can't have the correct result for
                // both `window` and `null`, so we have opted for `null` as we believe this is the more
                // common situation.
                if (this === window) {
                    return '[object Null]';
                }

                var str = toString.call(this);
                return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
            };
        }
        objectDefineProperty(ObjectProto, 'toString', descriptor);

        setDescriptor = function (o, key, descriptor) {
            var protoDescriptor = gOPD(ObjectProto, key);
            delete ObjectProto[key];
            objectDefineProperty(o, key, descriptor);
            if (o !== ObjectProto) {
                objectDefineProperty(ObjectProto, key, protoDescriptor);
            }
        };

        // The abstract operation thisSymbolValue(value) performs the following steps:
        function thisSymbolValue(value) {
            // 1. If Type(value) is Symbol, return value.
            if (Type(value) === "symbol") {
                return value;
            }
            // 2. If Type(value) is Object and value has a [[SymbolData]] internal slot, then
            // a. Let s be value.[[SymbolData]].
            // b. Assert: Type(s) is Symbol.
            // c. Return s.
            // 3. Throw a TypeError exception.
            throw TypeError(value + " is not a symbol");
        }

        // Symbol.prototype.description
        if (function () {
            // supports getters
            try {
                var a = {};
                Object.defineProperty(a, "t", {
                    configurable: true,
                    enumerable: false,
                    get: function() {
                        return true;
                    },
                    set: undefined
                });
                return !!a.t;
            } catch (e) {
                return false;
            }
        }()) {
            var getInferredName;
            try {
                // eslint-disable-next-line no-new-func
                getInferredName = Function("s", "var v = s.valueOf(); return { [v]() {} }[v].name;");
                // eslint-disable-next-line no-empty
            } catch (e) { }

            var inferred = function () { };
            var supportsInferredNames = getInferredName && inferred.name === "inferred" ? getInferredName : null;


            // 19.4.3.2 get Symbol.prototype.description
            Object.defineProperty(global.Symbol.prototype, "description", {
                configurable: true,
                enumerable: false,
                get: function () {
                    // 1. Let s be the this value.
                    var s = this;
                    return symbolDescription(s);
                }
            });
        }

    }(Object, 'getOwnPropertySymbols', self));

// Symbol.iterator
    Object.defineProperty(self.Symbol, 'iterator', { value: self.Symbol('iterator') });

// _ESAbstract.GetIterator
    /* global GetMethod, Symbol, Call, Type, GetV */
// 7.4.1. GetIterator ( obj [ , method ] )
// The abstract operation GetIterator with argument obj and optional argument method performs the following steps:
    function GetIterator(obj /*, method */) { // eslint-disable-line no-unused-vars
        // 1. If method is not present, then
        // a. Set method to ? GetMethod(obj, @@iterator).
        var method = arguments.length > 1 ? arguments[1] : GetMethod(obj, Symbol.iterator);
        // 2. Let iterator be ? Call(method, obj).
        var iterator = Call(method, obj);
        // 3. If Type(iterator) is not Object, throw a TypeError exception.
        if (Type(iterator) !== 'object') {
            throw new TypeError('bad iterator');
        }
        // 4. Let nextMethod be ? GetV(iterator, "next").
        var nextMethod = GetV(iterator, "next");
        // 5. Let iteratorRecord be Record {[[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false}.
        var iteratorRecord = Object.create(null);
        iteratorRecord['[[Iterator]]'] = iterator;
        iteratorRecord['[[NextMethod]]'] = nextMethod;
        iteratorRecord['[[Done]]'] = false;
        // 6. Return iteratorRecord.
        return iteratorRecord;
    }

// Symbol.species
    /* global Symbol */
    Object.defineProperty(Symbol, 'species', { value: Symbol('species') });

// Map
    /* global CreateIterResultObject, CreateMethodProperty, GetIterator, IsCallable, IteratorClose, IteratorStep, IteratorValue, OrdinaryCreateFromConstructor, SameValueZero, Type, Symbol */
    (function (global) {
        var supportsGetters = (function () {
            try {
                var a = {};
                Object.defineProperty(a, 't', {
                    configurable: true,
                    enumerable: false,
                    get: function () {
                        return true;
                    },
                    set: undefined
                });
                return !!a.t;
            } catch (e) {
                return false;
            }
        }());

        // Need an internal counter to assign unique IDs to a key map
        var _uniqueHashId = 0;
        // Create a unique key name for storing meta data on functions and objects to enable lookups in hash table
        var _metaKey = Symbol('meta_' + ((Math.random() * 100000000) + '').replace('.', ''));

        /**
         * hashKey()
         * Function that given a key of `any` type, returns a string key value to enable hash map optimization for accessing Map data structure
         * @param {string|integer|function|object} recordKey - Record key to normalize to string accessor for hash map
         * @returns {string|false} - Returns a hashed string value or false if non extensible object key
         */
        var hashKey = function(recordKey) {
            // Check to see if we are dealing with object or function type.
            if (typeof recordKey === 'object' ? recordKey !== null : typeof recordKey === 'function') {
                // Check to see if we are dealing with a non extensible object
                if (!Object.isExtensible(recordKey)) {
                    // Return `false`
                    return false;
                }
                if (!Object.prototype.hasOwnProperty.call(recordKey, _metaKey)) {
                    var uniqueHashKey = typeof(recordKey)+'-'+(++_uniqueHashId);
                    Object.defineProperty(recordKey, _metaKey, {
                        configurable: false,
                        enumerable: false,
                        writable: false,
                        value: uniqueHashKey
                    });
                }
                // Return previously defined hashed key
                return recordKey[_metaKey];
            }
            // If this is just a primitive, we can cast it to a string and return it
            return ''+recordKey;
        };

        /**
         * getRecordIndex()
         * Function that given a Map and a key of `any` type, returns an index number that coorelates with a record found in `this._keys[index]` and `this._values[index]`
         * @param {Map} map - Map structure
         * @param {string|number|function|object} recordKey - Record key to normalize to string accessor for hash map
         * @returns {number|false} - Returns either a index to access map._keys and map._values, or false if not found
         */
        var getRecordIndex = function(map, recordKey) {
            var hashedKey = hashKey(recordKey); // Casts key to unique string (unless already string or number)
            if (hashedKey === false) {
                // We have to iterate through our Map structure because `recordKey` is non-primitive and not extensible
                return getRecordIndexSlow(map, recordKey);
            }
            var recordIndex = map._table[hashedKey]; // O(1) access to record
            return recordIndex !== undefined ? recordIndex : false;
        };

        /**
         * getRecordIndexSlow()
         * Alternative (and slower) function to `getRecordIndex()`.  Necessary for looking up non-extensible object keys.
         * @param {Map} map - Map structure
         * @param {string|number|function|object} recordKey - Record key to normalize to string accessor for hash map
         * @returns {number|false} - Returns either a index to access map._keys and map._values, or false if not found
         */
        var getRecordIndexSlow = function(map, recordKey) {
            // We have to iterate through our Map structure because `recordKey` is non-primitive and not extensible
            for (var i = 0; i < map._keys.length; i++) {
                var _recordKey = map._keys[i];
                if (_recordKey !== undefMarker && SameValueZero(_recordKey, recordKey)) {
                    return i;
                }
            }
            return false;
        };

        /**
         * setHashIndex()
         * Function that given a map, key of `any` type, and a value, creates a new entry in Map hash table
         * @param {Map} map
         * @param {string|number|function|object} recordKey - Key to translate into normalized key for hash map
         * @param {number|bool} recordIndex - new record index for the hashedKey or `false` to delete the record index for the hashedKey
         * @returns {bool} - indicates success of operation
         */
        var setHashIndex = function(map, recordKey, recordIndex) {
            var hashedKey = hashKey(recordKey);
            if (hashedKey === false) {
                // If hashed key is false, the recordKey is an object which is not extensible.
                // That indicates we cannot use the hash map for it, so this operation becomes no-op.
                return false;
            }
            if (recordIndex === false) {
                delete map._table[hashedKey];
            } else {
                map._table[hashedKey] = recordIndex;
            }
            return true;
        };

        // Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
        var undefMarker = Symbol('undef');
        // 23.1.1.1 Map ( [ iterable ] )
        var Map = function Map(/* iterable */) {
            // 1. If NewTarget is undefined, throw a TypeError exception.
            if (!(this instanceof Map)) {
                throw new TypeError('Constructor Map requires "new"');
            }
            // 2. Let map be ? OrdinaryCreateFromConstructor(NewTarget, "%MapPrototype%", « [[MapData]] »).
            var map = OrdinaryCreateFromConstructor(this, Map.prototype, {
                _table: {}, // O(1) access table for retrieving records
                _keys: [],
                _values: [],
                _size: 0,
                _es6Map: true
            });

            // 3. Set map.[[MapData]] to a new empty List.
            // Polyfill.io - This step was done as part of step two.

            // Some old engines do not support ES5 getters/setters.  Since Map only requires these for the size property, we can fall back to setting the size property statically each time the size of the map changes.
            if (!supportsGetters) {
                Object.defineProperty(map, 'size', {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: 0
                });
            }

            // 4. If iterable is not present, let iterable be undefined.
            var iterable = arguments.length > 0 ? arguments[0] : undefined;

            // 5. If iterable is either undefined or null, return map.
            if (iterable === null || iterable === undefined) {
                return map;
            }

            // 6. Let adder be ? Get(map, "set").
            var adder = map.set;

            // 7. If IsCallable(adder) is false, throw a TypeError exception.
            if (!IsCallable(adder)) {
                throw new TypeError("Map.prototype.set is not a function");
            }

            // 8. Let iteratorRecord be ? GetIterator(iterable).
            try {
                var iteratorRecord = GetIterator(iterable);
                // 9. Repeat,
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    // a. Let next be ? IteratorStep(iteratorRecord).
                    var next = IteratorStep(iteratorRecord);
                    // b. If next is false, return map.
                    if (next === false) {
                        return map;
                    }
                    // c. Let nextItem be ? IteratorValue(next).
                    var nextItem = IteratorValue(next);
                    // d. If Type(nextItem) is not Object, then
                    if (Type(nextItem) !== 'object') {
                        // i. Let error be Completion{[[Type]]: throw, [[Value]]: a newly created TypeError object, [[Target]]: empty}.
                        try {
                            throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
                        } catch (error) {
                            // ii. Return ? IteratorClose(iteratorRecord, error).
                            return IteratorClose(iteratorRecord, error);
                        }
                    }
                    try {
                        // Polyfill.io - The try catch accounts for steps: f, h, and j.

                        // e. Let k be Get(nextItem, "0").
                        var k = nextItem[0];
                        // f. If k is an abrupt completion, return ? IteratorClose(iteratorRecord, k).
                        // g. Let v be Get(nextItem, "1").
                        var v = nextItem[1];
                        // h. If v is an abrupt completion, return ? IteratorClose(iteratorRecord, v).
                        // i. Let status be Call(adder, map, « k.[[Value]], v.[[Value]] »).
                        adder.call(map, k, v);
                    } catch (e) {
                        // j. If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
                        return IteratorClose(iteratorRecord, e);
                    }
                }
            } catch (e) {
                // Polyfill.io - For user agents which do not have iteration methods on argument objects or arrays, we can special case those.
                if (Array.isArray(iterable) ||
                    Object.prototype.toString.call(iterable) === '[object Arguments]' ||
                    // IE 7 & IE 8 return '[object Object]' for the arguments object, we can detect by checking for the existence of the callee property
                    (!!iterable.callee)) {
                    var index;
                    var length = iterable.length;
                    for (index = 0; index < length; index++) {
                        adder.call(map, iterable[index][0], iterable[index][1]);
                    }
                }
            }
            return map;
        };

        // 23.1.2.1. Map.prototype
        // The initial value of Map.prototype is the intrinsic object %MapPrototype%.
        // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
        Object.defineProperty(Map, 'prototype', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {}
        });

        // 23.1.2.2 get Map [ @@species ]
        if (supportsGetters) {
            Object.defineProperty(Map, Symbol.species, {
                configurable: true,
                enumerable: false,
                get: function () {
                    // 1. Return the this value.
                    return this;
                },
                set: undefined
            });
        } else {
            CreateMethodProperty(Map, Symbol.species, Map);
        }

        // 23.1.3.1 Map.prototype.clear ( )
        CreateMethodProperty(Map.prototype, 'clear', function clear() {
                // 1. Let M be the this value.
                var M = this;
                // 2. If Type(M) is not Object, throw a TypeError exception.
                if (Type(M) !== 'object') {
                    throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
                if (M._es6Map !== true) {
                    throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 4. Let entries be the List that is M.[[MapData]].
                var entries = M._keys;
                // 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
                for (var i = 0; i < entries.length; i++) {
                    // 5.a. Set p.[[Key]] to empty.
                    M._keys[i] = undefMarker;
                    // 5.b. Set p.[[Value]] to empty.
                    M._values[i] = undefMarker;
                }
                this._size = 0;
                if (!supportsGetters) {
                    this.size = this._size;
                }
                // 5a. Clear lookup table
                this._table = {};
                // 6. Return undefined.
                return undefined;
            }
        );

        // 23.1.3.2. Map.prototype.constructor
        CreateMethodProperty(Map.prototype, 'constructor', Map);

        // 23.1.3.3. Map.prototype.delete ( key )
        CreateMethodProperty(Map.prototype, 'delete', function (key) {
                // 1. Let M be the this value.
                var M = this;
                // 2. If Type(M) is not Object, throw a TypeError exception.
                if (Type(M) !== 'object') {
                    throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
                if (M._es6Map !== true) {
                    throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 4. Let entries be the List that is M.[[MapData]].
                // 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
                // 5a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, then
                // i. Set p.[[Key]] to empty.
                // ii. Set p.[[Value]] to empty.
                // ii-a. Remove key from lookup table
                // iii. Return true.
                // 6. Return false.

                // Implement steps 4-6 with a more optimal algo

                // Steps 4-5: Access record
                var recordIndex = getRecordIndex(M, key); // O(1) access to record index

                if (recordIndex !== false) {
                    // Get record's `key` (could be `any` type);
                    var recordKey = M._keys[recordIndex];
                    // 5a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, then
                    if (recordKey !== undefMarker && SameValueZero(recordKey, key)) {
                        // i. Set p.[[Key]] to empty.
                        this._keys[recordIndex] = undefMarker;
                        // ii. Set p.[[Value]] to empty.
                        this._values[recordIndex] = undefMarker;
                        this._size = --this._size;
                        if (!supportsGetters) {
                            this.size = this._size;
                        }
                        // iia. Remove key from lookup table
                        setHashIndex(this, key, false);
                        // iii. Return true.
                        return true;
                    }
                }

                // 6. Return false.
                return false;
            }
        );

        // 23.1.3.4. Map.prototype.entries ( )
        CreateMethodProperty(Map.prototype, 'entries', function entries () {
                // 1. Let M be the this value.
                var M = this;
                // 2. Return ? CreateMapIterator(M, "key+value").
                return CreateMapIterator(M, 'key+value');
            }
        );

        // 23.1.3.5. Map.prototype.forEach ( callbackfn [ , thisArg ] )
        CreateMethodProperty(Map.prototype, 'forEach', function (callbackFn) {
                // 1. Let M be the this value.
                var M = this;
                // 2. If Type(M) is not Object, throw a TypeError exception.
                if (Type(M) !== 'object') {
                    throw new TypeError('Method Map.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
                if (M._es6Map !== true) {
                    throw new TypeError('Method Map.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(M));
                }
                // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
                if (!IsCallable(callbackFn)) {
                    throw new TypeError(Object.prototype.toString.call(callbackFn) + ' is not a function.');
                }
                // 5. If thisArg is present, let T be thisArg; else let T be undefined.
                if (arguments[1]) {
                    var T = arguments[1];
                }
                // 6. Let entries be the List that is M.[[MapData]].
                var entries = M._keys;
                // 7. For each Record {[[Key]], [[Value]]} e that is an element of entries, in original key insertion order, do
                for (var i = 0; i < entries.length; i++) {
                    // a. If e.[[Key]] is not empty, then
                    if (M._keys[i] !== undefMarker && M._values[i] !== undefMarker ) {
                        // i. Perform ? Call(callbackfn, T, « e.[[Value]], e.[[Key]], M »).
                        callbackFn.call(T, M._values[i], M._keys[i], M);
                    }
                }
                // 8. Return undefined.
                return undefined;
            }
        );

        // 23.1.3.6. Map.prototype.get ( key )
        CreateMethodProperty(Map.prototype, 'get', function get(key) {
            // 1. Let M be the this value.
            var M = this;
            // 2. If Type(M) is not Object, throw a TypeError exception.
            if (Type(M) !== 'object') {
                throw new TypeError('Method Map.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
            }
            // 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
            if (M._es6Map !== true) {
                throw new TypeError('Method Map.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
            }
            // 4. Let entries be the List that is M.[[MapData]].
            // 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
            // a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, return p.[[Value]].
            // 6. Return undefined.

            // Implement steps 4-6 with a more optimal algo
            var recordIndex = getRecordIndex(M, key); // O(1) access to record index
            if (recordIndex !== false) {
                var recordKey = M._keys[recordIndex];
                if (recordKey !== undefMarker && SameValueZero(recordKey, key)) {
                    return M._values[recordIndex];
                }
            }

            return undefined;
        });

        // 23.1.3.7. Map.prototype.has ( key )
        CreateMethodProperty(Map.prototype, 'has', function has (key) {
            // 1. Let M be the this value.
            var M = this;
            // 2. If Type(M) is not Object, throw a TypeError exception.
            if (typeof M !== 'object') {
                throw new TypeError('Method Map.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
            }
            // 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
            if (M._es6Map !== true) {
                throw new TypeError('Method Map.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
            }
            // 4. Let entries be the List that is M.[[MapData]].
            // 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
            // a. If p.[[Key]] is not empty and SameValueZero(p.[[Key]], key) is true, return true.
            // 6. Return false.

            // Implement steps 4-6 with a more optimal algo
            var recordIndex = getRecordIndex(M, key); // O(1) access to record index
            if (recordIndex !== false) {
                var recordKey = M._keys[recordIndex];
                if (recordKey !== undefMarker && SameValueZero(recordKey, key)) {
                    return true;
                }
            }

            return false;
        });

        // 23.1.3.8. Map.prototype.keys ( )
        CreateMethodProperty(Map.prototype, 'keys', function keys () {
            // 1. Let M be the this value.
            var M = this;
            // 2. Return ? CreateMapIterator(M, "key").
            return CreateMapIterator(M, "key");
        });

        // 23.1.3.9. Map.prototype.set ( key, value )
        CreateMethodProperty(Map.prototype, 'set', function set(key, value) {
            // 1. Let M be the this value.
            var M = this;
            // 2. If Type(M) is not Object, throw a TypeError exception.
            if (Type(M) !== 'object') {
                throw new TypeError('Method Map.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
            }
            // 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
            if (M._es6Map !== true) {
                throw new TypeError('Method Map.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
            }
            // 4. Let entries be the List that is M.[[MapData]].
            // 5. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
            // 6. If key is -0, let key be +0.
            // 7. Let p be the Record {[[Key]]: key, [[Value]]: value}.
            // 8. Append p as the last element of entries.
            // 9. Return M.

            // Strictly following the above steps 4-9 will lead to an inefficient algorithm.
            // Step 8 also doesn't seem to be required if an entry already exists
            var recordIndex = getRecordIndex(M, key); // O(1) access to record index
            if (recordIndex !== false) {
                // update path
                M._values[recordIndex] = value;
            } else {
                // eslint-disable-next-line no-compare-neg-zero
                if (key === -0) {
                    key = 0;
                }
                var p = {
                    '[[Key]]': key,
                    '[[Value]]': value
                };
                M._keys.push(p['[[Key]]']);
                M._values.push(p['[[Value]]']);
                setHashIndex(M, key, M._keys.length - 1); // update lookup table
                ++M._size;
                if (!supportsGetters) {
                    M.size = M._size;
                }
            }
            return M;
        });

        // 23.1.3.10. get Map.prototype.size
        if (supportsGetters) {
            Object.defineProperty(Map.prototype, 'size', {
                configurable: true,
                enumerable: false,
                get: function () {
                    // 1. Let M be the this value.
                    var M = this;
                    // 2. If Type(M) is not Object, throw a TypeError exception.
                    if (Type(M) !== 'object') {
                        throw new TypeError('Method Map.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(M));
                    }
                    // 3. If M does not have a [[MapData]] internal slot, throw a TypeError exception.
                    if (M._es6Map !== true) {
                        throw new TypeError('Method Map.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(M));
                    }
                    // 4. Let entries be the List that is M.[[MapData]].
                    // 5. Let count be 0.
                    // 6. For each Record {[[Key]], [[Value]]} p that is an element of entries, do
                    // 6a. If p.[[Key]] is not empty, set count to count+1.
                    // 7. Return count.

                    // Implement 4-7 more efficently by returning pre-computed property
                    return this._size;
                },
                set: undefined
            });
        }

        // 23.1.3.11. Map.prototype.values ( )
        CreateMethodProperty(Map.prototype, 'values', function values () {
                // 1. Let M be the this value.
                var M = this;
                // 2. Return ? CreateMapIterator(M, "value").
                return CreateMapIterator(M, 'value');
            }
        );

        // 23.1.3.12. Map.prototype [ @@iterator ] ( )
        // The initial value of the @@iterator property is the same function object as the initial value of the entries property.
        CreateMethodProperty(Map.prototype, Symbol.iterator, Map.prototype.entries);

        // 23.1.3.13. Map.prototype [ @@toStringTag ]
        // The initial value of the @@toStringTag property is the String value "Map".
        // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

        // Polyfill.io - Safari 8 implements Map.name but as a non-configurable property, which means it would throw an error if we try and configure it here.
        if (!('name' in Map)) {
            // 19.2.4.2 name
            Object.defineProperty(Map, 'name', {
                configurable: true,
                enumerable: false,
                writable: false,
                value: 'Map'
            });
        }

        // 23.1.5.1. CreateMapIterator ( map, kind )
        function CreateMapIterator(map, kind) {
            // 1. If Type(map) is not Object, throw a TypeError exception.
            if (Type(map) !== 'object') {
                throw new TypeError('createMapIterator called on incompatible receiver ' + Object.prototype.toString.call(map));
            }
            // 2. If map does not have a [[MapData]] internal slot, throw a TypeError exception.
            if (map._es6Map !== true) {
                throw new TypeError('createMapIterator called on incompatible receiver ' + Object.prototype.toString.call(map));
            }
            // 3. Let iterator be ObjectCreate(%MapIteratorPrototype%, « [[Map]], [[MapNextIndex]], [[MapIterationKind]] »).
            var iterator = Object.create(MapIteratorPrototype);
            // 4. Set iterator.[[Map]] to map.
            Object.defineProperty(iterator, '[[Map]]', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: map
            });
            // 5. Set iterator.[[MapNextIndex]] to 0.
            Object.defineProperty(iterator, '[[MapNextIndex]]', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: 0
            });
            // 6. Set iterator.[[MapIterationKind]] to kind.
            Object.defineProperty(iterator, '[[MapIterationKind]]', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: kind
            });
            // 7. Return iterator.
            return iterator;
        }

        // 23.1.5.2. The %MapIteratorPrototype% Object
        var MapIteratorPrototype = {};
        // Polyfill.io - We use this as a quick way to check if an object is a Map Iterator instance.
        Object.defineProperty(MapIteratorPrototype, 'isMapIterator', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: true
        });

        // 23.1.5.2.1. %MapIteratorPrototype%.next ( )
        CreateMethodProperty(MapIteratorPrototype, 'next', function next() {
                // 1. Let O be the this value.
                var O = this;
                // 2. If Type(O) is not Object, throw a TypeError exception.
                if (Type(O) !== 'object') {
                    throw new TypeError('Method %MapIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
                }
                // 3. If O does not have all of the internal slots of a Map Iterator Instance (23.1.5.3), throw a TypeError exception.
                if (!O.isMapIterator) {
                    throw new TypeError('Method %MapIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
                }
                // 4. Let m be O.[[Map]].
                var m = O['[[Map]]'];
                // 5. Let index be O.[[MapNextIndex]].
                var index = O['[[MapNextIndex]]'];
                // 6. Let itemKind be O.[[MapIterationKind]].
                var itemKind = O['[[MapIterationKind]]'];
                // 7. If m is undefined, return CreateIterResultObject(undefined, true).
                if (m === undefined) {
                    return CreateIterResultObject(undefined, true);
                }
                // 8. Assert: m has a [[MapData]] internal slot.
                if (!m._es6Map) {
                    throw new Error(Object.prototype.toString.call(m) + ' has a [[MapData]] internal slot.');
                }
                // 9. Let entries be the List that is m.[[MapData]].
                var entries = m._keys;
                // 10. Let numEntries be the number of elements of entries.
                var numEntries = entries.length;
                // 11. NOTE: numEntries must be redetermined each time this method is evaluated.
                // 12. Repeat, while index is less than numEntries,
                while (index < numEntries) {
                    // a. Let e be the Record {[[Key]], [[Value]]} that is the value of entries[index].
                    var e = Object.create(null);
                    e['[[Key]]'] = m._keys[index];
                    e['[[Value]]'] = m._values[index];
                    // b. Set index to index+1.
                    index = index + 1;
                    // c. Set O.[[MapNextIndex]] to index.
                    O['[[MapNextIndex]]'] = index;
                    // d. If e.[[Key]] is not empty, then
                    if (e['[[Key]]'] !== undefMarker) {
                        // i. If itemKind is "key", let result be e.[[Key]].
                        if (itemKind === 'key') {
                            var result = e['[[Key]]'];
                            // ii. Else if itemKind is "value", let result be e.[[Value]].
                        } else if (itemKind === 'value') {
                            result = e['[[Value]]'];
                            // iii. Else,
                        } else {
                            // 1. Assert: itemKind is "key+value".
                            if (itemKind !== 'key+value') {
                                throw new Error();
                            }
                            // 2. Let result be CreateArrayFromList(« e.[[Key]], e.[[Value]] »).
                            result = [
                                e['[[Key]]'],
                                e['[[Value]]']
                            ];
                        }
                        // iv. Return CreateIterResultObject(result, false).
                        return CreateIterResultObject(result, false);
                    }
                }
                // 13. Set O.[[Map]] to undefined.
                O['[[Map]]'] = undefined;
                // 14. Return CreateIterResultObject(undefined, true).
                return CreateIterResultObject(undefined, true);
            }
        );

        // 23.1.5.2.2 %MapIteratorPrototype% [ @@toStringTag ]
        // The initial value of the @@toStringTag property is the String value "Map Iterator".
        // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

        CreateMethodProperty(MapIteratorPrototype, Symbol.iterator, function iterator() {
                return this;
            }
        );

        // Export the object
        try {
            CreateMethodProperty(global, 'Map', Map);
        } catch (e) {
            // IE8 throws an error here if we set enumerable to false.
            // More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
            global.Map = Map;
        }
    }(self));

// Set
    /* global CreateIterResultObject, CreateMethodProperty, GetIterator, IsCallable, IteratorClose, IteratorStep, IteratorValue, OrdinaryCreateFromConstructor, SameValueZero, Symbol */
    (function (global) {
        var supportsGetters = (function () {
            try {
                var a = {};
                Object.defineProperty(a, 't', {
                    configurable: true,
                    enumerable: false,
                    get: function () {
                        return true;
                    },
                    set: undefined
                });
                return !!a.t;
            } catch (e) {
                return false;
            }
        }());

        // Deleted set items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
        var undefMarker = Symbol('undef');
        // 23.2.1.1. Set ( [ iterable ] )
        var Set = function Set(/* iterable */) {
            // 1. If NewTarget is undefined, throw a TypeError exception.
            if (!(this instanceof Set)) {
                throw new TypeError('Constructor Set requires "new"');
            }
            // 2. Let set be ? OrdinaryCreateFromConstructor(NewTarget, "%SetPrototype%", « [[SetData]] »).
            var set = OrdinaryCreateFromConstructor(this, Set.prototype, {
                _values: [],
                _size: 0,
                _es6Set: true
            });

            // 3. Set set.[[SetData]] to a new empty List.
            // Polyfill.io - This step was done as part of step two.

            // Some old engines do not support ES5 getters/setters.  Since Set only requires these for the size property, we can fall back to setting the size property statically each time the size of the set changes.
            if (!supportsGetters) {
                Object.defineProperty(set, 'size', {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: 0
                });
            }

            // 4. If iterable is not present, let iterable be undefined.
            var iterable = arguments.length > 0 ? arguments[0] : undefined;

            // 5. If iterable is either undefined or null, return set.
            if (iterable === null || iterable === undefined) {
                return set;
            }

            // 6. Let adder be ? Get(set, "add").
            var adder = set.add;
            // 7. If IsCallable(adder) is false, throw a TypeError exception.
            if (!IsCallable(adder)) {
                throw new TypeError("Set.prototype.add is not a function");
            }

            try {
                // 8. Let iteratorRecord be ? GetIterator(iterable).
                var iteratorRecord = GetIterator(iterable);
                // 9. Repeat,
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    // a. Let next be ? IteratorStep(iteratorRecord).
                    var next = IteratorStep(iteratorRecord);
                    // b. If next is false, return set.
                    if (next === false) {
                        return set;
                    }
                    // c. Let nextValue be ? IteratorValue(next).
                    var nextValue = IteratorValue(next);
                    // d. Let status be Call(adder, set, « nextValue.[[Value]] »).
                    try {
                        adder.call(set, nextValue);
                    } catch (e) {
                        // e. If status is an abrupt completion, return ? IteratorClose(iteratorRecord, status).
                        return IteratorClose(iteratorRecord, e);
                    }
                }
            } catch (e) {
                // Polyfill.io - For user agents which do not have iteration methods on argument objects or arrays, we can special case those.
                if (Array.isArray(iterable) ||
                    Object.prototype.toString.call(iterable) === '[object Arguments]' ||
                    // IE 7 & IE 8 return '[object Object]' for the arguments object, we can detect by checking for the existence of the callee property
                    (!!iterable.callee)) {
                    var index;
                    var length = iterable.length;
                    for (index = 0; index < length; index++) {
                        adder.call(set, iterable[index]);
                    }
                } else {
                    throw (e);
                }
            }
            return set;
        };

        // 23.2.2.1. Set.prototype
        // The initial value of Set.prototype is the intrinsic %SetPrototype% object.
        // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.
        Object.defineProperty(Set, 'prototype', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {}
        });

        // 23.2.2.2 get Set [ @@species ]
        if (supportsGetters) {
            Object.defineProperty(Set, Symbol.species, {
                configurable: true,
                enumerable: false,
                get: function () {
                    // 1. Return the this value.
                    return this;
                },
                set: undefined
            });
        } else {
            CreateMethodProperty(Set, Symbol.species, Set);
        }

        // 23.2.3.1. Set.prototype.add ( value )
        CreateMethodProperty(Set.prototype, 'add', function add(value) {
            // 1. Let S be the this value.
            var S = this;
            // 2. If Type(S) is not Object, throw a TypeError exception.
            if (typeof S !== 'object') {
                throw new TypeError('Method Set.prototype.add called on incompatible receiver ' + Object.prototype.toString.call(S));
            }
            // 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
            if (S._es6Set !== true) {
                throw new TypeError('Method Set.prototype.add called on incompatible receiver ' + Object.prototype.toString.call(S));
            }
            // 4. Let entries be the List that is S.[[SetData]].
            var entries = S._values;
            // 5. For each e that is an element of entries, do
            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                // a. If e is not empty and SameValueZero(e, value) is true, then
                if (e !== undefMarker && SameValueZero(e, value)) {
                    // i. Return S.
                    return S;
                }
            }
            // 6. If value is -0, let value be +0.
            if (value === 0 && 1/value === -Infinity) {
                value = 0;
            }
            // 7. Append value as the last element of entries.
            S._values.push(value);

            this._size = ++this._size;
            if (!supportsGetters) {
                this.size = this._size;
            }
            // 8. Return S.
            return S;
        });

        // 23.2.3.2. Set.prototype.clear ( )
        CreateMethodProperty(Set.prototype, 'clear', function clear() {
            // 1. Let S be the this value.
            var S = this;
            // 2. If Type(S) is not Object, throw a TypeError exception.
            if (typeof S !== 'object') {
                throw new TypeError('Method Set.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(S));
            }
            // 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
            if (S._es6Set !== true) {
                throw new TypeError('Method Set.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(S));
            }
            // 4. Let entries be the List that is S.[[SetData]].
            var entries = S._values;
            // 5. For each e that is an element of entries, do
            for (var i = 0; i < entries.length; i++) {
                // a. Replace the element of entries whose value is e with an element whose value is empty.
                entries[i] = undefMarker;
            }
            this._size = 0;
            if (!supportsGetters) {
                this.size = this._size;
            }
            // 6. Return undefined.
            return undefined;
        });

        // 23.2.3.3. Set.prototype.constructor
        CreateMethodProperty(Set.prototype, 'constructor', Set);

        // 23.2.3.4. Set.prototype.delete ( value )
        CreateMethodProperty(Set.prototype, 'delete', function (value) {
                // 1. Let S be the this value.
                var S = this;
                // 2. If Type(S) is not Object, throw a TypeError exception.
                if (typeof S !== 'object') {
                    throw new TypeError('Method Set.prototype.delete called on incompatible receiver ' + Object.prototype.toString.call(S));
                }
                // 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
                if (S._es6Set !== true) {
                    throw new TypeError('Method Set.prototype.delete called on incompatible receiver ' + Object.prototype.toString.call(S));
                }
                // 4. Let entries be the List that is S.[[SetData]].
                var entries = S._values;
                // 5. For each e that is an element of entries, do
                for (var i = 0; i < entries.length; i++) {
                    var e = entries[i];
                    // a. If e is not empty and SameValueZero(e, value) is true, then
                    if (e !== undefMarker && SameValueZero(e, value)) {
                        // i. Replace the element of entries whose value is e with an element whose value is empty.
                        entries[i] = undefMarker;

                        this._size = --this._size;
                        if (!supportsGetters) {
                            this.size = this._size;
                        }
                        // ii. Return true.
                        return true;
                    }
                }
                // 6. Return false.
                return false;
            }
        );

        // 23.2.3.5. Set.prototype.entries ( )
        CreateMethodProperty(Set.prototype, 'entries', function entries() {
                // 1. Let S be the this value.
                var S = this;
                // 2. Return ? CreateSetIterator(S, "key+value").
                return CreateSetIterator(S, 'key+value');
            }
        );

        // 23.2.3.6. Set.prototype.forEach ( callbackfn [ , thisArg ] )
        CreateMethodProperty(Set.prototype, 'forEach', function forEach(callbackFn /*[ , thisArg ]*/) {
                // 1. Let S be the this value.
                var S = this;
                // 2. If Type(S) is not Object, throw a TypeError exception.
                if (typeof S !== 'object') {
                    throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
                }
                // 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
                if (S._es6Set !== true) {
                    throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
                }
                // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
                if (!IsCallable(callbackFn)) {
                    throw new TypeError(Object.prototype.toString.call(callbackFn) + ' is not a function.');
                }
                // 5. If thisArg is present, let T be thisArg; else let T be undefined.
                if (arguments[1]) {
                    var T = arguments[1];
                }
                // 6. Let entries be the List that is S.[[SetData]].
                var entries = S._values;
                // 7. For each e that is an element of entries, in original insertion order, do
                for (var i = 0; i < entries.length; i++) {
                    var e = entries[i];
                    // a. If e is not empty, then
                    if (e !== undefMarker) {
                        // i. Perform ? Call(callbackfn, T, « e, e, S »).
                        callbackFn.call(T, e, e, S);
                    }
                }
                // 8. Return undefined.
                return undefined;
            }
        );

        // 23.2.3.7. Set.prototype.has ( value )
        CreateMethodProperty(Set.prototype, 'has', function has(value) {
                // 1. Let S be the this value.
                var S = this;
                // 2. If Type(S) is not Object, throw a TypeError exception.
                if (typeof S !== 'object') {
                    throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
                }
                // 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
                if (S._es6Set !== true) {
                    throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
                }
                // 4. Let entries be the List that is S.[[SetData]].
                var entries = S._values;
                // 5. For each e that is an element of entries, do
                for (var i = 0; i < entries.length; i++) {
                    var e = entries[i];
                    // a. If e is not empty and SameValueZero(e, value) is true, return true.
                    if (e !== undefMarker && SameValueZero(e, value)) {
                        return true;
                    }
                }
                // 6. Return false.
                return false;
            }
        );

        // Polyfill.io - We need to define Set.prototype.values before Set.prototype.keys because keys is a reference to values.
        // 23.2.3.10. Set.prototype.values()
        var values = function values() {
            // 1. Let S be the this value.
            var S = this;
            // 2. Return ? CreateSetIterator(S, "value").
            return CreateSetIterator(S, "value");
        };
        CreateMethodProperty(Set.prototype, 'values', values);

        // 23.2.3.8 Set.prototype.keys ( )
        // The initial value of the keys property is the same function object as the initial value of the values property.
        CreateMethodProperty(Set.prototype, 'keys', values);

        // 23.2.3.9. get Set.prototype.size
        if (supportsGetters) {
            Object.defineProperty(Set.prototype, 'size', {
                configurable: true,
                enumerable: false,
                get: function () {
                    // 1. Let S be the this value.
                    var S = this;
                    // 2. If Type(S) is not Object, throw a TypeError exception.
                    if (typeof S !== 'object') {
                        throw new TypeError('Method Set.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(S));
                    }
                    // 3. If S does not have a [[SetData]] internal slot, throw a TypeError exception.
                    if (S._es6Set !== true) {
                        throw new TypeError('Method Set.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(S));
                    }
                    // 4. Let entries be the List that is S.[[SetData]].
                    var entries = S._values;
                    // 5. Let count be 0.
                    var count = 0;
                    // 6. For each e that is an element of entries, do
                    for (var i = 0; i < entries.length; i++) {
                        var e = entries[i];
                        // a. If e is not empty, set count to count+1.
                        if (e !== undefMarker) {
                            count = count + 1;
                        }
                    }
                    // 7. Return count.
                    return count;
                },
                set: undefined
            });
        }

        // 23.2.3.11. Set.prototype [ @@iterator ] ( )
        // The initial value of the @@iterator property is the same function object as the initial value of the values property.
        CreateMethodProperty(Set.prototype, Symbol.iterator, values);

        // 23.2.3.12. Set.prototype [ @@toStringTag ]
        // The initial value of the @@toStringTag property is the String value "Set".
        // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

        // Polyfill.io - Safari 8 implements Set.name but as a non-configurable property, which means it would throw an error if we try and configure it here.
        if (!('name' in Set)) {
            // 19.2.4.2 name
            Object.defineProperty(Set, 'name', {
                configurable: true,
                enumerable: false,
                writable: false,
                value: 'Set'
            });
        }

        // 23.2.5.1. CreateSetIterator ( set, kind )
        function CreateSetIterator(set, kind) {
            // 1. If Type(set) is not Object, throw a TypeError exception.
            if (typeof set !== 'object') {
                throw new TypeError('createSetIterator called on incompatible receiver ' + Object.prototype.toString.call(set));
            }
            // 2. If set does not have a [[SetData]] internal slot, throw a TypeError exception.
            if (set._es6Set !== true) {
                throw new TypeError('createSetIterator called on incompatible receiver ' + Object.prototype.toString.call(set));
            }
            // 3. Let iterator be ObjectCreate(%SetIteratorPrototype%, « [[IteratedSet]], [[SetNextIndex]], [[SetIterationKind]] »).
            var iterator = Object.create(SetIteratorPrototype);
            // 4. Set iterator.[[IteratedSet]] to set.
            Object.defineProperty(iterator, '[[IteratedSet]]', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: set
            });
            // 5. Set iterator.[[SetNextIndex]] to 0.
            Object.defineProperty(iterator, '[[SetNextIndex]]', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: 0
            });
            // 6. Set iterator.[[SetIterationKind]] to kind.
            Object.defineProperty(iterator, '[[SetIterationKind]]', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: kind
            });
            // 7. Return iterator.
            return iterator;
        }

        // 23.2.5.2. The %SetIteratorPrototype% Object
        var SetIteratorPrototype = {};
        //Polyfill.io - We add this property to help us identify what is a set iterator.
        Object.defineProperty(SetIteratorPrototype, 'isSetIterator', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: true
        });

        // 23.2.5.2.1. %SetIteratorPrototype%.next ( )
        CreateMethodProperty(SetIteratorPrototype, 'next', function next() {
            // 1. Let O be the this value.
            var O = this;
            // 2. If Type(O) is not Object, throw a TypeError exception.
            if (typeof O !== 'object') {
                throw new TypeError('Method %SetIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
            }
            // 3. If O does not have all of the internal slots of a Set Iterator Instance (23.2.5.3), throw a TypeError exception.
            if (!O.isSetIterator) {
                throw new TypeError('Method %SetIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
            }
            // 4. Let s be O.[[IteratedSet]].
            var s = O['[[IteratedSet]]'];
            // 5. Let index be O.[[SetNextIndex]].
            var index = O['[[SetNextIndex]]'];
            // 6. Let itemKind be O.[[SetIterationKind]].
            var itemKind = O['[[SetIterationKind]]'];
            // 7. If s is undefined, return CreateIterResultObject(undefined, true).
            if (s === undefined) {
                return CreateIterResultObject(undefined, true);
            }
            // 8. Assert: s has a [[SetData]] internal slot.
            if (!s._es6Set) {
                throw new Error(Object.prototype.toString.call(s) + ' does not have [[SetData]] internal slot.');
            }
            // 9. Let entries be the List that is s.[[SetData]].
            var entries = s._values;
            // 10. Let numEntries be the number of elements of entries.
            var numEntries = entries.length;
            // 11. NOTE: numEntries must be redetermined each time this method is evaluated.
            // 12. Repeat, while index is less than numEntries,
            while (index < numEntries) {
                // a. Let e be entries[index].
                var e = entries[index];
                // b. Set index to index+1.
                index = index + 1;
                // c. Set O.[[SetNextIndex]] to index.
                O['[[SetNextIndex]]'] = index;
                // d. If e is not empty, then
                if (e !== undefMarker) {
                    // i. If itemKind is "key+value", then
                    if (itemKind === 'key+value') {
                        // 1. Return CreateIterResultObject(CreateArrayFromList(« e, e »), false).
                        return CreateIterResultObject([e, e], false);
                    }
                    // ii. Return CreateIterResultObject(e, false).
                    return CreateIterResultObject(e, false);
                }
            }
            // 13. Set O.[[IteratedSet]] to undefined.
            O['[[IteratedSet]]'] = undefined;
            // 14. Return CreateIterResultObject(undefined, true).
            return CreateIterResultObject(undefined, true);
        });

        // 23.2.5.2.2. %SetIteratorPrototype% [ @@toStringTag ]
        // The initial value of the @@toStringTag property is the String value "Set Iterator".
        // This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: true }.

        CreateMethodProperty(SetIteratorPrototype, Symbol.iterator, function iterator() {
                return this;
            }
        );

        // Export the object
        try {
            CreateMethodProperty(global, 'Set', Set);
        } catch (e) {
            // IE8 throws an error here if we set enumerable to false.
            // More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
            global.Set = Set;
        }

    }(self));

// Array.from
    /* globals
	IsCallable, GetMethod, Symbol, IsConstructor, Construct, ArrayCreate, GetIterator, IteratorClose,
	ToString, IteratorStep, IteratorValue, Call, CreateDataPropertyOrThrow, ToObject, ToLength, Get, CreateMethodProperty
*/
    (function () {
        var toString = Object.prototype.toString;
        var stringMatch = String.prototype.match;
        // A cross-realm friendly way to detect if a value is a String object or literal.
        function isString(value) {
            if (typeof value === 'string') { return true; }
            if (typeof value !== 'object') { return false; }
            return toString.call(value) === '[object String]';
        }

        // 22.1.2.1. Array.from ( items [ , mapfn [ , thisArg ] ] )
        CreateMethodProperty(Array, 'from', function from(items /* [ , mapfn [ , thisArg ] ] */) { // eslint-disable-line no-undef
            // 1. Let C be the this value.
            var C = this;
            // 2. If mapfn is undefined, let mapping be false.
            var mapfn = arguments.length > 1 ? arguments[1] : undefined;
            if (mapfn === undefined) {
                var mapping = false;
                // 3. Else,
            } else {
                // a. If IsCallable(mapfn) is false, throw a TypeError exception.
                if (IsCallable(mapfn) === false) {
                    throw new TypeError(Object.prototype.toString.call(mapfn) + ' is not a function.');
                }
                // b. If thisArg is present, let T be thisArg; else let T be undefined.
                var thisArg = arguments.length > 2 ? arguments[2] : undefined;
                if (thisArg !== undefined) {
                    var T = thisArg;
                } else {
                    T = undefined;
                }
                // c. Let mapping be true.
                mapping = true;

            }
            // 4. Let usingIterator be ? GetMethod(items, @@iterator).
            var usingIterator = GetMethod(items, Symbol.iterator);
            // 5. If usingIterator is not undefined, then
            if (usingIterator !== undefined) {
                // a. If IsConstructor(C) is true, then
                if (IsConstructor(C)) {
                    // i. Let A be ? Construct(C).
                    var A = Construct(C);
                    // b. Else,
                } else {
                    // i. Let A be ! ArrayCreate(0).
                    A = ArrayCreate(0);
                }
                // c. Let iteratorRecord be ? GetIterator(items, usingIterator).
                var iteratorRecord = GetIterator(items, usingIterator);
                // d. Let k be 0.
                var k = 0;
                // e. Repeat,
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    // i. If k ≥ 2^53-1, then
                    if (k >= (Math.pow(2, 53) - 1)) {
                        // 1. Let error be Completion{[[Type]]: throw, [[Value]]: a newly created TypeError object, [[Target]]: empty}.
                        var error = new TypeError('Iteration count can not be greater than or equal 9007199254740991.');
                        // 2. Return ? IteratorClose(iteratorRecord, error).
                        return IteratorClose(iteratorRecord, error);
                    }
                    // ii. Let Pk be ! ToString(k).
                    var Pk = ToString(k);
                    // iii. Let next be ? IteratorStep(iteratorRecord).
                    var next = IteratorStep(iteratorRecord);
                    // iv. If next is false, then
                    if (next === false) {
                        // 1. Perform ? Set(A, "length", k, true).
                        A.length = k;
                        // 2. Return A.
                        return A;
                    }
                    // v. Let nextValue be ? IteratorValue(next).
                    var nextValue = IteratorValue(next);
                    // vi. If mapping is true, then
                    if (mapping) {
                        try {
                            // Polyfill.io - The try catch accounts for step 2.
                            // 1. Let mappedValue be Call(mapfn, T, « nextValue, k »).
                            var mappedValue = Call(mapfn, T, [nextValue, k]);
                            // 2. If mappedValue is an abrupt completion, return ? IteratorClose(iteratorRecord, mappedValue).
                            // 3. Let mappedValue be mappedValue.[[Value]].
                        } catch (e) {
                            return IteratorClose(iteratorRecord, e);
                        }

                        // vii. Else, let mappedValue be nextValue.
                    } else {
                        mappedValue = nextValue;
                    }
                    try {
                        // Polyfill.io - The try catch accounts for step ix.
                        // viii. Let defineStatus be CreateDataPropertyOrThrow(A, Pk, mappedValue).
                        CreateDataPropertyOrThrow(A, Pk, mappedValue);
                        // ix. If defineStatus is an abrupt completion, return ? IteratorClose(iteratorRecord, defineStatus).
                    } catch (e) {
                        return IteratorClose(iteratorRecord, e);
                    }
                    // x. Increase k by 1.
                    k = k + 1;
                }
            }
            // 6. NOTE: items is not an Iterable so assume it is an array-like object.
            // 7. Let arrayLike be ! ToObject(items).
            // Polyfill.io - For Strings we need to split astral symbols into surrogate pairs.
            if (isString(items)) {
                var arrayLike = stringMatch.call(items, /[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g) || [];
            } else {
                arrayLike = ToObject(items);
            }
            // 8. Let len be ? ToLength(? Get(arrayLike, "length")).
            var len = ToLength(Get(arrayLike, "length"));
            // 9. If IsConstructor(C) is true, then
            if (IsConstructor(C)) {
                // a. Let A be ? Construct(C, « len »).
                A = Construct(C, [len]);
                // 10. Else,
            } else {
                // a. Let A be ? ArrayCreate(len).
                A = ArrayCreate(len);
            }
            // 11. Let k be 0.
            k = 0;
            // 12. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                Pk = ToString(k);
                // b. Let kValue be ? Get(arrayLike, Pk).
                var kValue = Get(arrayLike, Pk);
                // c. If mapping is true, then
                if (mapping === true) {
                    // i. Let mappedValue be ? Call(mapfn, T, « kValue, k »).
                    mappedValue = Call(mapfn, T, [kValue, k]);
                    // d. Else, let mappedValue be kValue.
                } else {
                    mappedValue = kValue;
                }
                // e. Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
                CreateDataPropertyOrThrow(A, Pk, mappedValue);
                // f. Increase k by 1.
                k = k + 1;
            }
            // 13. Perform ? Set(A, "length", len, true).
            A.length = len;
            // 14. Return A.
            return A;
        });
    }());

// Symbol.toStringTag
    /* global Symbol */
    Object.defineProperty(Symbol, 'toStringTag', {
        value: Symbol('toStringTag')
    });

// _Iterator
    /* global Symbol */
// A modification of https://github.com/medikoo/es6-iterator
// Copyright (C) 2013-2015 Mariusz Nowak (www.medikoo.com)

    var Iterator = (function () { // eslint-disable-line no-unused-vars
        var clear = function () {
            this.length = 0;
            return this;
        };
        var callable = function (fn) {
            if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
            return fn;
        };

        var Iterator = function (list, context) {
            if (!(this instanceof Iterator)) {
                return new Iterator(list, context);
            }
            Object.defineProperties(this, {
                __list__: {
                    writable: true,
                    value: list
                },
                __context__: {
                    writable: true,
                    value: context
                },
                __nextIndex__: {
                    writable: true,
                    value: 0
                }
            });
            if (!context) return;
            callable(context.on);
            context.on('_add', this._onAdd.bind(this));
            context.on('_delete', this._onDelete.bind(this));
            context.on('_clear', this._onClear.bind(this));
        };

        Object.defineProperties(Iterator.prototype, Object.assign({
            constructor: {
                value: Iterator,
                configurable: true,
                enumerable: false,
                writable: true
            },
            _next: {
                value: function () {
                    var i;
                    if (!this.__list__) return;
                    if (this.__redo__) {
                        i = this.__redo__.shift();
                        if (i !== undefined) return i;
                    }
                    if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
                    this._unBind();
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            next: {
                value: function () {
                    return this._createResult(this._next());
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            _createResult: {
                value: function (i) {
                    if (i === undefined) return {
                        done: true,
                        value: undefined
                    };
                    return {
                        done: false,
                        value: this._resolve(i)
                    };
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            _resolve: {
                value: function (i) {
                    return this.__list__[i];
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            _unBind: {
                value: function () {
                    this.__list__ = null;
                    delete this.__redo__;
                    if (!this.__context__) return;
                    this.__context__.off('_add', this._onAdd.bind(this));
                    this.__context__.off('_delete', this._onDelete.bind(this));
                    this.__context__.off('_clear', this._onClear.bind(this));
                    this.__context__ = null;
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            toString: {
                value: function () {
                    return '[object Iterator]';
                },
                configurable: true,
                enumerable: false,
                writable: true
            }
        }, {
            _onAdd: {
                value: function (index) {
                    if (index >= this.__nextIndex__) return;
                    ++this.__nextIndex__;
                    if (!this.__redo__) {
                        Object.defineProperty(this, '__redo__', {
                            value: [index],
                            configurable: true,
                            enumerable: false,
                            writable: false
                        });
                        return;
                    }
                    this.__redo__.forEach(function (redo, i) {
                        if (redo >= index) this.__redo__[i] = ++redo;
                    }, this);
                    this.__redo__.push(index);
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            _onDelete: {
                value: function (index) {
                    var i;
                    if (index >= this.__nextIndex__) return;
                    --this.__nextIndex__;
                    if (!this.__redo__) return;
                    i = this.__redo__.indexOf(index);
                    if (i !== -1) this.__redo__.splice(i, 1);
                    this.__redo__.forEach(function (redo, i) {
                        if (redo > index) this.__redo__[i] = --redo;
                    }, this);
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            _onClear: {
                value: function () {
                    if (this.__redo__) clear.call(this.__redo__);
                    this.__nextIndex__ = 0;
                },
                configurable: true,
                enumerable: false,
                writable: true
            }
        }));

        Object.defineProperty(Iterator.prototype, Symbol.iterator, {
            value: function () {
                return this;
            },
            configurable: true,
            enumerable: false,
            writable: true
        });
        Object.defineProperty(Iterator.prototype, Symbol.toStringTag, {
            value: 'Iterator',
            configurable: false,
            enumerable: false,
            writable: true
        });

        return Iterator;
    }());

// _ArrayIterator
    /* global Iterator */
// A modification of https://github.com/medikoo/es6-iterator
// Copyright (C) 2013-2015 Mariusz Nowak (www.medikoo.com)

    var ArrayIterator = (function() { // eslint-disable-line no-unused-vars

        var ArrayIterator = function(arr, kind) {
            if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
            Iterator.call(this, arr);
            if (!kind) kind = 'value';
            else if (String.prototype.includes.call(kind, 'key+value')) kind = 'key+value';
            else if (String.prototype.includes.call(kind, 'key')) kind = 'key';
            else kind = 'value';
            Object.defineProperty(this, '__kind__', {
                value: kind,
                configurable: false,
                enumerable: false,
                writable: false
            });
        };
        if (Object.setPrototypeOf) Object.setPrototypeOf(ArrayIterator, Iterator.prototype);

        ArrayIterator.prototype = Object.create(Iterator.prototype, {
            constructor: {
                value: ArrayIterator,
                configurable: true,
                enumerable: false,
                writable: true
            },
            _resolve: {
                value: function(i) {
                    if (this.__kind__ === 'value') return this.__list__[i];
                    if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
                    return i;
                },
                configurable: true,
                enumerable: false,
                writable: true
            },
            toString: {
                value: function() {
                    return '[object Array Iterator]';
                },
                configurable: true,
                enumerable: false,
                writable: true
            }
        });

        return ArrayIterator;
    }());

// Array.prototype.values
    /* global CreateMethodProperty, Symbol, ToObject, ArrayIterator */
// 22.1.3.30/ Array.prototype.values ( )
// Polyfill.io - Firefox, Chrome and Opera have Array.prototype[Symbol.iterator], which is the exact same function as Array.prototype.values.
    if ('Symbol' in self && 'iterator' in Symbol && typeof Array.prototype[Symbol.iterator] === 'function') {
        CreateMethodProperty(Array.prototype, 'values', Array.prototype[Symbol.iterator]);
    } else {
        CreateMethodProperty(Array.prototype, 'values', function values () {
            // 1. Let O be ? ToObject(this value).
            var O = ToObject(this);
            // 2. Return CreateArrayIterator(O, "value").
            // TODO: Add CreateArrayIterator
            return new ArrayIterator(O, 'value');
        });
    }

// Promise
    /*
 Yaku v0.19.3
 (c) 2015 Yad Smood. http://ysmood.org
 License MIT
*/
    /*
 Yaku v0.17.9
 (c) 2015 Yad Smood. http://ysmood.org
 License MIT
*/
    (function () {
        'use strict';

        var $undefined
            , $null = null
            , isBrowser = typeof self === 'object'
            , root = self
            , nativePromise = root.Promise
            , process = root.process
            , console = root.console
            , isLongStackTrace = true
            , Arr = Array
            , Err = Error

            , $rejected = 1
            , $resolved = 2
            , $pending = 3

            , $Symbol = 'Symbol'
            , $iterator = 'iterator'
            , $species = 'species'
            , $speciesKey = $Symbol + '(' + $species + ')'
            , $return = 'return'

            , $unhandled = '_uh'
            , $promiseTrace = '_pt'
            , $settlerTrace = '_st'

            , $invalidThis = 'Invalid this'
            , $invalidArgument = 'Invalid argument'
            , $fromPrevious = '\nFrom previous '
            , $promiseCircularChain = 'Chaining cycle detected for promise'
            , $unhandledRejectionMsg = 'Uncaught (in promise)'
            , $rejectionHandled = 'rejectionHandled'
            , $unhandledRejection = 'unhandledRejection'

            , $tryCatchFn
            , $tryCatchThis
            , $tryErr = { e: $null }
            , $noop = function () {}
            , $cleanStackReg = /^.+\/node_modules\/yaku\/.+\n?/mg
        ;

        /**
         * This class follows the [Promises/A+](https://promisesaplus.com) and
         * [ES6](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) spec
         * with some extra helpers.
         * @param  {Function} executor Function object with two arguments resolve, reject.
         * The first argument fulfills the promise, the second argument rejects it.
         * We can call these functions, once our operation is completed.
         */
        var Yaku = function (executor) {
            var self = this,
                err;

            // "this._s" is the internao state of: pending, resolved or rejected
            // "this._v" is the internal value

            if (!isObject(self) || self._s !== $undefined)
                throw genTypeError($invalidThis);

            self._s = $pending;

            if (isLongStackTrace) self[$promiseTrace] = genTraceInfo();

            if (executor !== $noop) {
                if (!isFunction(executor))
                    throw genTypeError($invalidArgument);

                err = genTryCatcher(executor)(
                    genSettler(self, $resolved),
                    genSettler(self, $rejected)
                );

                if (err === $tryErr)
                    settlePromise(self, $rejected, err.e);
            }
        };

        Yaku['default'] = Yaku;

        extend(Yaku.prototype, {
            /**
             * Appends fulfillment and rejection handlers to the promise,
             * and returns a new promise resolving to the return value of the called handler.
             * @param  {Function} onFulfilled Optional. Called when the Promise is resolved.
             * @param  {Function} onRejected  Optional. Called when the Promise is rejected.
             * @return {Yaku} It will return a new Yaku which will resolve or reject after
             * @example
             * the current Promise.
             * ```js
             * var Promise = require('yaku');
             * var p = Promise.resolve(10);
             *
             * p.then((v) => {
             *     console.log(v);
             * });
             * ```
             */
            then: function (onFulfilled, onRejected) {
                if (this._s === undefined) throw genTypeError();

                return addHandler(
                    this,
                    newCapablePromise(Yaku.speciesConstructor(this, Yaku)),
                    onFulfilled,
                    onRejected
                );
            },

            /**
             * The `catch()` method returns a Promise and deals with rejected cases only.
             * It behaves the same as calling `Promise.prototype.then(undefined, onRejected)`.
             * @param  {Function} onRejected A Function called when the Promise is rejected.
             * This function has one argument, the rejection reason.
             * @return {Yaku} A Promise that deals with rejected cases only.
             * @example
             * ```js
             * var Promise = require('yaku');
             * var p = Promise.reject(new Error("ERR"));
             *
             * p['catch']((v) => {
             *     console.log(v);
             * });
             * ```
             */
            'catch': function (onRejected) {
                return this.then($undefined, onRejected);
            },

            /**
             * Register a callback to be invoked when a promise is settled (either fulfilled or rejected).
             * Similar with the try-catch-finally, it's often used for cleanup.
             * @param  {Function} onFinally A Function called when the Promise is settled.
             * It will not receive any argument.
             * @return {Yaku} A Promise that will reject if onFinally throws an error or returns a rejected promise.
             * Else it will resolve previous promise's final state (either fulfilled or rejected).
             * @example
             * ```js
             * var Promise = require('yaku');
             * var p = Math.random() > 0.5 ? Promise.resolve() : Promise.reject();
             * p.finally(() => {
             *     console.log('finally');
             * });
             * ```
             */
            'finally': function (onFinally) {
                return this.then(function (val) {
                    return Yaku.resolve(onFinally()).then(function () {
                        return val;
                    });
                }, function (err) {
                    return Yaku.resolve(onFinally()).then(function () {
                        throw err;
                    });
                });
            },

            // The number of current promises that attach to this Yaku instance.
            _c: 0,

            // The parent Yaku.
            _p: $null
        });

        /**
         * The `Promise.resolve(value)` method returns a Promise object that is resolved with the given value.
         * If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable,
         * adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
         * @param  {Any} value Argument to be resolved by this Promise.
         * Can also be a Promise or a thenable to resolve.
         * @return {Yaku}
         * @example
         * ```js
         * var Promise = require('yaku');
         * var p = Promise.resolve(10);
         * ```
         */
        Yaku.resolve = function (val) {
            return isYaku(val) ? val : settleWithX(newCapablePromise(this), val);
        };

        /**
         * The `Promise.reject(reason)` method returns a Promise object that is rejected with the given reason.
         * @param  {Any} reason Reason why this Promise rejected.
         * @return {Yaku}
         * @example
         * ```js
         * var Promise = require('yaku');
         * var p = Promise.reject(new Error("ERR"));
         * ```
         */
        Yaku.reject = function (reason) {
            return settlePromise(newCapablePromise(this), $rejected, reason);
        };

        /**
         * The `Promise.race(iterable)` method returns a promise that resolves or rejects
         * as soon as one of the promises in the iterable resolves or rejects,
         * with the value or reason from that promise.
         * @param  {iterable} iterable An iterable object, such as an Array.
         * @return {Yaku} The race function returns a Promise that is settled
         * the same way as the first passed promise to settle.
         * It resolves or rejects, whichever happens first.
         * @example
         * ```js
         * var Promise = require('yaku');
         * Promise.race([
         *     123,
         *     Promise.resolve(0)
         * ])
         * .then((value) => {
         *     console.log(value); // => 123
         * });
         * ```
         */
        Yaku.race = function (iterable) {
            var self = this
                , p = newCapablePromise(self)

                , resolve = function (val) {
                settlePromise(p, $resolved, val);
            }

                , reject = function (val) {
                settlePromise(p, $rejected, val);
            }

                , ret = genTryCatcher(each)(iterable, function (v) {
                self.resolve(v).then(resolve, reject);
            });

            if (ret === $tryErr) return self.reject(ret.e);

            return p;
        };

        /**
         * The `Promise.all(iterable)` method returns a promise that resolves when
         * all of the promises in the iterable argument have resolved.
         *
         * The result is passed as an array of values from all the promises.
         * If something passed in the iterable array is not a promise,
         * it's converted to one by Promise.resolve. If any of the passed in promises rejects,
         * the all Promise immediately rejects with the value of the promise that rejected,
         * discarding all the other promises whether or not they have resolved.
         * @param  {iterable} iterable An iterable object, such as an Array.
         * @return {Yaku}
         * @example
         * ```js
         * var Promise = require('yaku');
         * Promise.all([
         *     123,
         *     Promise.resolve(0)
         * ])
         * .then((values) => {
         *     console.log(values); // => [123, 0]
         * });
         * ```
         * @example
         * Use with iterable.
         * ```js
         * var Promise = require('yaku');
         * Promise.all((function * () {
         *     yield 10;
         *     yield new Promise(function (r) { setTimeout(r, 1000, "OK") });
         * })())
         * .then((values) => {
         *     console.log(values); // => [123, 0]
         * });
         * ```
         */
        Yaku.all = function (iterable) {
            var self = this
                , p1 = newCapablePromise(self)
                , res = []
                , ret
            ;

            function reject (reason) {
                settlePromise(p1, $rejected, reason);
            }

            ret = genTryCatcher(each)(iterable, function (item, i) {
                self.resolve(item).then(function (value) {
                    res[i] = value;
                    if (!--ret) settlePromise(p1, $resolved, res);
                }, reject);
            });

            if (ret === $tryErr) return self.reject(ret.e);

            if (!ret) settlePromise(p1, $resolved, []);

            return p1;
        };

        /**
         * The ES6 Symbol object that Yaku should use, by default it will use the
         * global one.
         * @type {Object}
         * @example
         * ```js
         * var core = require("core-js/library");
         * var Promise = require("yaku");
         * Promise.Symbol = core.Symbol;
         * ```
         */
        Yaku.Symbol = root[$Symbol] || {};

        // To support browsers that don't support `Object.defineProperty`.
        genTryCatcher(function () {
            Object.defineProperty(Yaku, getSpecies(), {
                get: function () { return this; }
            });
        })();

        /**
         * Use this api to custom the species behavior.
         * https://tc39.github.io/ecma262/#sec-speciesconstructor
         * @param {Any} O The current this object.
         * @param {Function} defaultConstructor
         */
        Yaku.speciesConstructor = function (O, D) {
            var C = O.constructor;

            return C ? (C[getSpecies()] || D) : D;
        };

        /**
         * Catch all possibly unhandled rejections. If you want to use specific
         * format to display the error stack, overwrite it.
         * If it is set, auto `console.error` unhandled rejection will be disabled.
         * @param {Any} reason The rejection reason.
         * @param {Yaku} p The promise that was rejected.
         * @example
         * ```js
         * var Promise = require('yaku');
         * Promise.unhandledRejection = (reason) => {
         *     console.error(reason);
         * };
         *
         * // The console will log an unhandled rejection error message.
         * Promise.reject('my reason');
         *
         * // The below won't log the unhandled rejection error message.
         * Promise.reject('v')["catch"](() => {});
         * ```
         */
        Yaku.unhandledRejection = function (reason, p) {
            console && console.error(
                $unhandledRejectionMsg,
                isLongStackTrace ? p.longStack : genStackInfo(reason, p)
            );
        };

        /**
         * Emitted whenever a Promise was rejected and an error handler was
         * attached to it (for example with `["catch"]()`) later than after an event loop turn.
         * @param {Any} reason The rejection reason.
         * @param {Yaku} p The promise that was rejected.
         */
        Yaku.rejectionHandled = $noop;

        /**
         * It is used to enable the long stack trace.
         * Once it is enabled, it can't be reverted.
         * While it is very helpful in development and testing environments,
         * it is not recommended to use it in production. It will slow down
         * application and eat up memory.
         * It will add an extra property `longStack` to the Error object.
         * @example
         * ```js
         * var Promise = require('yaku');
         * Promise.enableLongStackTrace();
         * Promise.reject(new Error("err"))["catch"]((err) => {
         *     console.log(err.longStack);
         * });
         * ```
         */
        Yaku.enableLongStackTrace = function () {
            isLongStackTrace = true;
        };

        /**
         * Only Node has `process.nextTick` function. For browser there are
         * so many ways to polyfill it. Yaku won't do it for you, instead you
         * can choose what you prefer. For example, this project
         * [next-tick](https://github.com/medikoo/next-tick).
         * By default, Yaku will use `process.nextTick` on Node, `setTimeout` on browser.
         * @type {Function}
         * @example
         * ```js
         * var Promise = require('yaku');
         * Promise.nextTick = require('next-tick');
         * ```
         * @example
         * You can even use sync resolution if you really know what you are doing.
         * ```js
         * var Promise = require('yaku');
         * Promise.nextTick = fn => fn();
         * ```
         */
        Yaku.nextTick = isBrowser ?
            function (fn) {
                nativePromise ?
                    new nativePromise(function (resolve) { resolve(); }).then(fn) :
                    setTimeout(fn);
            } :
            process.nextTick;

        // ********************** Private **********************

        Yaku._s = 1;

        /**
         * All static variable name will begin with `$`. Such as `$rejected`.
         * @private
         */

        // ******************************* Utils ********************************

        function getSpecies () {
            return Yaku[$Symbol][$species] || $speciesKey;
        }

        function extend (src, target) {
            for (var k in target) {
                src[k] = target[k];
            }
        }

        function isObject (obj) {
            return obj && typeof obj === 'object';
        }

        function isFunction (obj) {
            return typeof obj === 'function';
        }

        function isInstanceOf (a, b) {
            return a instanceof b;
        }

        function isError (obj) {
            return isInstanceOf(obj, Err);
        }

        function ensureType (obj, fn, msg) {
            if (!fn(obj)) throw genTypeError(msg);
        }

        /**
         * Wrap a function into a try-catch.
         * @private
         * @return {Any | $tryErr}
         */
        function tryCatcher () {
            try {
                return $tryCatchFn.apply($tryCatchThis, arguments);
            } catch (e) {
                $tryErr.e = e;
                return $tryErr;
            }
        }

        /**
         * Generate a try-catch wrapped function.
         * @private
         * @param  {Function} fn
         * @return {Function}
         */
        function genTryCatcher (fn, self) {
            $tryCatchFn = fn;
            $tryCatchThis = self;
            return tryCatcher;
        }

        /**
         * Generate a scheduler.
         * @private
         * @param  {Integer}  initQueueSize
         * @param  {Function} fn `(Yaku, Value) ->` The schedule handler.
         * @return {Function} `(Yaku, Value) ->` The scheduler.
         */
        function genScheduler (initQueueSize, fn) {
            /**
             * All async promise will be scheduled in
             * here, so that they can be execute on the next tick.
             * @private
             */
            var fnQueue = Arr(initQueueSize)
                , fnQueueLen = 0;

            /**
             * Run all queued functions.
             * @private
             */
            function flush () {
                var i = 0;
                while (i < fnQueueLen) {
                    fn(fnQueue[i], fnQueue[i + 1]);
                    fnQueue[i++] = $undefined;
                    fnQueue[i++] = $undefined;
                }

                fnQueueLen = 0;
                if (fnQueue.length > initQueueSize) fnQueue.length = initQueueSize;
            }

            return function (v, arg) {
                fnQueue[fnQueueLen++] = v;
                fnQueue[fnQueueLen++] = arg;

                if (fnQueueLen === 2) Yaku.nextTick(flush);
            };
        }

        /**
         * Generate a iterator
         * @param  {Any} obj
         * @private
         * @return {Object || TypeError}
         */
        function each (iterable, fn) {
            var len
                , i = 0
                , iter
                , item
                , ret
            ;

            if (!iterable) throw genTypeError($invalidArgument);

            var gen = iterable[Yaku[$Symbol][$iterator]];
            if (isFunction(gen))
                iter = gen.call(iterable);
            else if (isFunction(iterable.next)) {
                iter = iterable;
            }
            else if (isInstanceOf(iterable, Arr)) {
                len = iterable.length;
                while (i < len) {
                    fn(iterable[i], i++);
                }
                return i;
            } else
                throw genTypeError($invalidArgument);

            while (!(item = iter.next()).done) {
                ret = genTryCatcher(fn)(item.value, i++);
                if (ret === $tryErr) {
                    isFunction(iter[$return]) && iter[$return]();
                    throw ret.e;
                }
            }

            return i;
        }

        /**
         * Generate type error object.
         * @private
         * @param  {String} msg
         * @return {TypeError}
         */
        function genTypeError (msg) {
            return new TypeError(msg);
        }

        function genTraceInfo (noTitle) {
            return (noTitle ? '' : $fromPrevious) + new Err().stack;
        }


        // *************************** Promise Helpers ****************************

        /**
         * Resolve the value returned by onFulfilled or onRejected.
         * @private
         * @param {Yaku} p1
         * @param {Yaku} p2
         */
        var scheduleHandler = genScheduler(999, function (p1, p2) {
            var x, handler;

            // 2.2.2
            // 2.2.3
            handler = p1._s !== $rejected ? p2._onFulfilled : p2._onRejected;

            // 2.2.7.3
            // 2.2.7.4
            if (handler === $undefined) {
                settlePromise(p2, p1._s, p1._v);
                return;
            }

            // 2.2.7.1
            x = genTryCatcher(callHanler)(handler, p1._v);
            if (x === $tryErr) {
                // 2.2.7.2
                settlePromise(p2, $rejected, x.e);
                return;
            }

            settleWithX(p2, x);
        });

        var scheduleUnhandledRejection = genScheduler(9, function (p) {
            if (!hashOnRejected(p)) {
                p[$unhandled] = 1;
                emitEvent($unhandledRejection, p);
            }
        });

        function emitEvent (name, p) {
            var browserEventName = 'on' + name.toLowerCase()
                , browserHandler = root[browserEventName];

            if (process && process.listeners(name).length)
                name === $unhandledRejection ?
                    process.emit(name, p._v, p) : process.emit(name, p);
            else if (browserHandler)
                browserHandler({ reason: p._v, promise: p });
            else
                Yaku[name](p._v, p);
        }

        function isYaku (val) { return val && val._s; }

        function newCapablePromise (Constructor) {
            if (isYaku(Constructor)) return new Constructor($noop);

            var p, r, j;
            p = new Constructor(function (resolve, reject) {
                if (p) throw genTypeError();

                r = resolve;
                j = reject;
            });

            ensureType(r, isFunction);
            ensureType(j, isFunction);

            return p;
        }

        /**
         * It will produce a settlePromise function to user.
         * Such as the resolve and reject in this `new Yaku (resolve, reject) ->`.
         * @private
         * @param  {Yaku} self
         * @param  {Integer} state The value is one of `$pending`, `$resolved` or `$rejected`.
         * @return {Function} `(value) -> undefined` A resolve or reject function.
         */
        function genSettler (self, state) {
            var isCalled = false;
            return function (value) {
                if (isCalled) return;
                isCalled = true;

                if (isLongStackTrace)
                    self[$settlerTrace] = genTraceInfo(true);

                if (state === $resolved)
                    settleWithX(self, value);
                else
                    settlePromise(self, state, value);
            };
        }

        /**
         * Link the promise1 to the promise2.
         * @private
         * @param {Yaku} p1
         * @param {Yaku} p2
         * @param {Function} onFulfilled
         * @param {Function} onRejected
         */
        function addHandler (p1, p2, onFulfilled, onRejected) {
            // 2.2.1
            if (isFunction(onFulfilled))
                p2._onFulfilled = onFulfilled;
            if (isFunction(onRejected)) {
                if (p1[$unhandled]) emitEvent($rejectionHandled, p1);

                p2._onRejected = onRejected;
            }

            if (isLongStackTrace) p2._p = p1;
            p1[p1._c++] = p2;

            // 2.2.6
            if (p1._s !== $pending)
                scheduleHandler(p1, p2);

            // 2.2.7
            return p2;
        }

        // iterate tree
        function hashOnRejected (node) {
            // A node shouldn't be checked twice.
            if (node._umark)
                return true;
            else
                node._umark = true;

            var i = 0
                , len = node._c
                , child;

            while (i < len) {
                child = node[i++];
                if (child._onRejected || hashOnRejected(child)) return true;
            }
        }

        function genStackInfo (reason, p) {
            var stackInfo = [];

            function push (trace) {
                return stackInfo.push(trace.replace(/^\s+|\s+$/g, ''));
            }

            if (isLongStackTrace) {
                if (p[$settlerTrace])
                    push(p[$settlerTrace]);

                // Hope you guys could understand how the back trace works.
                // We only have to iterate through the tree from the bottom to root.
                (function iter (node) {
                    if (node && $promiseTrace in node) {
                        iter(node._next);
                        push(node[$promiseTrace] + '');
                        iter(node._p);
                    }
                })(p);
            }

            return (reason && reason.stack ? reason.stack : reason) +
                ('\n' + stackInfo.join('\n')).replace($cleanStackReg, '');
        }

        function callHanler (handler, value) {
            // 2.2.5
            return handler(value);
        }

        /**
         * Resolve or reject a promise.
         * @private
         * @param  {Yaku} p
         * @param  {Integer} state
         * @param  {Any} value
         */
        function settlePromise (p, state, value) {
            var i = 0
                , len = p._c;

            // 2.1.2
            // 2.1.3
            if (p._s === $pending) {
                // 2.1.1.1
                p._s = state;
                p._v = value;

                if (state === $rejected) {
                    if (isLongStackTrace && isError(value)) {
                        value.longStack = genStackInfo(value, p);
                    }

                    scheduleUnhandledRejection(p);
                }

                // 2.2.4
                while (i < len) {
                    scheduleHandler(p, p[i++]);
                }
            }

            return p;
        }

        /**
         * Resolve or reject promise with value x. The x can also be a thenable.
         * @private
         * @param {Yaku} p
         * @param {Any | Thenable} x A normal value or a thenable.
         */
        function settleWithX (p, x) {
            // 2.3.1
            if (x === p && x) {
                settlePromise(p, $rejected, genTypeError($promiseCircularChain));
                return p;
            }

            // 2.3.2
            // 2.3.3
            if (x !== $null && (isFunction(x) || isObject(x))) {
                // 2.3.2.1
                var xthen = genTryCatcher(getThen)(x);

                if (xthen === $tryErr) {
                    // 2.3.3.2
                    settlePromise(p, $rejected, xthen.e);
                    return p;
                }

                if (isFunction(xthen)) {
                    if (isLongStackTrace && isYaku(x))
                        p._next = x;

                    // Fix https://bugs.chromium.org/p/v8/issues/detail?id=4162
                    if (isYaku(x))
                        settleXthen(p, x, xthen);
                    else
                        Yaku.nextTick(function () {
                            settleXthen(p, x, xthen);
                        });
                } else
                    // 2.3.3.4
                    settlePromise(p, $resolved, x);
            } else
                // 2.3.4
                settlePromise(p, $resolved, x);

            return p;
        }

        /**
         * Try to get a promise's then method.
         * @private
         * @param  {Thenable} x
         * @return {Function}
         */
        function getThen (x) { return x.then; }

        /**
         * Resolve then with its promise.
         * @private
         * @param  {Yaku} p
         * @param  {Thenable} x
         * @param  {Function} xthen
         */
        function settleXthen (p, x, xthen) {
            // 2.3.3.3
            var err = genTryCatcher(xthen, x)(function (y) {
                // 2.3.3.3.3
                // 2.3.3.3.1
                x && (x = $null, settleWithX(p, y));
            }, function (r) {
                // 2.3.3.3.3
                // 2.3.3.3.2
                x && (x = $null, settlePromise(p, $rejected, r));
            });

            // 2.3.3.3.4.1
            if (err === $tryErr && x) {
                // 2.3.3.3.4.2
                settlePromise(p, $rejected, err.e);
                x = $null;
            }
        }

        root.Promise = Yaku;
    })();
})
('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
