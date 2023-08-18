class Empty {
  $empty = null;
  data = null;

  constructor({ $target }) {
    const $empty = document.createElement("div");
    this.$empty = $empty;
    this.$empty.className = "Empty";

    $target.appendChild($empty);

    this.data = {
      show: true,
    };

    this.render();
  }

  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$empty.innerHTML = `
          <p>🚨검색 결과가 없습니다.🚨</p>
      `;
    } else {
      this.$empty.innerHTML = ``;
    }
  }
}

export default Empty;
