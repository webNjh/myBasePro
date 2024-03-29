/// <reference lib="dom" />

// CSS modules
type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.scss' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.sass' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.less' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.styl' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.stylus' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.pcss' {
  const classes: CSSModuleClasses
  export default classes
}

// CSS
declare module '*.css' {
  const css: CSSModuleClasses | string
  export default css
}
declare module '*.scss' {
  const css: CSSModuleClasses | string
  export default css
}
declare module '*.sass' {
  const css: CSSModuleClasses | string
  export default css
}
declare module '*.less' {
  const css: CSSModuleClasses | string
  export default css
}
declare module '*.styl' {
  const css: CSSModuleClasses | string
  export default css
}
declare module '*.stylus' {
  const css: CSSModuleClasses | string
  export default css
}
declare module '*.pcss' {
  const css: CSSModuleClasses | string
  export default css
}

// Built-in asset types
// see `src/constants.ts`

// images
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
declare module '*.ico' {
  const src: string
  export default src
}
declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.avif' {
  const src: string
  export default src
}

