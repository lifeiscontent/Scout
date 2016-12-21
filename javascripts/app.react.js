const { Component } = React;

const findPosition = (node) => {
  let offsetLeft = node.offsetLeft;
  let offsetTop = node.offsetTop;
  while( node.offsetParent ) {
    if( node == document.body ) {
      break
    } else {
      offsetLeft = offsetLeft + node.offsetParent.offsetLeft;
      offsetTop = offsetTop + node.offsetParent.offsetTop;
      node = node.offsetParent;
    }
  }

  return {
    offsetLeft,
    offsetTop,
  };
}


class ScoutInfoPanel extends Component {
  constructor(props) {
    super(props);
    this.style = {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'sans-serif',
      fontSize: 12,
      left: 0,
      lineHeight: 1,
      padding: 3,
      position: 'absolute',
      right: 0,
      top: 0,
    };
  }
  render() {
    return <div style={ this.style }>
      Scout:
      {Object.keys(this.props.data).map((key) => {
        return <span>{key}: {this.props.data[key]}px; </span>;
      })}
    </div>;
  }
}

class Scout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
    this.handleDocumentMouseMove = this.handleDocumentMouseMove.bind(this);
  }
  handleDocumentMouseMove(event) {
    const {
      offsetHeight,
      offsetWidth,
    } = event.target;
    const {
      offsetLeft,
      offsetTop,
    } = findPosition(event.target);
    this.setState({
      style: {
        backgroundColor: 'rgba(255,0,0,0.3)',
        height: offsetHeight,
        left: offsetLeft,
        pointerEvents: 'none',
        position: 'absolute',
        top: offsetTop,
        width: offsetWidth,
      }
    });
  }
  componentWillMount() {
    document.addEventListener(
      'mousemove',
      this.handleDocumentMouseMove,
      false
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      'mousemove',
      this.handleDocumentMouseMove,
      false
    );
  }
  render() {
    const {
      style,
    } = this.state;
    const data = {
      width: style.width,
      height: style.height,
      left: style.left,
      top: style.top,
    };

    return (
      <div>
        <div style={ style }></div>
        <ScoutInfoPanel data={ data } />
      </div>
    );
  }
}

// ReactDOM.render(
//   <Scout />,
//   document.querySelector('#root')
// )

// ReactDOM.unmountComponentAtNode(document.querySelector('#root'));
