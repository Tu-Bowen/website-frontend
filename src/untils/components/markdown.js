import showdown from 'showdown'
export function compile(markdown) {
  //创建实例
  var converter = new showdown.Converter();
  //进行转换
  var html = converter.makeHtml(markdown);
  return  html
}