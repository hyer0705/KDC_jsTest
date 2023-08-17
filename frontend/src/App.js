console.log("app is running!");

import Loading from "./Loading.js";
import DarkModeToggle from "./DarkModeToggle.js";
import SearchInput from "./SearchInput.js";
import RandomSearchButton from "./RandomSearchButton.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import api from "./api.js";

class App {
  $target = null;
  DEFAULT_PAGE = 1;

  data = {
    items: [],
    page: this.DEFAULT_PAGE,
  };

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({
      $target,
    });

    this.darkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        //show
        this.loading.show();

        api.fetchCats(keyword).then(({ data }) => {
          this.setState({
            items: data ? data : [],
            page: this.DEFAULT_PAGE,
          });

          //hide
          this.loading.hide();

          this.saveLastResult(data);
        });
      },
    });

    this.randomSearchButton = new RandomSearchButton({
      $target,
      onRandomSearch: () => {
        //show
        this.loading.show();

        api.fetchRandomCats().then(({ data }) => {
          this.setState({
            items: data ? data : [],
            page: this.DEFAULT_PAGE,
          });
          //hide
          this.loading.hide();
          // reset search input
          this.searchInput.resetValue();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: (cat) => {
        this.imageInfo.showDetails({
          visible: true,
          cat,
        });
      },
      onNextPage: () => {
        //show
        this.loading.show();

        let keywordHistory =
          localStorage.getItem("keywordHistory") === null
            ? []
            : localStorage.getItem("keywordHistory").split(",");
        let lastKeyword = keywordHistory[0];

        let page = this.increasePage();

        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.items.concat(data);

          this.setState({
            items: newData,
            page: page,
          });

          //hide
          this.loading.hide();
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        cat: null,
      },
    });

    this.init();
  }

  increasePage() {
    return this.data.page + 1;
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData.items);
  }

  saveLastResult(result) {
    localStorage.setItem("lastResult", JSON.stringify(result));
  }

  getLastResult() {
    return localStorage.getItem("lastResult") === null
      ? []
      : JSON.parse(localStorage.getItem("lastResult"));
  }

  init() {
    const lastResult = this.getLastResult();

    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE,
    });

    this.searchInput.setLastKeyword(this.searchInput.getLastKeyword());
  }
}

export default App;
