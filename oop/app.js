class App extends Component {
  constructor() {
    super();
    this.state = {
      items: ["item1", "item2", "item3"],
    };
  }

  render(props) {
    return super.render({
      children: [
        new Input().render({
          items: this.state.items,
          addItem: this.addItem,
        }),
        new Button.render({
          text: "Add a task",
          onclick: this.addItem,
        }),
      ],
    });
  }

  addItem = () => {
    this.setState({
      items: [...this.state.items, "item" + (this.state.items.length + 1)],
    });
  };
}

// document.body.appendChild(new App().render());