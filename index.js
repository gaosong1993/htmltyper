export default (function () {
  const privateProperty = new WeakMap();
  const createElementFromString = (htmlString) => {
    if (htmlStr.trim().startsWith('<t')) {
      htmlStr = `<table>${htmlStr}</table>`
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlStr;
    const lastChild = (el) => el.firstChild ? lastChild(el.firstChild) : el;
    return lastChild(tempDiv);
  }
  const decodeHtmlEntities = (str) => str.replace(/&[a-zA-Z0-9#]+;/g, (match) => ({"&nbsp;":" ","&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'","&cent;":"¢","&pound;":"£","&yen;":"¥","&euro;":"€","&copy;":"©","&reg;":"®","&trade;":"™","&times;":"×","&divide;":"÷","&sect;":"§","&para;":"¶","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&laquo;":"«","&raquo;":"»","&larr;":"←","&rarr;":"→","&uarr;":"↑","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋"})[match] || match)
  const sleep = async (time) => new Promise((resolve) => setTimeout(resolve, time))
  return class HtmlTyper {
    constructor(html) {
      privateProperty[this] = {};
      privateProperty[this].html = decodeHtmlEntities(html);
    }
    get html () {
      return privateProperty[this].html;
    }
    async animate (el) {
      privateProperty[this].html = el.innerHTML;
      el.innerHTML = '';
      this.run(el)
    }
    async run (el, time = 20) {
        const elStock = [];
        var current = el;
        for (let i = 0; i < this.html.length; i++) {
          const char = this.html[i];
          const charNext = i + 1 > this.html.length ? "" : this.html[i + 1];
          if (char === "<" && charNext !== "/" && current.tagName !== 'CODE') {
            var tagName = nodeStr = '';
            var flag = 1
            while (this.html[i] !== ">") {
              nodeStr += this.html[i];
              (flag &= (this.html[i] !== " ")) && (tagName += this.html[i])
              ++i;
            }
            nodeStr += this.html[i]
            const dom = createElementFromString(nodeStr);
            current.appendChild(dom);
            if (this.html[i - 1] !== "/"){
              elStock.unshift(current);
              current = dom
            }
          } else if (char === "<" && charNext === "/") {
            while (this.html[i] !== ">") {
              ++i;
            }
            current = elStock.shift();
          }else{
            current.innerHTML += this.html[i]
            await sleep(time)
          }
        }
    }
  }
})()