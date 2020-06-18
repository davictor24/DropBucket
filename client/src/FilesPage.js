import React from 'react'
import Moment from 'moment'
import FileBrowser, {Icons} from 'react-keyed-file-browser'
import '../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';
import Actions from './Actions.js';

class FilesPage extends React.Component {
  state = {
    files: [],
    loadingFiles: false
  }

  constructor(props) {
    super(props)
    FilesPage.instance = this
  }

  async componentDidMount() {
    await this.loadFilesAndSetState()
  }

  // async componentDidUpdate() {
  //   await this.loadFilesAndSetState()
  // }

  componentWillUnmount() {
    FilesPage.instance = null
  }

  async loadFilesAndSetState() {
    if (this.props.user) {
      this.setState({
        loadingFiles: true
      });
      let files = await this.loadFiles();
      this.setState({
        files,
        loadingFiles: false
      });
    }
  }

  async loadFiles() {
    return new Promise((resolve, reject) => {
      let files = [
        {
          key: 'cat in a hat.png',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
        },
        {
          key: 'kitten_ball.png',
          modified: +Moment().subtract(3, 'days'),
          size: 545 * 1024,
        },
        {
          key: 'elephants.png',
          modified: +Moment().subtract(3, 'days'),
          size: 52 * 1024,
        },
        {
          key: 'funny fall.gif',
          modified: +Moment().subtract(2, 'months'),
          size: 13.2 * 1024 * 1024,
        },
        {
          key: 'holiday.jpg',
          modified: +Moment().subtract(25, 'days'),
          size: 85 * 1024,
        },
        {
          key: 'letter chunks.doc',
          modified: +Moment().subtract(15, 'days'),
          size: 480 * 1024,
        },
        {
          key: 'export.pdf',
          modified: +Moment().subtract(15, 'days'),
          size: 4.2 * 1024 * 1024,
        },
      ]
      setTimeout(() => {resolve(files)}, 0)
    })
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
                  <button id="header-btn" onClick={() => this.props.logout({ returnTo: window.location.origin })}>
                    Log out
                  </button>
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
      
          // <>
    //   {isLoading && <div class="loading">Loading&#8230;</div>}

      
    //   {!isLoading && !user && (
    //     <>
    //       <h1>Click Below!</h1>
    //       <button onClick={loginWithRedirect} className="button is-danger">
    //         Login
    //       </button>
    //     </>
    //   )}
      
    //   {!isLoading && user && (
    //     <>
    //       <h1>You are logged in!</h1>
    //       <p>Hello {user.name}</p>

    //       {user.picture && <img src={user.picture} alt="My Avatar" />}
    //       <hr />

    //       <button
    //         onClick={() => logout({ returnTo: window.location.origin })}
    //         className="button is-small is-dark"
    //       >
    //         Logout
    //       </button>
    //     </>
    //   )}
    // </>
    )
  }
}

export default FilesPage;