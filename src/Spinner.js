var React = require('react')

// TODO Implement GIF-based fallback for IE9 and another non-animating browsers
//      See https://github.com/tobiasahlin/SpinKit for how-to
var Spinner = React.createClass({
  getDefaultProps() {
    return {size: 6, spacing: 2}
  },

  render() {
    var bounceSize = this.props.size + 'px'
    var bounceStyle = {height: bounceSize, width: bounceSize, marginRight: this.props.spacing + 'px'}
    return <div className="Spinner">
      <div className="bounce1"/>
      <div className="bounce2"/>
      <div className="bounce3"/>
    </div>
  }
})

module.exports = Spinner
