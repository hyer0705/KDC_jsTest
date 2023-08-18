import Empty from "./Empty.js";

class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement("section");
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.$empty = new Empty({ $target: $wrapper });
    // this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.$empty.show(nextData);
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  applyEventToElement = (items) => {
    // scroll event 는 너무 많이 호출 되기 때문에 문제가 발생... 랜더링을 쉴새없이 함..
    // -> 디바운싱 쓰로틀링 필요
    document.addEventListener("scroll", () => {
      items.forEach((el, idx) => {
        if (this.isElementInViewport(el) && items.length - 1 === idx) {
          this.onNextPage();
        }
      });
    });
  };

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      // 아이템이 화면에 보일 때
      if (item.isIntersecting) {
        // 이미지 로드
        item.target.querySelector("img").src =
          item.target.querySelector("img").dataset.src;
        // 마지막 요소를 찾아낸다
        let dataIdx = Number(item.target.dataset.idx);

        // 마지막 요소라면? nextPage 호출
        if (dataIdx + 1 === this.data.length) {
          this.onNextPage();
        }
      }
    });
  });

  render() {
    if (this.data === null || this.data.length === 0) {
      this.$searchResult.style.display = "none";
      return;
    }

    this.$searchResult.style.display = "grid";
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, idx) => `
          <li class="item" data-idx=${idx}>
            <img src="https://placehold.co/200x300" data-src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });
  }
}

export default SearchResult;
