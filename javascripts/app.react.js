const { Component } = React;

const findPosition = node => {
  let offsetLeft = node.offsetLeft;
  let offsetTop = node.offsetTop;

  while (node.offsetParent) {
    if (node == document.body) {
      break;
    } else {
      offsetLeft = offsetLeft + node.offsetParent.offsetLeft;
      offsetTop = offsetTop + node.offsetParent.offsetTop;
      node = node.offsetParent;
    }
  }

  return {
    offsetLeft,
    offsetTop
  };
};

class ScoutInfoPanel extends Component {
  constructor(props) {
    super(props);
    this.style = {
      root: {
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: 12,
        left: 0,
        lineHeight: 1,
        padding: 12,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 99999999
      },
      link: {
        color: '#3b99fc',
        float: 'right'
      },
      key: {
        fontWeight: 700
      },
      value: {
        color: '#CCCCCC'
      }
    };
    this.state = {
      helpIsActive: false
    };
    this.handleHelpClick = this.handleHelpClick.bind(this);
  }
  handleHelpClick(event) {
    this.setState({ helpIsActive: !this.state.helpIsActive });
  }
  render() {
    return (
      <div style={this.style.root}>
        <details
          onClick={this.handleHelpClick}
          style={{
            display: `${this.state.helpIsActive ? 'block' : 'inline-block'}`
          }}
        >
          <summary
            style={{ color: '#CCCCCC', paddingRight: 6, fontWeight: 700 }}
          >
            Scout
          </summary>
          <div style={{ marginTop: 6, marginBottom: 6 }}>
            <strong style={this.style.key}>Change hue</strong>:{' '}
            <kbd style={this.style.value}>Shift+C</kbd>{' '}
            <strong style={this.style.key}>Change opacity</strong>:{' '}
            <kbd style={this.style.value}>Shift+X</kbd>{' '}
            <strong style={this.style.key}>Close</strong>:{' '}
            <kbd style={this.style.value}>Esc</kbd>{' '}
          </div>
        </details>
        {Object.entries(this.props.data).map(([key, value]) => {
          return (
            <span>
              <strong style={this.style.key}>{key}</strong>:{' '}
              <span style={this.style.value}>{value} </span>
            </span>
          );
        })}
        <a
          style={this.style.link}
          href="https://hired.com/x/On0PYI"
          target="_blank"
        >
          Looking for a job?
        </a>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

class Scout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      opacity: 0.3,
      style: {
        pointerEvents: 'none',
        position: 'absolute'
      }
    };
    this.handleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
  }
  handleDocumentKeyDown(event) {
    let key = event.which || event.keyCode || 0;
    switch (true) {
      case event.shiftKey && key === 88:
        this.setState({ hue: (this.state.hue + 10) % 360 });
        break;
      case event.shiftKey && key === 67:
        this.setState({
          opacity: ((this.state.opacity * 100 + 10) % 110) / 100
        });
        break;
    }
  }
  handleDocumentMouseMove(event) {
    const { offsetHeight: height, offsetWidth: width } = event.target;
    const { offsetLeft: left, offsetTop: top } = findPosition(event.target);
    this.setState({
      style: {
        ...this.state.style,
        height,
        left,
        top,
        width
      }
    });
  }
  componentDidMount() {
    document.addEventListener('mousemove', this.handleDocumentMouseMove, false);
    document.addEventListener('keydown', this.handleDocumentKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener(
      'mousemove',
      this.handleDocumentMouseMove,
      false
    );
    document.removeEventListener('keydown', this.handleDocumentKeyDown, false);
  }
  render() {
    const { style, opacity, hue } = this.state;
    const { width, height, left, top } = style;
    const data = {
      width,
      height,
      left,
      top,
      opacity,
      hue
    };

    return (
      <div>
        <div
          style={{
            ...style,
            backgroundColor: `hsla(${hue}, 100%, 50%, ${opacity})`
          }}
        />
        <ScoutInfoPanel data={data} />
      </div>
    );
  }
}
