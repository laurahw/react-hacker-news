var React = require('react')
var Link = require('react-router/lib/Link')

var SettingsStore = require('../stores/SettingsStore')
var cx = require('../utils/buildClassName')

/**
 * Reusable logic for displaying an item in a list.
 * Must be used in conjunction with ItemMixin for its rendering methods.
 */
var ListItemMixin = {
  getNewCommentCount(item, threadState) {
    if (threadState.lastVisit === null) {
      return 0
    }
    return item.descendants - threadState.commentCount
  },

  renderListItem(item, threadState) {
    if (item.deleted) { return null }
    var newCommentCount = this.getNewCommentCount(item, threadState)
    var number = Math.floor(Math.random() * 11)
		var imgURL = '/img/tiles/' + number + '.png'
		console.log(imgURL)
    return <div className={cx('list-item', {'list-item--dead': item.dead})}>
      <div className="image-box"><img src={imgURL} /></div>
      {this.renderItemTitle(item)}
      {this.renderItemMeta(item, (newCommentCount > 0 && <span className="ListItem__newcomments">{' '}
        (<Link to={`/${item.type}/${item.id}`}>
          {newCommentCount} new
        </Link>)
      </span>))}
    </div>
  }
}

module.exports = ListItemMixin
