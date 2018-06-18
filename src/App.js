var React = require('react')
var Link = require('react-router/lib/Link')

var Settings = require('./Settings')

var StoryStore = require('./stores/StoryStore')
var UpdatesStore = require('./stores/UpdatesStore')
var SettingsStore = require('./stores/SettingsStore')

var App = React.createClass({
  getInitialState() {
    return {
      showSettings: false,
      showChildren: false,
      prebootHTML: this.props.params.prebootHTML
    }
  },

  componentWillMount() {
    SettingsStore.load()
    StoryStore.loadSession()
    UpdatesStore.loadSession()
    if (typeof window === 'undefined') return
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  },

  componentDidMount() {
    // Empty the prebooted HTML and hydrate using live results from Firebase
    this.setState({ prebootHTML: '', showChildren: true })
  },

  componentWillUnmount() {
    if (typeof window === 'undefined') return
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  },

  /**
   * Give stores a chance to persist data to sessionStorage in case this is a
   * refresh or an external link in the same tab.
   */
  handleBeforeUnload() {
    StoryStore.saveSession()
    UpdatesStore.saveSession()
  },

  toggleSettings(e) {
    e.preventDefault()
    this.setState({showSettings: !this.state.showSettings})
  },

  render() {
    return <div className="App" onClick={this.state.showSettings && this.toggleSettings}>
      <div className="App__wrap">
        <div className="header">
          <Link to="/news" activeClassName="active" className="home-link">Hacker News</Link>{' '}
          <Link to="/newest" activeClassName="active" className="header-link">New</Link>{' | '}
          <Link to="/newcomments" activeClassName="active" className="header-link">Comments</Link> {' | '}
          <Link to="/show" activeClassName="active" className="header-link">Show</Link>{' | '}
          <Link to="/ask" activeClassName="active" className="header-link">Ask</Link>{' | '}
          <Link to="/jobs" activeClassName="active" className="header-link">Jobs</Link>

          <a className="settings" tabIndex="0" onClick={this.toggleSettings} onKeyPress={this.toggleSettings}>
            <img src="/img/cog.svg" className="cog-icon"/>
            {this.state.showSettings ? 'hide settings' : 'settings'}
          </a>
          {this.state.showSettings && <Settings key="settings"/>}
        </div>
        <div className="App__content">
          <div dangerouslySetInnerHTML={{ __html: this.state.prebootHTML }}/>
          {this.state.showChildren ? this.props.children : ''}
        </div>
        <div className="footer">
          <a href="https://github.com/laurahw/react-hn">Github Repo</a>
        </div>
      </div>
    </div>
  }
})

module.exports = App
