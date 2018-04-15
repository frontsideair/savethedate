# savethedate

[![Travis][build-badge]][build] [![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

All the primitives to build your own datepicker component.

[Demo.][demo]

## Why?

Today if you need a datepicker component, there are tons to choose from. But each come with their
own visual language. You're in luck if you use one of the popular UI frameworks, but if you have
your own design system, you have to write a ton of CSS to make it look like one of your own, and you
can't use your own components.

I encountered this problem and tried to build a datepicker component that doesn't enforce how it
will _look_, but how it will _behave_. It uses the popular [render props][render-prop] pattern to
run the business logic and give you the necessary information to draw it using your own components,
styling solution etc.

## Roadmap

- [ ] Accessibility (look at the excellent [react-dates][react-dates] library by Airbnb)
- [ ] i18n

[build-badge]: https://img.shields.io/travis/frontsidedair/savethedate/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/savethedate.png?style=flat-square
[npm]: https://www.npmjs.org/package/savethedate
[coveralls-badge]: https://img.shields.io/coveralls/frontsideair/savethedate/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/frontsideair/savethedate
[demo]: https://codesandbox.io/s/ol3w6018y
[render-prop]: https://reactjs.org/docs/render-props.html
[react-dates]: https://github.com/airbnb/react-dates
