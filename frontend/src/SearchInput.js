const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $wrapper = document.createElement("section");
    $wrapper.id = "SearchWrapper";
    $target.appendChild($wrapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    // keyup 의 경우 한글을 입력하고 Enter를 누르면 Enter가 두 번 호출되는 오류가 있음
    $searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        onSearch(e.target.value);
        this.$keywordHistory.addKeyword(e.target.value);
      }
    });

    this.$keywordHistory = new KeywordHistory({ $target, onSearch });
  }
  render() {}
}
