import { Component } from "react";

const compose = (...funcs: Function[]) => (comp: typeof Component) => {
  return funcs.reduceRight((wrapped, f) => f(wrapped), comp);
};

export default compose;
