console.log("app is running!");

class App {
  $target = null;
  data = [];

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
          this.setState(data);

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
          this.setState(data);
          //hide
          this.loading.hide();
          // reset search input
          this.searchInput.resetValue();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetails({
          visible: true,
          cat,
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

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
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

    this.setState(lastResult);

    this.searchInput.setLastKeyword(this.searchInput.getLastKeyword());
  }
}
