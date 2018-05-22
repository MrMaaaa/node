# 前端 BUG 指南

## 整理个人前端开发遇到的一些问题

1.  **清除 ios 设备/移动 safari 浏览器点击阴影效果：**
    <br />

    <pre>-webkit-tap-highlight-color: rgba(0,0,0,0);</pre>

2.  **移动端解决点击后 300ms 延迟：fastclick 或使用 jquery 的 touchend 事件**


    * 使用[fast-click](http://example.com/ 'fast-click')插件或使用`touchend`事件代替`click`事件

    * 使用以下样式
    <pre>
      touch-action: manipulation;
    </pre>

    * 使用以下标签
    <pre>
      &lt;meta name="viewport" content="width=device-width"&gt;
    </pre>

3.  **文本描边**

    <pre>
    {
      -webkit-text-stroke: 6px #f00;
      -webkit-text-fill-color: #fff;
      font-size: 30px;
      background: linear-gradient(-86deg, #EEF85B 5%, #7AEC8D 53%, #09E5C3 91%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: #fff;
      -webkit-text-stroke: 6px transparent;
    }
    </pre>

4.  **js/CSS 查询 CSS 是否可用**

    <pre>
      CSS.supports('display', 'flex')
    </pre>

    参考自：[@supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports '@supports')

    CSS 也可以进行查询

    <pre>
      @supports (display: flexbox) and ( not (display: inline-grid) ) {
        /* specific rules */
      }
    </pre>

    参考自：[@supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports '@supports')

5.  **background-repeat 新属性：round 和 space（类似于 repeat-x，round 不会超出宽度，space 自动控制图片间距以适应容器宽度）**

6.  **建议给所有 absolute 定位与 fixed 定位加上 z 轴定位以启用 GPU 加速**

    <pre>
      transform: translateZ(0);
      /* 或 */
      transform: translate3d(0,0,0);
    </pre>

7.  **阻止 iOS 弹簧效果**

    <pre>
      body {  
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    </pre>

8.  **js 获取页面元素的 CSS 属性**

    <pre>
      function getStyle(elem, property, [pseudoElt]) {
        // ie通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
        // 注意：window.getComputedStyle等价于document.defaultView.getComputedStyle
        return document.defaultView.getComputedStyle
        ? document.defaultView.getComputedStyle(elem, [pseudoElt])[property]
        : elem.currentStyle[property];
      }
    </pre>

    注意：[返回的样式是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle, 'Window.getComputedStyle()')

9.  **阻止一个点击事件的其他时间监听与冒泡**

    <pre>
      event.stopImmediatePropagation()
    </pre>

10. **jQuery 中使用 end()方法返回到上一个选择的元素**

    <pre>
      // 此时this指向仍为$(this)
      $(this).parent().end()
    </pre>

11. **CSS 禁用点击事件**

    <pre>
      pointer-events:none;
    </pre>

12. **关于 CSS3 中的伪类选择器**

    div:first-of-type:last-of-type === div:only-child 设置了当子元素只有一个的时候的样式<br />
    div:not(:last-of-type):first-of-type 当有多个子元素时，选中第一个；只有一个子元素时该 CSS 不生效（但是最后一个子元素无法被应用样式）<br />
    div:not(:only-child) 效果同上，但是最后一个子元素可以被应用样式<br />
    div:not(:only-child):last-of-type 有多个子元素时给最后一个子元素应用样式

13. **vue 中通过 router 传递 params 必须使用 name 代替 path**

14. **隐藏滚动条**

    <pre>
      ::-webkit-scrollbar
      {
        height: 0;
        width: 0;
      }
    </pre>

15. **flex 元素定宽与自适应**

    <pre>
      .a
      {
        flex-shrink: 0;
      }
      .b
      {
        width: 1px;
        flex-grow: 1;
      }
    </pre>

16. **vue 中给父页面中引入的子组件添加点击事件**

    <pre>
      @click.native="function"
    </pre>

17. **在浏览器中输入以下内容会打开一个可编辑的页面**

    <pre>
      data:text/html, &lt;html contenteditable&gt;
    </pre>

18. **获取 iframe 内部元素（同源）**

    <pre>
      iframe.onload = () => {
        // 这里如果使用iframe可能会导致无法获取到元素
          document
          .getElementById('iframe')
          .contentWindow.document.getElementById('now_submit').style.visibility =
          'hidden';

        }
    </pre>

19. **iframe 会在 src 为空或者任意值时加载一次，如果动态修改 src 地址，会加载两次，因此需要动态创建 iframe 然后 append 到 body 中**

20. **table 元素的单元格等宽**

    <pre>
      table-layout: fixed;
    </pre>

21. **iOS 设备需要给部分默认不可点击元素（span 等）加上以下样式以响应点击事件**

    <pre>
      cursor: pointer;
    </pre>

22. **部分 android 设备 animation 无效的原因：linear 等动画函数写在第一位而不是动画名字在第一位**

    例如：

    <pre>
      animation: linear loading-rotating 1.1s infinite;
    </pre>

23. **匹配中文字符的正则表达式**

    <pre>
      /[\u4e00-\u9fa5]+/g
    </pre>

24. **js 输出变量原始类型**

    <pre>
      typeof(value) {
        return Object.prototype.toString
        .call(value)
        .slice(8, -1)
        .toLowerCase();
      },
    </pre>

25. **防止横屏时的文字缩放**

    <pre>
      -webkit-text-size-adjust: 100%;
    </pre>

    不用 none 为了避免影响 pc 端

26. **初始化 input 样式**

    <pre>
      input[type=text], input[type=password], input[type=tel], input[type=number], button, select, textarea
      {
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 0px;
      }
    </pre>

27. **移动端常见 meta 标签**

    <pre>
      &lt;meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" /&gt;
      &lt;!-- 删除苹果默认的工具栏和菜单栏 --&gt;
      &lt;meta name="apple-mobile-web-app-capable" content="yes" /&gt;
      &lt;!-- 设置苹果工具栏颜色 --&gt;
      &lt;meta name="apple-mobile-web-app-status-bar-style" content="black" /&gt;
      &lt;!-- 忽略页面中的数字识别为电话，忽略email识别 --&gt;
      &lt;meta name="format-detection" content="telphone=no, email=no" /&gt;
      &lt;!-- 启用360浏览器的极速模式(webkit) --&gt;
      &lt;meta name="renderer" content="webkit"&gt;
      &lt;!-- 避免IE使用兼容模式 --&gt;
      &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
      &lt;!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 --&gt;
      &lt;meta name="HandheldFriendly" content="true"&gt;
      &lt;!-- 微软的老式浏览器 --&gt;
      &lt;meta name="MobileOptimized" content="320"&gt;
      &lt;!-- uc强制竖屏 --&gt;
      &lt;meta name="screen-orientation" content="portrait"&gt;
      &lt;!-- QQ强制竖屏 --&gt;
      &lt;meta name="x5-orientation" content="portrait"&gt;
      &lt;!-- UC强制全屏 --&gt;
      &lt;meta name="full-screen" content="yes"&gt;
      &lt;!-- QQ强制全屏 --&gt;
      &lt;meta name="x5-fullscreen" content="true"&gt;
      &lt;!-- UC应用模式 --&gt;
      &lt;meta name="browsermode" content="application"&gt;
      &lt;!-- QQ应用模式 --&gt;
      &lt;meta name="x5-page-mode" content="app"&gt;
      &lt;!-- windows phone 点击无高光 --&gt;
      &lt;meta name="msapplication-tap-highlight" content="no"&gt;
    </pre>

28. **npm 安装出现【operation not premmited, unlink】的错误**

    <pre>
      npm install xx --no-optional
    </pre>

29. **判断页面是否是通过 Safari 的【保存到桌面】功能添加到屏幕的地址进入**

    <pre>
      navigator.standalone === true
    </pre>

30. **判断移动端浏览器横竖屏**

    <pre>
      window.addEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        function() {
          if (window.orientation == 180 || window.orientation == 0) {
            // 竖屏
          } else if (window.orientation == 90 || window.orientation == -90) {
            // 横屏
          }
        },
        false
      );
    </pre>

31. **使用 CSP 来阻止 XSS 攻击**

    <pre>
      &lt;meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"&gt;
    </pre>

32. **适配 iPhone X**

    <pre>
      body {  
        padding:
          constant(safe-area-inset-top)
          constant(safe-area-inset-right)
          constant(safe-area-inset-bottom)
          constant(safe-area-inset-left);  
      }
      /* 横屏： */
      safe-area-inset-top = 0  
      safe-area-inset-right = 44px  
      safe-area-inset-bottom = 21px  
      safe-area-inset-left = 44px
      /* 竖屏： */
      safe-area-inset-top = 0
      safe-area-inset-right = 0
      safe-area-inset-bottom = 0
      safe-area-inset-left = 0
    </pre>

33. **解决 transform 导致的模糊**

    <pre>
      transform: translateZ(0);
      /* 或 */
      transform: translate3d(0,0,0);
    </pre>

    注意：使用这个属性时会在新的层进行渲染，会导致其他 absolute/fixed 但未使用该样式设置的元素被遮挡，无法通过 z-index 进行修正，须在每个元素独立设置该样式

34. **vue-cli 中设置相对路径**

    1.  设置 config/index.js
        <pre>
          // 打包 js 引用目录
          build: {
          assetsPublicPath: './'
          }
        </pre>
    2.  设置 build/utils.js
        <pre>
          // 图片引用目录
          return ExtractTextPlugin.extract({
          publicPath: '../../'
          })
        </pre>
    3.  如果使用了 vue-router 并且 mode 为 history 需设置 base 为具体路径（不包括 index.html）

35. **获取 ie 浏览器版本号**

    <pre>
      // 其他浏览器为undefined
      document.documentMode
    </pre>

36. **在 vue 项目中的 main.js 页面中声明所有页面都可 set/get 的变量:在 new Vue 时传入 data 函数来创建变量,在其他的 vue 页面使用 this.$root 来获取对应的变量名(注意不能使用 vue.prototype 来创建,因为每个 vue 页面都会存在一个独立的变量,这将导致其他页面的修改操作不会影响到其他页面,因此最好作为一些通用组件的入口如$alert/$dialog/$loading)**

37. **取消长按的(全选/复制/粘贴)的提示**

    <pre>
      user-select:none;
    </pre>

    注意：在 ios 给 input 设置此样式会导致 input/textarea 能够拉起键盘但无法输入

38. **如果父元素使用 transform(2d 偏移),子元素使用绝对定位会导致出现 1px 左右的偏差,需给父元素加上 translateZ 或者 translate3d**

39. **判断页面是否可见**

    <pre>
      document.hidden || document.webkitHidden
    </pre>

40. **跳转到 APP**
    universal link 或者 url scheme

41. **求所有排列可能**

    <pre>
      const anagrams = (str) => {
        if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
        return str
          .split('')
          .reduce(
            (acc, letter, i) =>
              acc.concat(
                anagrams(str.slice(0, i) + str.slice(i + 1)).map(
                  (val) => letter + val
                )
              ),
            []
          );
      };

      anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
    </pre>

42. **获取滚动位置**

    <pre>
      const getScrollPos = (el = window) => ({
        x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
        y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
      });

      getScrollPos() -> {x: 0, y: 200}
    </pre>

43. **颜色 rgb 转 16 进制**

    <pre>
      const rgbToHex = (r, g, b) =>
        ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

      rgbToHex(255, 165, 1) -> 'ffa501'
    </pre>
