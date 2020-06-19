import React from 'react'
import FileBrowser, {Icons} from 'react-keyed-file-browser'
import '../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css'
import Actions from './Actions.js'
import { loadFiles } from '../api/files-api.js'

class FilesPage extends React.Component {
  state = {
    files: [],
    loadingFiles: false,
    token: null
  }

  constructor(props) {
    super(props)
    FilesPage.instance = this
  }

  async componentDidMount() {
    await this.loadFilesWithSpinner()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      await this.loadFilesWithSpinner()
    }
  }

  componentWillUnmount() {
    FilesPage.instance = null
  }

  async loadFilesWithSpinner() {
    if (this.props.user) {
      if (this.state.token) {
        this.setState({
          loadingFiles: true
        })
      } else {
        let token = await this.props.getTokenSilently()
        this.setState({
          loadingFiles: true,
          token
        })
      }
    
      let files = await loadFiles(this.state.token)
      this.setState({
        files,
        loadingFiles: false
      })
    }
  }

  async loadFilesWithoutSpinner() {
    let updated = false
    if (this.props.user) {
      if (this.state.token == null) {
        let token = await this.props.getTokenSilently()
        this.setState({
          token
        })
      }
    
      let files = await loadFiles(this.state.token)
      updated = files.length != this.state.files.length
      this.setState({
        files
      })
    }
    return updated
  }

  // TODO: Use a WebSockets connection
  getUpdates() {
    let interval = 2000
    let count = 0
    const maxCount = 10
    let timer = setInterval(async () => {
      let updated = await this.loadFilesWithoutSpinner()
      count++
      if (count >= maxCount || updated) return clearInterval(timer)
    }, interval)
  }

  isLoading() {
    return this.props.authLoading || this.state.loadingFiles
  }

  render() {
    return (
      <>
        {this.isLoading() && <div className="loading">Loading&#8230;</div>}

        {!this.isLoading() && (
          <div id="parentContainer">
            <div id="mainContainer">
              <header>
                <h1 style={{fontSize: "3em"}}>DropBucket</h1>
                {this.props.user ? (
                  <div id="header-btn-parent">
                    <img src={FilesPage.instance.props.user.picture} id="profile-photo" alt="Profile" />
                    <button id="header-btn" onClick={() => this.props.logout({ returnTo: window.location.origin })}>
                      Log out
                    </button>
                  </div>
                ) : (
                  <button id="header-btn" onClick={this.props.loginWithRedirect}>
                    Log in
                  </button>
                )}
              </header>

              <FileBrowser
                files={this.state.files}
                noFilesMessage="You don't have any files :("
                icons={Icons.FontAwesome(4)}
                actionRenderer={Actions}
                detailRenderer={() => ''}
              />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default FilesPage