module.exports = {
  singleQuote: true, // 使用单引号代替双引号
  trailingComma: "none", // 在对象或数组最后一个元素后面是否加逗号(在ES5中加尾逗号)
  printWidth: 80, // 超过最大值换行
  tabWidth: 4, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  semi: true, // 句尾添加分号
  proseWrap: "preserve", // 默认值。因为使用了一些折行敏感型的渲染器(如GitHub comment)而按照markdown文本样式进行折行
  quoteProps: "as-needed", //  引用对象中的属性时更改。 只在需要的地方在对象属性周围添加引号。
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  htmlWhitespaceSensitivity: "css", // 指定全局空格敏感性 CSS 显示属性的默认值
  endOfLine: "auto", // 结尾是 \n \r \n\r auto
  jsxBracketSameLine: true, // 在jsx中把'>' 是否单独放一行
  embeddedLanguageFormatting: "off", // 控制 Prettier 是否格式化嵌入在文件中的引用代码。
  arrowParens: "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
};
