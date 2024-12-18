# htmltyper
HTML富文本逐字显示动画效果

## 安装
### npm安装
```base
npm i htmltyper
```
### html页面直接使用
```html
<script src="htmltyper.min.js"></script>
```

## 使用
### npm 安装方式使用
```javascript
import Htmltyper from 'htmltyper';

// 第一种使用方式
onMounted(() => {
  const typer = new Htmltyper('<div>...</div>');
  typer.run(document.body, 20)
})
// 第二种使用方式
onMounted(() => {
  const typer = new Htmltyper('');
  typer.animte(document.body, 20); // 此种方式会自动获取传入节点内容进行动画
})
```

### html页面使用
```html
<script>
  window.onload = function () {
    // 第一种使用方式
    const typer = new window.Htmltyper('<div>...</div>');
    typer.run(document.body, 20)
    // 第二种使用方式
    const typer = new window.Htmltyper('');
    typer.animte(document.body, 20); // 此种方式会自动获取传入节点内容进行动画
  }

</script>
```

## 方法介绍
| 方法名称 | 传入参数 | 使用方式 | 方法介绍 |
| :--: | :--: | :--: | :--: |
| animate | el,time| `typer.animate(el, time)` | 自动获取已渲染的节点内容进行逐字动画展示|
| run | el, time | `typer.run(el, time)` | 将初始化的html富文本内容逐字渲染到el节点|

`time`为动画速度，单位ms  默认 20

`el` 为JS节点对象 可以使用`document.getElemnetById`等方法获取的节点对象

## 效果
效果展示可参考 `demo.html`  `demo2.thml`
