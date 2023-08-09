class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement("ul");
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = "KeywordHistory";
    $target.appendChild(this.$keywordHistory);

    // dummy data
    this.data = ["아", "테일", "고양이"];

    this.onSearch = onSearch;

    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map(
        (keyword) => `
                    <li><button>${keyword}</button></li>
                `
      )
      .join("");

    this.$keywordHistory.querySelectorAll("li button").forEach(($item, idx) => {
      $item.addEventListener("click", () => {
        console.log(idx);
        this.onSearch(this.data.at[idx]);
      });
    });
  }
}
