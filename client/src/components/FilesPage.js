import React from 'react'
import Moment from 'moment'
import FileBrowser, {Icons} from 'react-keyed-file-browser'
import '../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css'
import Actions from './Actions.js'
import { apiEndpoint } from '../config.js'

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
    await this.loadFilesAndSetState()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      await this.loadFilesAndSetState()
    }
  }

  componentWillUnmount() {
    FilesPage.instance = null
  }

  async loadFilesAndSetState() {
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
    
      let files = await this.loadFiles()
      this.setState({
        files,
        loadingFiles: false
      })
    }
  }

  async loadFiles() {
    const data = await fetch(`${apiEndpoint}/files`, {
      headers: {
        'Authorization': `Bearer ${this.state.token}`
      }
    }).then(r => r.json())

    let files = []
    for (let file of data.items) {
      files.push({
        key: file.fileKeyUser,
        modified: Moment().subtract(new Date() - file.lastModified),
        size: file.sizeBytes
      })
    }
    return files;
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