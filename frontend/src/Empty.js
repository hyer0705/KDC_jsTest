class Empty {
  $empty = null;
  data = null;

  constructor({ $target }) {
    const $empty = document.createElement("div");
    this.$empty = $empty;
    this.$empty.className = "Empty";

    $target.appendChild($empty);

    this.data = {
      show: false,
      isNull: false,
    };

    this.render();
  }

  show(data) {
    this.setState({
      show: data === null || data.length === 0,
      isNull: data === null,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      let resultMsg = this.data.isNull
        ? "요청 실패...!!!"
        : "검색 결과가 없습니다.";

      this.$empty.style.display = "block";
      this.$empty.innerHTML = `
            <p>🚨${resultMsg}🚨</p>
        `;
    } else {
      this.$empty.style.display = "none";
      this.$empty.innerHTML = ``;
    }
  }
}

export default Empty;
