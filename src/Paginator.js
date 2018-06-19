var React = require('react')
var Link = require('react-router/lib/Link')

var Paginator = React.createClass({
  _onClick(e) {
    setTimeout(function() { window.scrollTo(0, 0) }, 0)
  },

  render() {
    if (this.props.page === 1 && !this.props.hasNext) { return null }
    return <div className="paginator">
      {this.props.page > 1 && <span className="paginator-prev">
        <Link to={{pathname: `/${this.props.route}`, query: {page: this.props.page - 1}}} onClick={this._onClick}>Prev</Link>
      </span>}
      {this.props.page > 1 && this.props.hasNext && ' | '}
      {this.props.hasNext && <span className="paginator-next">
        <Link to={{pathname: `/${this.props.route}`, query: {page: this.props.page + 1}}} onClick={this._onClick}>More</Link>
      </span>}
    </div>
  }
})

module.exports = Paginator
